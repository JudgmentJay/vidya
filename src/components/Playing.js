import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { ModalContext } from '../context/modal'

const Playing = ({ games }) => {
	const modalContext = useContext(ModalContext)

	const generateGameRows = () => {
		return games.map((game, i) => {
			return (
				<tr className="gameDataTable__game" onClick={() => modalContext.dispatch({type: 'OPEN_MODAL', modalType: 'view', game})} key={`playing-${i}`}>
					<td className="gameDataTable__cell gameDataTable__title">{game.title}</td>
					<td className="gameDataTable__cell gameDataTable__date">{game.playthroughs[0].dateStarted}</td>
				</tr>
			)
		})
	}

	return (
		<div className="box noshrink">
			<h1>Currently Playing</h1>

			{ games.length > 0 &&
				<table className="gameDataTable" cellPadding="0" cellSpacing="0">
					<thead>
						<tr>
							<th className="gameDataTable__header gameDataTable__title">Title</th>
							<th className="gameDataTable__header gameDataTable__date">Started</th>
						</tr>
					</thead>
					<tbody>
						{generateGameRows()}
					</tbody>
				</table>
			}

			{ games.length === 0 &&
				<div id="emptyBox">Nothing!</div>
			}
		</div>
	)
}

Playing.propTypes = {
	games: PropTypes.array.isRequired
}

export default Playing