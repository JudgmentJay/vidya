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
	const [dateStarted, setDateStarted] = useState(formattedDate)
	const [platform, setPlatform] = useState('')
	const [invalidFields, setInvalidFields] = useState([])

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

		const callback = () => {
			fetchGameData()

			setTimeout(() => {
				dispatch({ type: 'CLOSE_MODAL' })
			}, 20)
		}

		fetchData(`games/playthroughs/start/${game.id}`, 'POST', data, callback)
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
				id="gamePlatform"
				label="Platform"
				value={platform}
				onChange={(e) => setPlatform(e.target.value)}
				isInvalid={invalidFields.includes('platform')}
				focusOnLoad={true} />

			<ModalButtons>
				<ModalButton
					text="Back"
					onClick={() => setModal('info')} />
				<ModalButton
					text="Start playthrough"
					onClick={() => handleSubmitForm('startPlaythrough')} />
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
