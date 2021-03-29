import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ModalContext } from '../../context'

import {
	Box,
	Table,
	TableCell,
	TableHeader,
	TableRow
} from '../../components'

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

			const titleClasses = classNames({
				'strikethrough': playthrough.timesCompleted === 0
			})

			return (
				<TableRow
					onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game})}
					hoverHighlight={true}
					key={`played-${i}`}>
					<TableCell modifier="title" className={titleClasses}>{gameTitle}</TableCell>
					<TableCell modifier="hours">{playthrough.hoursPlayed}</TableCell>
					<TableCell modifier="date">{playthrough.dateFinished}</TableCell>
				</TableRow>
			)
		})
	}

	return (
		<Box>
			<h1>Games played in {currentYear}</h1>

			{ currentYearPlaythroughs.length > 0 &&
				<Table>
					<thead>
						<tr>
							<TableHeader modifier="title">Title</TableHeader>
							<TableHeader modifier="hours">Hours</TableHeader>
							<TableHeader modifier="date">Finished</TableHeader>
						</tr>
					</thead>
					<tbody>
						{getGamesPlayed()}
					</tbody>
				</Table>
			}

			{ currentYearPlaythroughs.length === 0 &&
				<p>Nothing yet!</p>
			}
		</Box>
	)
}

Played.propTypes = {
	games: PropTypes.array.isRequired,
	playthroughs: PropTypes.array.isRequired,
	currentYear: PropTypes.number.isRequired
}

export default Played
