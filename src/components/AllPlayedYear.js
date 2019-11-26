import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ModalContext } from '../context/modal'

const AllPlayedYear = ({
	year,
	games,
	playthroughs,
	sortBy
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

	const playthroughsForMapping = useMemo(() => {
		const clonedPlaythroughs = [...playthroughs]

		clonedPlaythroughs.forEach((playthrough) => {
			const game = games.find((game) => game.id === playthrough.gameId)

			playthrough.game = game
		})

		return clonedPlaythroughs
	}, [games, playthroughs])

	const compareValues = (valuePairs) => {
		if (valuePairs[0][0] > valuePairs[0][1]) return sortBy.desc ? -1 : 1
		if (valuePairs[0][0] < valuePairs[0][1]) return sortBy.desc ? 1 : -1

		if (valuePairs.length === 2) {
			if (valuePairs[1][0] > valuePairs[1][1]) return -1
			if (valuePairs[1][0] < valuePairs[1][1]) return 1
		}

		return 0
	}

	const generateGameRows = () => {
		if (sortBy.method === 'title') {
			playthroughsForMapping.sort((playthroughA, playthroughB) => {
				const titleA = playthroughA.game.title.toLowerCase()
				const titleB = playthroughB.game.title.toLowerCase()

				const dateFinishedA = new Date(playthroughA.dateFinished)
				const dateFinishedB = new Date(playthroughB.dateFinished)

				return compareValues([[titleB, titleA], [dateFinishedA, dateFinishedB]])
			})
		} else if (sortBy.method === 'hours') {
			playthroughsForMapping.sort((playthroughA, playthroughB) => {
				const hoursA = parseInt(playthroughA.hoursPlayed)
				const hoursB = parseInt(playthroughB.hoursPlayed)

				const titleA = playthroughA.game.title.toLowerCase()
				const titleB = playthroughB.game.title.toLowerCase()

				return compareValues([[hoursA, hoursB], [titleB, titleA]])
			})
		} else if (sortBy.method === 'timesCompleted') {
			playthroughsForMapping.sort((playthroughA, playthroughB) => {
				const timesCompletedA = playthroughA.timesCompleted
				const timesCompletedB = playthroughB.timesCompleted

				const titleA = playthroughA.game.title.toLowerCase()
				const titleB = playthroughB.game.title.toLowerCase()

				return compareValues([[timesCompletedA, timesCompletedB], [titleB, titleA]])
			})
		} else if (sortBy.method === 'score') {
			playthroughsForMapping.sort((playthroughA, playthroughB) => {
				const scoreA = playthroughA.game.score
				const scoreB = playthroughB.game.score

				const titleA = playthroughA.game.title.toLowerCase()
				const titleB = playthroughB.game.title.toLowerCase()

				return compareValues([[scoreA, scoreB], [titleB, titleA]])
			})
		} else if (sortBy.method === 'platform') {
			playthroughsForMapping.sort((playthroughA, playthroughB) => {
				const platformA = playthroughA.platform
				const platformB = playthroughB.platform

				const titleA = playthroughA.game.title.toLowerCase()
				const titleB = playthroughB.game.title.toLowerCase()

				return compareValues([[platformB, platformA], [titleB, titleA]])
			})
		} else if (sortBy.method === 'dateFinished') {
			playthroughsForMapping.sort((playthroughA, playthroughB) => {
				const dateFinishedA = new Date(playthroughA.dateFinished)
				const dateFinishedB = new Date(playthroughB.dateFinished)

				const titleA = playthroughA.game.title.toLowerCase()
				const titleB = playthroughB.game.title.toLowerCase()

				return compareValues([[dateFinishedA, dateFinishedB], [titleB, titleA]])
			})
		}

		return playthroughsForMapping.map((playthrough, i) => {
			const titleClasses = classNames('gameDataTable__cell gameDataTable__title', { 'gameDataTable__title--dropped': playthrough.timesCompleted === 0 })

			return (
				<tr className="gameDataTable__game" onClick={() => modalContext.dispatch({type: 'TOGGLE_VIEW_AND_SEARCH_MODAL', modalType: 'view', game: playthrough.game})} key={`allplayed-${year}-${i}`}>
					<td className={titleClasses}>{playthrough.game.title}</td>
					<td className="gameDataTable__cell gameDataTable__allPlayedHours">{playthrough.hoursPlayed}</td>
					<td className="gameDataTable__cell gameDataTable__small">{playthrough.timesCompleted}</td>
					<td className="gameDataTable__cell gameDataTable__small">{playthrough.game.score}</td>
					<td className="gameDataTable__cell gameDataTable__small">{playthrough.platform}</td>
					<td className="gameDataTable__cell gameDataTable__date">{playthrough.dateFinished}</td>
				</tr>
			)
		})
	}

	return (
		<React.Fragment>
			{ new Date(playthroughs[0].dateFinished).getFullYear() !== new Date().getFullYear() &&
				<tr>
					<td className="gameDataTable__cell" colSpan={getColspan()}>
						<div className="gameDataTable__divider">{year}</div>
					</td>
				</tr>
			}

			{generateGameRows()}
		</React.Fragment>
	)
}

AllPlayedYear.propTypes = {
	year: PropTypes.number.isRequired,
	games: PropTypes.array.isRequired,
	playthroughs: PropTypes.array.isRequired,
	sortBy: PropTypes.object.isRequired
}

export default AllPlayedYear
