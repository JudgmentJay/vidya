import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { ModalContext } from '../../context'

import {
	FormField,
	ModalButton,
	SearchResults
} from '../_partials'

import styles from './_styles.module.scss'

const Search = ({
	games,
	storedSearchTerm,
	setStoredSearchTerm,
	setModal
}) => {
	const { dispatch } = useContext(ModalContext)

	const [searchTerm, setSearchTerm] = useState(storedSearchTerm)

	const filteredGames = storedSearchTerm.length > 0
		? games.filter((game) => game.title.toLowerCase().includes(storedSearchTerm.toLowerCase()))
		: []

	const handleGameClick = (game) => {
		dispatch({ type: 'ADD_GAME', game })

		setModal('info')
	}

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			setStoredSearchTerm(searchTerm)
		}
	}

	return (
		<React.Fragment>
			<h2>Search Games</h2>

			<div className={styles.searchContainer}>
				<FormField
					type="text"
					id="searchTerm"
					placeholder="Game Title"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onKeyDown={(e) => handleKeyPress(e)}
					focusOnLoad={true}
					modifier="search" />
				<ModalButton
					text="Search"
					onClick={() => setStoredSearchTerm(searchTerm)}
					modifier="search" />
			</div>

			{ Boolean(filteredGames.length > 0) &&
				<SearchResults
					games={filteredGames}
					onGameClick={handleGameClick} />
			}
		</React.Fragment>
	)
}

Search.propTypes = {
	games: PropTypes.array.isRequired,
	storedSearchTerm: PropTypes.string.isRequired,
	setStoredSearchTerm: PropTypes.func.isRequired,
	setModal: PropTypes.func.isRequired
}

export default Search
