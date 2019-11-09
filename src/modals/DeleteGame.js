import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { ModalContext } from '../context/modal'

const DeleteGame = ({
	setView,
	fetchGameData
}) => {
	const modalContext = useContext(ModalContext)

	const game = modalContext.game

	const [password, setPassword] = useState('')

	const deleteGame = () => {
		const data = {
			password
		}

		fetch(`http://localhost:3010/games/delete/${game.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(response => {
			if (response.status === 400) {
				alert('Invalid Password')
			} else if (response.status === 400) {
				console.log('Bad Response')
			} else if (response.ok) {
				fetchGameData()

				setTimeout(() => {
					modalContext.dispatch({ type: 'CLOSE_MODAL' })
				}, 20)
			}
		})
	}

	return (
		<React.Fragment>
			<h2>Delete {game.title}?</h2>

			<div className="modal__field">
				<label className="modal__label" htmlFor="password">Password</label>
				<input type="password" id="password" className="modal__input" value={password} onChange={(e) => setPassword(e.target.value)}></input>
			</div>

			<div className="modal__buttons">
				<button className="modal__button" onClick={() => setView('editgame')}>Cancel</button>
				<button className="modal__button modal__button--delete" onClick={() => deleteGame()}>Confirm</button>
			</div>
		</React.Fragment>
	)
}

DeleteGame.propTypes = {
	setView: PropTypes.func.isRequired,
	fetchGameData: PropTypes.func.isRequired
}

export default DeleteGame
