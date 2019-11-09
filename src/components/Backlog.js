import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { ModalContext } from '../context/modal'

const Backlog = ({
	games,
	year
}) => {
	const modalContext = useContext(ModalContext)

	const generateGameRows = () => {
		return games.map((game) => {
			let releaseDate = game.releaseDate

			if (releaseDate.includes('December 31')) {
				releaseDate = new Date(releaseDate).getFullYear()
			}

			return (
				<tr className="gameDataTable__game" onClick={() => modalContext.dispatch({type: 'OPEN_MODAL', modalType: 'view', game})} key={`backlog-${game.title}`}>
					<td className="gameDataTable__cell gameDataTable__title">{game.title}</td>
					<td className="gameDataTable__cell gameDataTable__date">{releaseDate}</td>
				</tr>
			)
		})
	}

	const now = new Date()

	const releasedGames = games.filter((game) => new Date(game.releaseDate) <= now)
	const unreleasedGames = games.filter((game) => new Date(game.releaseDate) > now)

	return (
		<React.Fragment>
			{ releasedGames.length > 0 &&
				<div className={`box ${year ? 'noshrink' : ''}`}>
					<h1>{year ? year : 'Older'} Backlog</h1>

					<table className="gameDataTable" cellPadding="0" cellSpacing="0">
						<thead>
							<tr>
								<th className="gameDataTable__header gameDataTable__title">Title</th>
								<th className="gameDataTable__header gameDataTable__date">Release Date</th>
							</tr>
						</thead>
						<tbody>
							{generateGameRows(releasedGames)}
						</tbody>
					</table>
				</div>
			}

			{ unreleasedGames.length > 0 &&
				<div className="box">
					<h1>{year} Wishlist</h1>

					<table className="gameDataTable" cellPadding="0" cellSpacing="0">
						<thead>
							<tr>
								<th className="gameDataTable__header gameDataTable__title">Title</th>
								<th className="gameDataTable__header gameDataTable__date">Release Date</th>
							</tr>
						</thead>
						<tbody>
							{generateGameRows(unreleasedGames)}
						</tbody>
					</table>
				</div>
			}
		</React.Fragment>
	)
}

Backlog.propTypes = {
	games: PropTypes.array.isRequired,
	year: PropTypes.number
}

export default Backlog
