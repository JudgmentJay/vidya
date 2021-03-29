import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { validateForm, formatDate } from '../../util/validation'
import { fetchData } from '../../util/fetch'

import { ModalContext } from '../../context'

import {
	FormField,
	ModalButton,
	ModalButtons
} from '../_partials'

const FinishPlaythrough = ({
	setModal,
	fetchGameData,
	currentDate
}) => {
	const { game, dispatch } = useContext(ModalContext)

	const formattedDate = formatDate(currentDate)

	const [password, setPassword] = useState('')
	const [dateStarted, setDateStarted] = useState(game.playthroughs[0].dateStarted)
	const [dateFinished, setDateFinished] = useState(formattedDate)
	const [hoursPlayed, setHoursPlayed] = useState('')
	const [timesCompleted, setTimesCompleted] = useState('0')
	const [score, setScore] = useState(game.score ? game.score.toString() : '')
	const [platform, setPlatform] = useState(game.playthroughs[0].platform)
	const [invalidFields, setInvalidFields] = useState([])

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

	return (
		<React.Fragment>
			<h2>{game.playing ? `Finish ${game.title} Playthrough` : `Start New ${game.title} Playthrough`}</h2>

			<FormField
				type="password"
				id="password"
				label="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)} />
			<FormField
				type="text"
				id="gameDateStarted"
				label="Date Started"
				value={dateStarted}
				onChange={(e) => setDateStarted(e.target.value)}
				isInvalid={invalidFields.includes('start')} />
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
				isInvalid={invalidFields.includes('hours')}
				focusOnLoad={true} />
			<FormField
				type="text"
				id="gameTimesCompleted"
				label="Times Completed"
				value={timesCompleted}
				onChange={(e) => setTimesCompleted(e.target.value)}
				isInvalid={invalidFields.includes('completed')} />
			<FormField
				type="text"
				id="gameScore"
				label="Score"
				value={score}
				onChange={(e) => setScore(e.target.value)}
				isInvalid={invalidFields.includes('score')} />
			<FormField
				type="text"
				id="gamePlatform"
				label="Platform"
				value={platform}
				onChange={(e) => setPlatform(e.target.value)}
				isInvalid={invalidFields.includes('platform')} />

			<ModalButtons>
				<ModalButton
					text="Back"
					onClick={() => setModal('info')} />
				<ModalButton
					text="Finish"
					onClick={() => handleSubmitForm()} />
			</ModalButtons>
		</React.Fragment>
	)
}

FinishPlaythrough.propTypes = {
	setModal: PropTypes.func.isRequired,
	fetchGameData: PropTypes.func.isRequired,
	currentDate: PropTypes.instanceOf(Date).isRequired
}

export default FinishPlaythrough
