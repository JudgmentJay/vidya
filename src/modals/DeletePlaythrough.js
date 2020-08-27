import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { fetchData } from '../util/fetch'

import { ModalContext } from '../context/modal'

const DeletePlaythrough = ({
	setView,
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

			<div className="modal__field">
				<label className="modal__label" htmlFor="password">Password</label>
				<input type="password" id="password" className="modal__input" value={password} onChange={(e) => setPassword(e.target.value)}></input>
			</div>

			<div className="modal__buttons">
				<button className="modal__button" onClick={() => setView('editplaythrough')}>Cancel</button>
				<button className="modal__button modal__button--delete" onClick={() => deletePlaythrough()}>Confirm</button>
			</div>
		</React.Fragment>
	)
}

DeletePlaythrough.propTypes = {
	setView: PropTypes.func.isRequired,
	fetchGameData: PropTypes.func.isRequired
}

export default DeletePlaythrough
