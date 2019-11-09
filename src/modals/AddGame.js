import React, { useContext, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ModalContext } from '../context/modal'

import { validateForm } from '../util/validation'

const AddGame = ({ fetchGameData }) => {
	const modalContext = useContext(ModalContext)

	const [password, setPassword] = useState('')
	const [status, setStatus] = useState('backlog')
	const [title, setTitle] = useState('')
	const [releaseDate, setReleaseDate] = useState('')
	const [score, setScore] = useState('')
	const [dateStarted, setDateStarted] = useState('')
	const [dateFinished, setDateFinished] = useState('')
	const [hoursPlayed, setHoursPlayed] = useState('')
	const [timesCompleted, setTimesCompleted] = useState('0')
	const [platform, setPlatform] = useState('')
	const [invalidFields, setInvalidFields] = useState([])

	const gameTitleRef = useRef(null)

	useEffect(() => {
		gameTitleRef.current.focus()
	}, [status])

	const handleSetStatus = (status) => {
		if (invalidFields.length) {
			setInvalidFields([])
		}

		setStatus(status)
	}

	const handleSubmitForm = () => {
		const fieldsToValidate = []

		fieldsToValidate.push({ type: 'title', value: title })
		fieldsToValidate.push({ type: 'release', value: releaseDate })

		if (status !== 'backlog') {
			fieldsToValidate.push({ type: 'start', value: {releaseDate, dateStarted} })
			fieldsToValidate.push({ type: 'platform', value: platform })
		}

		if (status === 'played') {
			fieldsToValidate.push({ type: 'score', value: score })
			fieldsToValidate.push({ type: 'finish', value: {dateStarted, dateFinished} })
			fieldsToValidate.push({ type: 'hours', value: hoursPlayed })
			fieldsToValidate.push({ type: 'completed', value: timesCompleted })
		}

		const newInvalidFields = validateForm(fieldsToValidate)

		if (newInvalidFields.length > 0) {
			setInvalidFields(newInvalidFields)
		} else {
			addGame()
		}
	}

	const addGame = () => {
		const data = {
			password,
			title,
			releaseDate,
			score,
			playing: status === 'playing' ? 1 : 0
		}

		if (status !== 'backlog') {
			data.dateStarted = dateStarted
			data.dateFinished = dateFinished
			data.timesCompleted = timesCompleted
			data.hoursPlayed = hoursPlayed
			data.platform = platform
		}

		fetch(`http://localhost:3010/games/add`, {
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

	const statusButtonClass = 'modal__statusButton'
	const playingButtonClasses = classNames(statusButtonClass, { 'is-selected': status === 'playing' })
	const playedButtonClasses = classNames(statusButtonClass, { 'is-selected': status === 'played' })
	const backlogButtonClasses = classNames(statusButtonClass, { 'is-selected': status === 'backlog' })

	const inputFieldClass = 'modal__input'
	const titleFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('title') })
	const releaseDateFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('release') })
	const scoreFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('score') })

	const startFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('start') })
	const finishFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('finish') })
	const hoursFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('hours') })
	const completedFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('completed') })
	const platformFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('platform') })

	return (
		<React.Fragment>
			<h2>Add New Game</h2>

			<div className="modal__fieldSet">
				<div className={playingButtonClasses} onClick={() => handleSetStatus('playing')}>Playing</div>
				<div className={playedButtonClasses} onClick={() => handleSetStatus('played')}>Played</div>
				<div className={backlogButtonClasses} onClick={() => handleSetStatus('backlog')}>Backlog</div>
			</div>

			<div className="modal__field">
				<label className="modal__label" htmlFor="password">Password</label>
				<input type="password" id="password" className={inputFieldClass} value={password} onChange={(e) => setPassword(e.target.value)}></input>
			</div>
			<div className="modal__field">
				<label className="modal__label" htmlFor="gameTitle">Title</label>
				<input type="text" id="gameTitle" className={titleFieldClasses} value={title} onChange={(e) => setTitle(e.target.value)} ref={gameTitleRef} />
			</div>
			<div className="modal__field">
				<label className="modal__label" htmlFor="gameReleaseDate">Release Date</label>
				<input type="text" id="gameReleaseDate" className={releaseDateFieldClasses} value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
			</div>
			{ (status === 'played' || status === 'dropped') &&
				<div className="modal__field">
					<label className="modal__label" htmlFor="gameScore">Score</label>
					<input type="text" id="gameScore" className={scoreFieldClasses} value={score} onChange={(e) => setScore(e.target.value)} />
				</div>
			}
			{ status !== 'backlog' &&
				<div className="modal__field">
					<label className="modal__label" htmlFor="gameDateStarted">Date Started</label>
					<input type="text" id="gameDateStarted" className={startFieldClasses} value={dateStarted} onChange={(e) => setDateStarted(e.target.value)} />
				</div>
			}
			{ status === 'played' &&
				<React.Fragment>
					<div className="modal__field">
						<label className="modal__label" htmlFor="gameDateFinished">Date Finished</label>
						<input type="text" id="gameDateFinished" className={finishFieldClasses} value={dateFinished} onChange={(e) => setDateFinished(e.target.value)} />
					</div>
					<div className="modal__field">
						<label className="modal__label" htmlFor="gameHoursPlayed">Hours Played</label>
						<input type="text" id="gameHoursPlayed" className={hoursFieldClasses} value={hoursPlayed} onChange={(e) => setHoursPlayed(e.target.value)} />
					</div>
					<div className="modal__field">
						<label className="modal__label" htmlFor="gameTimesCompleted">Times Completed</label>
						<input type="text" id="gameTimesCompleted" className={completedFieldClasses} value={timesCompleted} onChange={(e) => setTimesCompleted(e.target.value)} />
					</div>
				</React.Fragment>
			}
			{ status !== 'backlog' &&
				<div className="modal__field">
					<label className="modal__label" htmlFor="gamePlatform">Platform</label>
					<input type="text" id="gamePlatform" className={platformFieldClasses} value={platform} onChange={(e) => setPlatform(e.target.value)} />
				</div>
			}

			<div className="modal__buttons">
				<button className="modal__button" onClick={() => handleSubmitForm()}>Add Game</button>
				<button className="modal__button" onClick={() => modalContext.dispatch({ type: 'CLOSE_MODAL' })}>Cancel</button>
			</div>
		</React.Fragment>
	)
}

AddGame.propTypes = {
	fetchGameData: PropTypes.func.isRequired
}

export default AddGame
