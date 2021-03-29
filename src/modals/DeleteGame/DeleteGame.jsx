import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { fetchData } from '../../util/fetch'

import { ModalContext } from '../../context'

import {
	FormField,
	ModalButton,
	ModalButtons
} from '../_partials'

const DeleteGame = ({
	setModal,
	fetchGameData
}) => {
	const { game, dispatch } = useContext(ModalContext)

	const [password, setPassword] = useState('')

	const deleteGame = () => {
		const data = { password }

		const callback = () => {
			fetchGameData()

			setTimeout(() => {
				dispatch({ type: 'CLOSE_MODAL' })
			}, 20)
		}

		fetchData(`games/delete/${game.id}`, 'DELETE', data, callback)
	}

	return (
		<React.Fragment>
			<h2>Delete {game.title}?</h2>

			<FormField
				type="password"
				id="password"
				label="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)} />

			<ModalButtons>
				<ModalButton
					text="Cancel"
					onClick={() => setModal('editgame')} />
				<ModalButton
					text="Confirm"
					onClick={() => deleteGame()} />
			</ModalButtons>
		</React.Fragment>
	)
}

DeleteGame.propTypes = {
	setModal: PropTypes.func.isRequired,
	fetchGameData: PropTypes.func.isRequired
}

export default DeleteGame
