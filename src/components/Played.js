import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ModalContext } from '../context/modal'

const Played = ({
	games,
	playthroughs,
	currentYear
}) => {
	const { dispatch } = useContext(ModalContext)

	const currentYearPlaythroughs = playthroughs
		.filter((playthrough) => {
			const yearFinished = new Date(playthrough.dateFinished).getFullYear()

			return playthrough.dateFinished && yearFinished === currentYear
		})
		.sort((playthroughA, playthroughB) => {
			const gameTitleA = games.find((game) => game.id === playthroughA.gameId).title
			const gameTitleB = games.find((game) => game.id === playthroughB.gameId).title

			if (new Date(playthroughA.dateFinished) > new Date(playthroughB.dateFinished)) return 1
			if (new Date(playthroughA.dateFinished) < new Date(playthroughB.dateFinished)) return -1

			if (gameTitleA > gameTitleB) return 1
			if (gameTitleA < gameTitleB) return -1

			return 0
		})

	const getGamesPlayed = () => {
		const gamesPlayed = []

		return currentYearPlaythroughs.map((playthrough, i) => {
			const game = games.find((game) => game.id === playthrough.gameId)
			const gameTitle = game.title

			if (!gamesPlayed.includes(gameTitle)) {
				gamesPlayed.push(gameTitle)
			}

			const titleClasses = classNames('gameDataTable__cell gameDataTable__title', {
				'gameDataTable__title--dropped': playthrough.timesCompleted === 0
			})

			return (
				<tr className="gameDataTable__game" onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game})} key={`played-${i}`}>
					<td className={titleClasses}>{gameTitle}</td>
					<td className="gameDataTable__cell gameDataTable__hours">{playthrough.hoursPlayed}</td>
					<td className="gameDataTable__cell gameDataTable__date">{playthrough.dateFinished}</td>
				</tr>
			)
		})
	}

	return (
		<div className="box">
			<h1>Games played in {currentYear}</h1>

			{ currentYearPlaythroughs.length > 0 &&
				<table className="gameDataTable" cellPadding="0" cellSpacing="0">
					<thead>
						<tr>
							<th className="gameDataTable__header gameDataTable__title">Title</th>
							<th className="gameDataTable__header gameDataTable__hours">Hours</th>
							<th className="gameDataTable__header gameDataTable__date">Finished</th>
						</tr>
					</thead>
					<tbody>
						{getGamesPlayed()}
					</tbody>
				</table>
			}

			{ currentYearPlaythroughs.length === 0 &&
				<div className="emptyBox">Nothing yet!</div>
			}
		</div>
	)
}

Played.propTypes = {
	games: PropTypes.array.isRequired,
	playthroughs: PropTypes.array.isRequired,
	currentYear: PropTypes.number.isRequired
}

export default Played
