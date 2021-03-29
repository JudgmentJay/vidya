import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { validateForm } from '../../util/validation'
import { fetchData } from '../../util/fetch'

import { ModalContext } from '../../context'

import {
	FormField,
	ModalButton,
	ModalButtons
} from '../_partials'

const EditPlaythrough = ({
	setModal,
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

	return (
		<React.Fragment>
			<h2>Update {game.title} Playthrough</h2>

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
				isInvalid={invalidFields.includes('start')}
				focusOnLoad={true} />
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
					onClick={() => setModal('playthroughs')} />
				<ModalButton
					text="Delete"
					onClick={() => setModal('deleteplaythrough')}
					modifier="delete" />
				<ModalButton
					text="Update"
					onClick={() => handleSubmitForm()} />
			</ModalButtons>
		</React.Fragment>
	)
}

EditPlaythrough.propTypes = {
	setModal: PropTypes.func.isRequired,
	fetchGameData: PropTypes.func.isRequired
}

export default EditPlaythrough
