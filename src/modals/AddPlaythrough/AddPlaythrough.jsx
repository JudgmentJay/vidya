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

const AddPlaythrough = ({
	setModal,
	fetchGameData
}) => {
	const { game, dispatch } = useContext(ModalContext)

	const [password, setPassword] = useState('')
	const [dateStarted, setDateStarted] = useState('')
	const [dateFinished, setDateFinished] = useState('')
	const [hoursPlayed, setHoursPlayed] = useState('')
	const [timesCompleted, setTimesCompleted] = useState('0')
	const [platform, setPlatform] = useState('')
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
			addPlaythrough()
		}
	}

	const addPlaythrough = () => {
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

		fetchData(`games/playthroughs/add/${game.id}`, 'POST', data, callback)
	}

	return (
		<React.Fragment>
			<h2>Add {game.title} Playthrough</h2>

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
				isInvalid={invalidFields.includes('finished')} />
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
					text="Add"
					onClick={() => handleSubmitForm()} />
			</ModalButtons>
		</React.Fragment>
	)
}

AddPlaythrough.propTypes = {
	setModal: PropTypes.func.isRequired,
	fetchGameData: PropTypes.func.isRequired
}

export default AddPlaythrough
