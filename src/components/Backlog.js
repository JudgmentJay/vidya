import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ModalContext } from '../context/modal'

const Backlog = ({
	games,
	year
}) => {
	const { dispatch } = useContext(ModalContext)

	const generateGameRows = (games) => {
		return games.map((game) => {
			const releaseDate = !game.releaseDate.includes('December 31')
				? game.releaseDate
				: new Date(game.releaseDate).getFullYear()

			return (
				<tr className="gameDataTable__game" onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game})} key={`backlog-${game.title}`}>
					<td className="gameDataTable__cell gameDataTable__title">{game.title}</td>
					<td className="gameDataTable__cell gameDataTable__date">{releaseDate}</td>
				</tr>
			)
		})
	}

	const now = new Date()
	const currentYear = now.getFullYear()

	const releasedGames = games.filter((game) => new Date(game.releaseDate) <= now)
	const unreleasedGames = games.filter((game) => new Date(game.releaseDate) > now)

	const backlogBoxClasses = classNames('box', {
		'noshrink': typeof year !== 'undefined'
	})

	const wishlistBoxClasses = classNames('box', {
		'noshrink': year !== currentYear
	})

	return (
		<React.Fragment>
			{ releasedGames.length > 0 &&
				<div className={backlogBoxClasses}>
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
				<div className={wishlistBoxClasses}>
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
