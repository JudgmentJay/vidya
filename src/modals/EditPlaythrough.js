import React, { useContext, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { validateForm } from '../util/validation'
import { fetchData } from '../util/fetch'

import { ModalContext } from '../context/modal'

const EditPlaythrough = ({
	setView,
	fetchGameData
}) => {
	const { game, playthrough, dispatch } = useContext(ModalContext)

	const [password, setPassword] = useState('')
	const [dateStarted, setDateStarted] = useState(playthrough.dateStarted)
	const [dateFinished, setDateFinished] = useState(playthrough.dateFinished)
	const [hoursPlayed, setHoursPlayed] = useState(playthrough.hoursPlayed.toString())
	const [timesCompleted, setTimesCompleted] = useState(playthrough.timesCompleted.toString())
	const [platform, setPlatform] = useState(playthrough.platform)
	const [invalidFields, setInvalidFields] = useState([])

	const dateStartedRef = useRef(null)

	useEffect(() => {
		dateStartedRef.current.focus()
	}, [])

	const handleSubmitForm = () => {
		const fieldsToValidate = []

		const releaseDate = game.releaseDate

		fieldsToValidate.push({ type: 'start', value: {releaseDate, dateStarted} })
		fieldsToValidate.push({ type: 'finish', value: {dateStarted, dateFinished} })
		fieldsToValidate.push({ type: 'hours', value: hoursPlayed })
		fieldsToValidate.push({ type: 'completed', value: timesCompleted })
		fieldsToValidate.push({ type: 'platform', value: platform })

		const newInvalidFields = validateForm(fieldsToValidate)

		if (newInvalidFields.length) {
			setInvalidFields(newInvalidFields)
		} else {
			editPlaythrough()
		}
	}

	const editPlaythrough = () => {
		const data = {
			password,
			dateStarted,
			dateFinished,
			hoursPlayed,
			timesCompleted,
			platform
		}

		const callback = () => {
			fetchGameData()

			setTimeout(() => {
				dispatch({ type: 'CLOSE_MODAL' })
			}, 20)
		}

		fetchData(`games/playthroughs/edit/${playthrough.id}`, 'PUT', data, callback)
	}

	const inputFieldClass = 'modal__input'
	const startFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('start') })
	const finishFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('finish') })
	const hoursFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('hours') })
	const timesCompletedClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('completed' )})
	const platformFieldClasses = classNames(inputFieldClass, { 'is-invalid': invalidFields.includes('platform') })

	return (
		<React.Fragment>
			<h2>Update {game.title} Playthrough</h2>

			<div className="modal__field">
				<label className="modal__label" htmlFor="password">Password</label>
				<input type="password" id="password" className={inputFieldClass} value={password} onChange={(e) => setPassword(e.target.value)}></input>
			</div>
			<div className="modal__field">
				<label className="modal__label" htmlFor="gameDateStarted">Date Started</label>
				<input type="text" id="gameDateStarted" className={startFieldClasses} value={dateStarted} onChange={(e) => setDateStarted(e.target.value)} ref={dateStartedRef} />
			</div>
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
				<input type="text" id="gameTimesCompleted" className={timesCompletedClasses} value={timesCompleted} onChange={(e) => setTimesCompleted(e.target.value)} />
			</div>
			<div className="modal__field">
				<label className="modal__label" htmlFor="gamePlatform">Platform</label>
				<input type="text" id="gamePlatform" className={platformFieldClasses} value={platform} onChange={(e) => setPlatform(e.target.value)} />
			</div>

			<div className="modal__buttons">
				<button className="modal__button" onClick={() => setView('playthroughs')}>Back</button>
				<button className="modal__button modal__button--delete" onClick={() => setView('deleteplaythrough')}>Delete</button>
				<button className="modal__button" onClick={() => handleSubmitForm()}>Update</button>
			</div>
		</React.Fragment>
	)
}

EditPlaythrough.propTypes = {
	setView: PropTypes.func.isRequired,
	fetchGameData: PropTypes.func.isRequired
}

export default EditPlaythrough
