import React, { useContext, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { validateForm } from '../util/validation'
import { fetchData } from '../util/fetch'

import { ModalContext } from '../context/modal'

const EditGame = ({
	setView,
	fetchGameData
}) => {
	const { game, dispatch } = useContext(ModalContext)

	const [password, setPassword] = useState('')
	const [title, setTitle] = useState(game.title)
	const [releaseDate, setReleaseDate] = useState(game.releaseDate)
	const [score, setScore] = useState(game.score ? game.score.toString() : '')
	const [invalidFields, setInvalidFields] = useState([])

	const titleRef = useRef(null)

	useEffect(() => {
		titleRef.current.focus()
	}, [])

	const handleSubmitForm = () => {
		const fieldsToValidate = []

		fieldsToValidate.push({ type: 'title', value: title })
		fieldsToValidate.push({ type: 'release', value: releaseDate })

		if (game.playthroughs.length && !game.playing) {
			fieldsToValidate.push({ type: 'score', value: score })
		}

		const newInvalidFields = validateForm(fieldsToValidate)

		if (newInvalidFields.length) {
			setInvalidFields(newInvalidFields)
		} else {
			updateGame()
		}
	}

	const updateGame = () => {
		const data = {
			password,
			title,
			releaseDate,
			score
		}

		const callback = () => {
			fetchGameData()

			setTimeout(() => {
				dispatch({ type: 'CLOSE_MODAL' })
			}, 20)
		}

		fetchData(`games/edit/${game.id}`, 'PUT', data, callback)
	}

	const inputFieldClass = 'modal__input'
	const titleFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('title') })
	const releaseDateFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('release') })
	const scoreFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('score') })

	return (
		<React.Fragment>
			<h2>Edit {game.title}</h2>

			<div className="modal__field">
				<label className="modal__label" htmlFor="password">Password</label>
				<input type="password" id="password" className={inputFieldClass} value={password} onChange={(e) => setPassword(e.target.value)}></input>
			</div>
			<div className="modal__field">
				<label className="modal__label" htmlFor="gameTitle">Title</label>
				<input type="text" id="gameTitle" className={titleFieldClasses} value={title} onChange={(e) => setTitle(e.target.value)} ref={titleRef} />
			</div>
			<div className="modal__field">
				<label className="modal__label" htmlFor="gameReleaseDate">Release Date</label>
				<input type="text" id="gameReleaseDate" className={releaseDateFieldClasses} value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
			</div>
			{ (game.playthroughs.length > 0 && !game.playing) &&
				<div className="modal__field">
					<label className="modal__label" htmlFor="gameScore">Score</label>
					<input type="text" id="gameScore" className={scoreFieldClasses} value={score} onChange={(e) => setScore(e.target.value)} />
				</div>
			}

			<div className="modal__buttons">
				<button className="modal__button" onClick={() => setView('info')}>Back</button>
				{ game.playthroughs.length === 0 && <button className="modal__button modal__button--delete" onClick={() => setView('deletegame')}>Delete</button> }
				<button className="modal__button" onClick={() => handleSubmitForm()}>Update</button>
			</div>
		</React.Fragment>
	)
}

EditGame.propTypes = {
	setView: PropTypes.func.isRequired,
	fetchGameData: PropTypes.func.isRequired
}

export default EditGame
