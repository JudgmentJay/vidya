import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ModalContext } from '../context/modal'

const Played = ({
	games,
	playthroughs,
	year
}) => {
	const modalContext = useContext(ModalContext)

	const generateGameRows = () => {
		const gamesPlayed = []

		return playthroughs.map((playthrough, i) => {
			const game = games.find((game) => game.id === playthrough.gameId)
			const gameTitle = game.title

			const titleClasses = classNames({
				'gameDataTable__cell gameDataTable__title': true,
				'gameDataTable__title--dropped': playthrough.timesCompleted === 0
			})

			const displayTitle = !gamesPlayed.includes(gameTitle)
				? gameTitle
				: `((${gameTitle}))`

			if (!gamesPlayed.includes(gameTitle)) {
				gamesPlayed.push(gameTitle)
			}

			return (
				<tr className="gameDataTable__game" onClick={() => modalContext.dispatch({type: 'OPEN_MODAL', modalType: 'view', game: playthrough.game})} key={`played-${i}`}>
					<td className={titleClasses}>{displayTitle}</td>
					<td className="gameDataTable__cell gameDataTable__hours">{playthrough.hoursPlayed}</td>
					<td className="gameDataTable__cell gameDataTable__date">{playthrough.dateFinished}</td>
				</tr>
			)
		})
	}

	return (
		<div className="box">
			<h1>Games played in {year}</h1>

			{ playthroughs.length > 0 &&
				<table className="gameDataTable" cellPadding="0" cellSpacing="0">
					<thead>
						<tr>
							<th className="gameDataTable__header gameDataTable__title">Title</th>
							<th className="gameDataTable__header gameDataTable__hours">Hours</th>
							<th className="gameDataTable__header gameDataTable__date">Finished</th>
						</tr>
					</thead>
					<tbody>
						{generateGameRows()}
					</tbody>
				</table>
			}

			{ playthroughs.length === 0 &&
				<div id="emptyBox">Nothing yet!</div>
			}
		</div>
	)
}

Played.propTypes = {
	games: PropTypes.array.isRequired,
	playthroughs: PropTypes.array.isRequired,
	year: PropTypes.number
}

export default Played
