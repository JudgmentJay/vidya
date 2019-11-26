import React, { useContext, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ModalContext } from '../context/modal'

import { validateForm } from '../util/validation'

const SearchForm = ({
	games,
	searchTerm,
	setSearchTerm,
	searchResults,
	setSearchResults,
	setView
}) => {
	const modalContext = useContext(ModalContext)

	const [invalidFields, setInvalidFields] = useState([])

	const searchTermRef = useRef(null)

	useEffect(() => {
		searchTermRef.current.focus()
	}, [])

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

		setSearchResults({ games: filteredGames, searched: true })
	}

	const handleToggleGame = (game) => {
		modalContext.dispatch({ type: 'ADD_GAME_TO_MODAL', game })

		setView('info')
	}

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSubmitForm()
		}
	}

	const searchFieldClasses = classNames('modal__input modal__input--search', { 'is-invalid': invalidFields.includes('title') })

	return (
		<React.Fragment>
			<h2>Search Games</h2>

			<div className="modal__field">
				<input type="text" className={searchFieldClasses} value={searchTerm} placeholder="Game Title" onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => handleKeyPress(e)} ref={searchTermRef} />
				<button className="modal__button modal__button--search" onClick={() => handleSubmitForm()}>Search</button>
			</div>

			{ searchResults.games.length > 0 &&
				<React.Fragment>
					<h2 className="searchResults__header">Results</h2>
					<table className="modalTable searchResultsTable" cellPadding="0" cellSpacing="0">
						<tbody>
							{
								searchResults.games.map((game, i) => {
									return (
										<tr className="modalTable__dataRow searchResultsTable__dataRow" onClick={() => handleToggleGame(game)} key={`searchResult-${i}`}>
											<td className="modalTable__cell">{game.title}</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</React.Fragment>
			}

			{ (searchResults.searched && searchResults.games.length === 0) &&
				<p className="searchResults__noneFound">No games found...</p>
			}
		</React.Fragment>
	)
}

SearchForm.propTypes = {
	games: PropTypes.array.isRequired,
	searchTerm: PropTypes.string,
	setSearchTerm: PropTypes.func.isRequired,
	searchResults: PropTypes.object.isRequired,
	setSearchResults: PropTypes.func.isRequired,
	setView: PropTypes.func.isRequired
}

export default SearchForm
