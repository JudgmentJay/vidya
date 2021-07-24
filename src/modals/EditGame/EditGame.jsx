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

const EditGame = ({
	setModal,
	fetchGameData
}) => {
	const { game, dispatch } = useContext(ModalContext)

	const [password, setPassword] = useState('')
	const [title, setTitle] = useState(game.title)
	const [releaseDate, setReleaseDate] = useState(game.releaseDate)
	const [score, setScore] = useState(game.score ? game.score.toString() : '')
	const [invalidFields, setInvalidFields] = useState([])

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

	return (
		<React.Fragment>
			<h2>Edit {game.title}</h2>

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
			{ Boolean(game.playthroughs.some((game) => game.dateFinished)) &&
				<FormField
					type="text"
					id="gameScore"
					label="Score"
					value={score}
					onChange={(e) => setScore(e.target.value)}
					isInvalid={invalidFields.includes('score')} />
			}

			<ModalButtons>
				<ModalButton
					text="Back"
					onClick={() => setModal('info')} />
				{ game.playthroughs.length === 0 &&
					<ModalButton
						text="Delete"
						onClick={() => setModal('deletegame')}
						modifier="delete" />
				}
				<ModalButton
					text="Update"
					onClick={() => handleSubmitForm()} />
			</ModalButtons>
		</React.Fragment>
	)
}

EditGame.propTypes = {
	setModal: PropTypes.func.isRequired,
	fetchGameData: PropTypes.func.isRequired
}

export default EditGame
