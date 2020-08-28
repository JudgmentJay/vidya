import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { ModalContext } from '../context/modal'

const BacklogCurrentYear = ({
	games,
	currentDate
}) => {
	const { dispatch } = useContext(ModalContext)

	const currentYear = currentDate.getFullYear()

	const startOfYear = new Date(`January 1, ${currentYear}`)
	const endOfYear = new Date(`January 1, ${currentYear + 1}`)

	const unplayedGamesFromCurrentYear = games
		.filter((game) => {
			const releaseDate = new Date(game.releaseDate)

			return game.playthroughs.length === 0 && releaseDate >= startOfYear && releaseDate < endOfYear
		})
		.sort((gameA, gameB) => new Date(gameA.releaseDate) - new Date(gameB.releaseDate))

	const releasedGames = unplayedGamesFromCurrentYear.filter((game) => new Date(game.releaseDate) <= currentDate)

	return (
		<React.Fragment>
			{ releasedGames.length > 0 &&
				<div className="box noshrink">
					<h1>{currentYear} Backlog</h1>

					<table className="gameDataTable" cellPadding="0" cellSpacing="0">
						<thead>
							<tr>
								<th className="gameDataTable__header gameDataTable__title">Title</th>
								<th className="gameDataTable__header gameDataTable__date">Release Date</th>
							</tr>
						</thead>
						<tbody>
							{
								releasedGames.map((game) => {
									const releaseDate = !game.releaseDate.includes('December 31')
										? game.releaseDate
										: currentYear

									return (
										<tr className="gameDataTable__game" onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game})} key={`backlog-${game.title}`}>
											<td className="gameDataTable__cell gameDataTable__title">{game.title}</td>
											<td className="gameDataTable__cell gameDataTable__date">{releaseDate}</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
			}
		</React.Fragment>
	)
}

BacklogCurrentYear.propTypes = {
	games: PropTypes.array.isRequired,
	currentDate: PropTypes.instanceOf(Date).isRequired
}

export default BacklogCurrentYear
