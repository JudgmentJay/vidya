import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { fetchData } from '../../util/fetch'

import { ModalContext } from '../../context'

import {
	FormField,
	ModalButton,
	ModalButtons
} from '../_partials'

const DeletePlaythrough = ({
	setModal,
	fetchGameData
}) => {
	const { game, playthrough, dispatch } = useContext(ModalContext)

	const [password, setPassword] = useState('')

	const deletePlaythrough = () => {
		const data = { password }

		const callback = () => {
			fetchGameData()

			setTimeout(() => {
				dispatch({ type: 'CLOSE_MODAL' })
			}, 20)
		}

		fetchData(`games/playthroughs/delete/${playthrough.id}`, 'DELETE', data, callback)
	}

	return (
		<React.Fragment>
			<h2>Delete {game.title} Playthrough?</h2>

			<FormField
				type="password"
				id="password"
				label="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)} />

			<ModalButtons>
				<ModalButton
					text="Cancel"
					onClick={() => setModal('editplaythrough')} />
				<ModalButton
					text="Confirm"
					onClick={() => deletePlaythrough()} />
			</ModalButtons>
		</React.Fragment>
	)
}

DeletePlaythrough.propTypes = {
	setModal: PropTypes.func.isRequired,
	fetchGameData: PropTypes.func.isRequired
}

export default DeletePlaythrough
