import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ModalContext } from '../context/modal'

const Played = ({
	games,
	year
}) => {
	const modalContext = useContext(ModalContext)

	const generateGameRows = () => {
		return games.map((game, i) => {
			let hoursPlayedThisYear = 0
			let finishedThisYear = false

			game.playthroughs.forEach((playthrough) => {
				if (new Date(playthrough.dateFinished).getFullYear() === year) {
					hoursPlayedThisYear += playthrough.hoursPlayed
				}

				if (!finishedThisYear && playthrough.timesCompleted) {
					finishedThisYear = true
				}
			})

			const titleClasses = classNames({
				'gameDataTable__cell gameDataTable__title': true,
				'gameDataTable__title--dropped': !finishedThisYear
			})

			return (
				<tr className="gameDataTable__game" onClick={() => modalContext.dispatch({type: 'TOGGLE_VIEW_GAME_MODAL', game})} key={`played-${i}`}>
					<td className={titleClasses}>{game.title}</td>
					<td className="gameDataTable__cell gameDataTable__hours">{hoursPlayedThisYear}</td>
					<td className="gameDataTable__cell gameDataTable__date">{game.playthroughs[0].dateFinished}</td>
				</tr>
			)
		})
	}

	return (
		<div className="box">
			<h1>Games played in {year}</h1>

			<table className="gameDataTable" cellPadding="0" cellSpacing="0">
				<thead>
					<tr>
						<th className="gameDataTable__header gameDataTable__title">Title</th>
						<th className="gameDataTable__header gameDataTable__hours">Hours</th>
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

Played.propTypes = {
	games: PropTypes.array.isRequired,
	year: PropTypes.number
}

export default Played
