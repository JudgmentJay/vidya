import React, { useContext, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { validateForm } from '../util/validation'
import { fetchData } from '../util/fetch'

import { ModalContext } from '../context/modal'

const FinishPlaythrough = ({
	setView,
	fetchGameData
}) => {
	const { game, dispatch } = useContext(ModalContext)

	const [password, setPassword] = useState('')
	const [dateStarted, setDateStarted] = useState(game.playthroughs[0].dateStarted)
	const [dateFinished, setDateFinished] = useState('')
	const [hoursPlayed, setHoursPlayed] = useState('')
	const [timesCompleted, setTimesCompleted] = useState('0')
	const [score, setScore] = useState(game.score ? game.score.toString() : '')
	const [platform, setPlatform] = useState(game.playthroughs[0].platform)
	const [invalidFields, setInvalidFields] = useState([])

	const dateFinishedRef = useRef(null)

	useEffect(() => {
		dateFinishedRef.current.focus()
	}, [])

	const handleSubmitForm = () => {
		const fieldsToValidate = []

		const releaseDate = game.releaseDate

		fieldsToValidate.push({ type: 'start', value: {releaseDate, dateStarted} })
		fieldsToValidate.push({ type: 'finish', value: {dateStarted, dateFinished} })
		fieldsToValidate.push({ type: 'hours', value: hoursPlayed })
		fieldsToValidate.push({ type: 'completed', value: timesCompleted })
		fieldsToValidate.push({ type: 'score', value: score })
		fieldsToValidate.push({ type: 'platform', value: platform })

		const newInvalidFields = validateForm(fieldsToValidate)

		if (newInvalidFields.length) {
			setInvalidFields(newInvalidFields)
		} else {
			finishPlaythrough()
		}
	}

	const finishPlaythrough = () => {
		const data = {
			password,
			gameId: game.id,
			dateStarted,
			dateFinished,
			hoursPlayed,
			timesCompleted,
			score,
			platform
		}

		const playthroughId = game.playthroughs[0].id

		const callback = () => {
			fetchGameData()

			setTimeout(() => {
				dispatch({ type: 'CLOSE_MODAL' })
			}, 20)
		}

		fetchData(`games/playthroughs/finish/${playthroughId}`, 'PUT', data, callback)
	}

	const inputFieldClass = 'modal__input'
	const startFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('start') })
	const finishFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('finish') })
	const hoursFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('hours') })
	const timesCompletedClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('completed' )})
	const scoreFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('score') })
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
				<input type="text" id="gameDateStarted" className={startFieldClasses} value={dateStarted} onChange={(e) => setDateStarted(e.target.value)} />
			</div>
			<div className="modal__field">
				<label className="modal__label" htmlFor="gameDateFinished">Date Finished</label>
				<input type="text" id="gameDateFinished" className={finishFieldClasses} value={dateFinished} onChange={(e) => setDateFinished(e.target.value)} ref={dateFinishedRef} />
			</div>
			<div className="modal__field">
				<label className="modal__label" htmlFor="gameHoursPlayed">Hours Played</label>
				<input type="text" id="gameHoursPlayed" className={hoursFieldClasses} value={hoursPlayed} onChange={(e) => setHoursPlayed(e.target.value)} />
			</div>
			<div className="modal__field">
				<label className="modal__label" htmlFor="gameTimesCompleted">Times Completed</label>
				<input type="text" id="gameTimesCompleted" className={timesCompletedClasses} value={timesCompleted} onChange={(e) => setTimesCompleted(e.target.value)} />
			</div>
			<div className="modal__field">
				<label className="modal__label" htmlFor="gameScore">Score</label>
				<input type="text" id="gameScore" className={scoreFieldClasses} value={score} onChange={(e) => setScore(e.target.value)} />
			</div>
			<div className="modal__field">
				<label className="modal__label" htmlFor="gamePlatform">Platform</label>
				<input type="text" id="gamePlatform" className={platformFieldClasses} value={platform} onChange={(e) => setPlatform(e.target.value)} />
			</div>

			<div className="modal__buttons">
				<button className="modal__button" onClick={() => setView('info')}>Back</button>
				<button className="modal__button" onClick={() => handleSubmitForm()}>Finish</button>
			</div>
		</React.Fragment>
	)
}

FinishPlaythrough.propTypes = {
	setView: PropTypes.func.isRequired,
	fetchGameData: PropTypes.func.isRequired
}

export default FinishPlaythrough
