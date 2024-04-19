import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { validateForm } from '../../util/validation'
import { fetchData } from '../../util/fetch'

import { ModalContext } from '../../context'

import * as styles from './_styles.module.scss'

import {
	AddGameStatusButton,
	FormField,
	ModalButton,
	ModalButtons
} from '../_partials'

const AddGame = ({ fetchGameData }) => {
	const { dispatch } = useContext(ModalContext)

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

		const callback = () => {
			fetchGameData()

			setTimeout(() => {
				dispatch({ type: 'CLOSE_MODAL' })
			}, 20)
		}

		fetchData('games/add', 'POST', data, callback)
	}

	return (
		<React.Fragment>
			<h2>Add New Game</h2>

			<div className={styles.statusButtons}>
				<AddGameStatusButton
					text="Playing"
					onClick={() => handleSetStatus('playing')}
					isSelected={status === 'playing'} />
				<AddGameStatusButton
					text="Played"
					onClick={() => handleSetStatus('played')}
					isSelected={status === 'played'} />
				<AddGameStatusButton
					text="Backlog"
					onClick={() => handleSetStatus('backlog')}
					isSelected={status === 'backlog'} />
			</div>

			<FormField
				type="password"
				id="password"
				label="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)} />
			<FormField
				type="text"
				id="gameTitle"
				label="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				isInvalid={invalidFields.includes('title')}
				focusOnLoad={true} />
			<FormField
				type="text"
				id="gameReleaseDate"
				label="Release Date"
				value={releaseDate}
				onChange={(e) => setReleaseDate(e.target.value)}
				isInvalid={invalidFields.includes('release')} />
			{ (status === 'played' || status === 'dropped') &&
				<FormField
					type="text"
					id="gameScore"
					label="Score"
					value={score}
					onChange={(e) => setScore(e.target.value)}
					isInvalid={invalidFields.includes('score')} />
			}
			{ status !== 'backlog' &&
				<FormField
					type="text"
					id="gameDateStarted"
					label="Date Started"
					value={dateStarted}
					onChange={(e) => setDateStarted(e.target.value)}
					isInvalid={invalidFields.includes('start')} />
			}
			{ status === 'played' &&
				<React.Fragment>
					<FormField
						type="text"
						id="gameDateFinished"
						label="Date Finished"
						value={dateFinished}
						onChange={(e) => setDateFinished(e.target.value)}
						isInvalid={invalidFields.includes('finish')} />
					<FormField
						type="text"
						id="gameHoursPlayed"
						label="Hours Played"
						value={hoursPlayed}
						onChange={(e) => setHoursPlayed(e.target.value)}
						isInvalid={invalidFields.includes('hours')} />
					<FormField
						type="text"
						id="gameTimesCompleted"
						label="Times Completed"
						value={timesCompleted}
						onChange={(e) => setTimesCompleted(e.target.value)}
						isInvalid={invalidFields.includes('completed')} />
				</React.Fragment>
			}
			{ status !== 'backlog' &&
				<FormField
					type="text"
					id="gamePlatform"
					label="Platform"
					value={platform}
					onChange={(e) => setPlatform(e.target.value)}
					isInvalid={invalidFields.includes('platform')} />
			}

			<ModalButtons>
				<ModalButton
					text="Add Game"
					onClick={() => handleSubmitForm()} />
				<ModalButton
					text="Cancel"
					onClick={() => dispatch({ type: 'CLOSE_MODAL' })} />
			</ModalButtons>
		</React.Fragment>
	)
}

AddGame.propTypes = {
	fetchGameData: PropTypes.func.isRequired
}

export default AddGame
