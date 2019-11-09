import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ModalContext } from '../context/modal'

const AllPlayed = ({
	games,
	playthroughs
}) => {
	const modalContext = useContext(ModalContext)

	const getColspan = () => {
		const windowWidth = document.body.offsetWidth

		let colspan

		if (windowWidth < 1000) {
			colspan = 2
		} else if (windowWidth >= 1000 && windowWidth < 1400) {
			colspan = 3
		} else {
			colspan = 6
		}

		return colspan
	}

	const generateGameRows = () => {
		const playthroughsSortedByDateFinished = playthroughs.sort((playthroughA, playthroughB) => new Date(playthroughB.dateFinished) - new Date(playthroughA.dateFinished))

		let year = new Date(playthroughsSortedByDateFinished[0].dateFinished).getFullYear()

		return playthroughsSortedByDateFinished.map((playthrough, i) => {
			const game = games.find((game) => game.id === playthrough.gameId)

			const titleClasses = classNames('gameDataTable__cell gameDataTable__title', { 'gameDataTable__title--dropped': playthrough.timesCompleted === 0 })

			if (playthrough.dateFinished) {
				if (new Date(playthrough.dateFinished).getFullYear() !== year) {
					year = new Date(playthrough.dateFinished).getFullYear()

					return (
						<React.Fragment key={`allPlayed-${i}`}>
							<tr>
								<td className="gameDataTable__cell" colSpan={getColspan()}>
									<div className="gameDataTable__divider">{year}</div>
								</td>
							</tr>
							<tr className="gameDataTable__game" onClick={() => modalContext.dispatch({type: 'TOGGLE_VIEW_GAME_MODAL', game})}>
								<td className={titleClasses}>{game.title}</td>
								<td className="gameDataTable__cell gameDataTable__allPlayedHours">{playthrough.hoursPlayed}</td>
								<td className="gameDataTable__cell gameDataTable__small">{playthrough.timesCompleted}</td>
								<td className="gameDataTable__cell gameDataTable__small">{game.score}</td>
								<td className="gameDataTable__cell gameDataTable__small">{playthrough.platform}</td>
								<td className="gameDataTable__cell gameDataTable__date">{playthrough.dateFinished}</td>
							</tr>
						</React.Fragment>
					)
				} else {
					return (
						<tr className="gameDataTable__game" onClick={() => modalContext.dispatch({type: 'TOGGLE_VIEW_GAME_MODAL', game})} key={`allplayed-${i}`}>
							<td className={titleClasses}>{game.title}</td>
							<td className="gameDataTable__cell gameDataTable__allPlayedHours">{playthrough.hoursPlayed}</td>
							<td className="gameDataTable__cell gameDataTable__small">{playthrough.timesCompleted}</td>
							<td className="gameDataTable__cell gameDataTable__small">{game.score}</td>
							<td className="gameDataTable__cell gameDataTable__small">{playthrough.platform}</td>
							<td className="gameDataTable__cell gameDataTable__date">{playthrough.dateFinished}</td>
						</tr>
					)
				}
			} else {
				return
			}
		})
	}

	return (
		<div className="box">
			<h1>All Games Played</h1>

			<table className="gameDataTable gameDataTable--allPlayed" cellPadding="0" cellSpacing="0">
				<thead>
					<tr>
						<th className="gameDataTable__header gameDataTable__title">Title</th>
						<th className="gameDataTable__header gameDataTable__allPlayedHours">Hours</th>
						<th className="gameDataTable__header gameDataTable__small">Fin</th>
						<th className="gameDataTable__header gameDataTable__small">Score</th>
						<th className="gameDataTable__header gameDataTable__small">Platform</th>
						<th className="gameDataTable__header gameDataTable__date">Finished</th>
					</tr>
				</thead>
				<tbody>
					{ generateGameRows() }
				</tbody>
			</table>
		</div>
	)
}

AllPlayed.propTypes = {
	games: PropTypes.array.isRequired,
	playthroughs: PropTypes.array.isRequired
}

export default AllPlayed
