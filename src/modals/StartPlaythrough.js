import React, { useContext, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { validateForm } from '../util/validation'

import { ModalContext } from '../context/modal'

const FinishPlaythrough = ({
	setView,
	fetchGameData
}) => {
	const modalContext = useContext(ModalContext)

	const game = modalContext.game

	const [password, setPassword] = useState('')
	const [dateStarted, setDateStarted] = useState('')
	const [platform, setPlatform] = useState('')
	const [invalidFields, setInvalidFields] = useState([])

	const dateStartedRef = useRef(null)

	useEffect(() => {
		dateStartedRef.current.focus()
	}, [])

	const handleSubmitForm = () => {
		const fieldsToValidate = []

		const releaseDate = game.releaseDate

		fieldsToValidate.push({ type: 'start', value: {releaseDate, dateStarted} })
		fieldsToValidate.push({ type: 'platform', value: platform })

		const newInvalidFields = validateForm(fieldsToValidate)

		if (newInvalidFields.length) {
			setInvalidFields(newInvalidFields)
		} else {
			startNewPlaythrough()
		}
	}

	const startNewPlaythrough = () => {
		const data = {
			password,
			dateStarted,
			platform
		}

		fetch(`http://localhost:3010/games/playthroughs/start/${game.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(response => {
			if (response.status === 400) {
				alert('Invalid Password')
			} else if (response.status === 400) {
				console.log('Bad Response')
			} else if (response.ok) {
				fetchGameData()

				setTimeout(() => {
					modalContext.dispatch({ type: 'CLOSE_MODAL' })
				}, 20)
			}
		})
	}

	const inputFieldClass = 'modal__input'
	const startFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('start') })
	const platformFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('platform') })

	return (
		<React.Fragment>
			<h2>{game.playing ? `Finish ${game.title} Playthrough` : `Start New ${game.title} Playthrough`}</h2>

			<div className="modal__field">
				<label className="modal__label" htmlFor="password">Password</label>
				<input type="password" id="password" className={inputFieldClass} value={password} onChange={(e) => setPassword(e.target.value)}></input>
			</div>
			<div className="modal__field">
				<label className="modal__label" htmlFor="gameDateStarted">Date Started</label>
				<input type="text" id="gameDateStarted" className={startFieldClasses} value={dateStarted} onChange={(e) => setDateStarted(e.target.value)} ref={dateStartedRef} />
			</div>
			<div className="modal__field">
				<label className="modal__label" htmlFor="gamePlatform">Platform</label>
				<input type="text" id="gamePlatform" className={platformFieldClasses} value={platform} onChange={(e) => setPlatform(e.target.value)} />
			</div>

			<div className="modal__buttons">
				<button className="modal__button" onClick={() => setView('info')}>Back</button>
				<button className="modal__button" onClick={() => handleSubmitForm('startPlaythrough')}>Start playthrough</button>
			</div>
		</React.Fragment>
	)
}

FinishPlaythrough.propTypes = {
	setView: PropTypes.func.isRequired,
	fetchGameData: PropTypes.func.isRequired
}

export default FinishPlaythrough
