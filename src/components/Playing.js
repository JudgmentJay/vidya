import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { ModalContext } from '../context/modal'

const Playing = ({ games }) => {
	const { dispatch } = useContext(ModalContext)

	const currentlyPlaying = games.filter((game) => game.playing).sort((gameA, gameB) => {
		return new Date(gameA.playthroughs[0].dateStarted) - new Date(gameB.playthroughs[0].dateStarted)
	})

	return (
		<div className="box noshrink">
			<h1>Currently Playing</h1>

			{ currentlyPlaying.length > 0 &&
				<table className="gameDataTable" cellPadding="0" cellSpacing="0">
					<thead>
						<tr>
							<th className="gameDataTable__header gameDataTable__title">Title</th>
							<th className="gameDataTable__header gameDataTable__date">Started</th>
						</tr>
					</thead>
					<tbody>
						{
							currentlyPlaying.map((game, i) => {
								return (
									<tr className="gameDataTable__game" onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game})} key={`playing-${i}`}>
										<td className="gameDataTable__cell gameDataTable__title">{game.title}</td>
										<td className="gameDataTable__cell gameDataTable__date">{game.playthroughs[0].dateStarted}</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			}

			{ currentlyPlaying.length === 0 &&
				<div className="emptyBox">Nothing!</div>
			}
		</div>
	)
}

Playing.propTypes = {
	games: PropTypes.array.isRequired
}

export default Playing
