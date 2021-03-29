import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { ModalContext } from '../../context'

import { validateForm } from '../../util/validation'

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
	searchResults,
	setSearchResults,
	setModal
}) => {
	const { dispatch } = useContext(ModalContext)

	const [searchTerm, setSearchTerm] = useState(storedSearchTerm)
	const [invalidFields, setInvalidFields] = useState([])

	const handleSubmitForm = () => {
		const fieldsToValidate = []

		fieldsToValidate.push({ type: 'title', value: searchTerm })

		const newInvalidFields = validateForm(fieldsToValidate)

		if (newInvalidFields.length) {
			setInvalidFields(newInvalidFields)
		} else {
			if (invalidFields.length) {
				setInvalidFields([])
			}

			searchGames()
		}
	}

	const searchGames = () => {
		const filteredGames = games.filter((game) => game.title.toLowerCase().includes(searchTerm.toLowerCase()))

		setStoredSearchTerm(searchTerm)
		setSearchResults({ games: filteredGames, searched: true })
	}

	const handleGameClick = (game) => {
		dispatch({ type: 'ADD_GAME', game })

		setModal('info')
	}

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSubmitForm()
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
					isInvalid={invalidFields.includes('title')}
					focusOnLoad={true}
					modifier="search" />
				<ModalButton
					text="Search"
					onClick={() => handleSubmitForm()}
					modifier="search" />
			</div>

			{ searchResults.searched &&
				<SearchResults
					games={searchResults.games}
					onGameClick={handleGameClick} />
			}
		</React.Fragment>
	)
}

Search.propTypes = {
	games: PropTypes.array.isRequired,
	storedSearchTerm: PropTypes.string.isRequired,
	setStoredSearchTerm: PropTypes.func.isRequired,
	searchResults: PropTypes.object.isRequired,
	setSearchResults: PropTypes.func.isRequired,
	setModal: PropTypes.func.isRequired
}

export default Search
