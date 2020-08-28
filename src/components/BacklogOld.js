import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { ModalContext } from '../context/modal'

const BacklogOld = ({
	games,
	currentDate
}) => {
	const { dispatch } = useContext(ModalContext)

	const currentYear = currentDate.getFullYear()

	const olderUnplayedGames = games
		.filter((game) => {
			return game.playthroughs.length === 0 && new Date(game.releaseDate) < new Date(`January 1, ${currentYear}`)
		})
		.sort((gameA, gameB) => new Date(gameB.releaseDate) - new Date(gameA.releaseDate))

	return (
		<React.Fragment>
			<div className="box">
				<h1>Older Backlog</h1>

				<table className="gameDataTable" cellPadding="0" cellSpacing="0">
					<thead>
						<tr>
							<th className="gameDataTable__header gameDataTable__title">Title</th>
							<th className="gameDataTable__header gameDataTable__date">Release Date</th>
						</tr>
					</thead>
					<tbody>
						{
							olderUnplayedGames.map((game) => {
								return (
									<tr className="gameDataTable__game" onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game})} key={`backlog-${game.title}`}>
										<td className="gameDataTable__cell gameDataTable__title">{game.title}</td>
										<td className="gameDataTable__cell gameDataTable__date">{game.releaseDate}</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
		</React.Fragment>
	)
}

BacklogOld.propTypes = {
	games: PropTypes.array.isRequired,
	currentDate: PropTypes.instanceOf(Date).isRequired
}

export default BacklogOld
