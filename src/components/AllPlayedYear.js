import React, { useContext } from 'react'
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

	const compareValues = (valuePairs) => {
		if (valuePairs[0][0] > valuePairs[0][1]) return sortBy.desc ? -1 : 1
		if (valuePairs[0][0] < valuePairs[0][1]) return sortBy.desc ? 1 : -1

		if (valuePairs[1][0] > valuePairs[1][1]) return -1
		if (valuePairs[1][0] < valuePairs[1][1]) return 1

		return 0
	}

	const generateGameRows = () => {
		playthroughs.sort((playthroughA, playthroughB) => {
			const gameA = games.find((game) => game.id === playthroughA.gameId)
			const gameB = games.find((game) => game.id === playthroughB.gameId)

			const titleA = gameA.title.replace(/The /, '').toLowerCase()
			const titleB = gameB.title.replace(/The /, '').toLowerCase()

			const scoreA = gameA.score
			const scoreB = gameB.score

			let comparisonA
			let comparisonB

			switch (sortBy.method) {
				case 'title': {
					const dateFinishedA = new Date(playthroughA.dateFinished)
					const dateFinishedB = new Date(playthroughB.dateFinished)

					return compareValues([[titleB, titleA], [dateFinishedA, dateFinishedB]])
				}
				case 'dateFinished': {
					comparisonA = new Date(playthroughA.dateFinished)
					comparisonB = new Date(playthroughB.dateFinished)

					break
				}
				case 'score': {
					comparisonA = scoreA
					comparisonB = scoreB

					break
				}
				default: {
					comparisonA = playthroughA[sortBy.method]
					comparisonB = playthroughB[sortBy.method]

					break
				}
			}

			return compareValues([[comparisonA, comparisonB], [titleB, titleA]])
		})

		return playthroughs.map((playthrough, i) => {
			const game = games.find((game) => game.id === playthrough.gameId)
			const gameTitle = game.title
			const gameScore = game.score

			const titleClasses = classNames('gameDataTable__cell gameDataTable__title', { 'gameDataTable__title--dropped': playthrough.timesCompleted === 0 })

			return (
				<tr className="gameDataTable__game" onClick={() => modalContext.dispatch({type: 'OPEN_MODAL', modalType: 'view', game})} key={`allplayed-${year}-${i}`}>
					<td className={titleClasses}>{gameTitle}</td>
					<td className="gameDataTable__cell gameDataTable__allPlayedHours">{playthrough.hoursPlayed}</td>
					<td className="gameDataTable__cell gameDataTable__small">{playthrough.timesCompleted}</td>
					<td className="gameDataTable__cell gameDataTable__small">{gameScore}</td>
					<td className="gameDataTable__cell gameDataTable__small">{playthrough.platform}</td>
					<td className="gameDataTable__cell gameDataTable__date">{playthrough.dateFinished}</td>
				</tr>
			)
		})
	}

	return (
		<React.Fragment>
			<tr>
				<td className="gameDataTable__cell" colSpan={getColspan()}>
					<div className="gameDataTable__divider">{year}</div>
				</td>
			</tr>

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
