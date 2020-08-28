import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ModalContext } from '../context/modal'

const DetailsYear = ({
	year,
	games,
	playthroughs
}) => {
	const { dispatch } = useContext(ModalContext)

	const [sortBy, setSortBy] = useState({ method: 'dateFinished', desc: true })

	const handleSetSortBy = (method) => {
		if (method === sortBy.method) {
			setSortBy({ method, desc: !sortBy.desc })
		} else {
			setSortBy({ method, desc: true })
		}
	}

	const compareValues = (valuePairs) => {
		if (valuePairs[0][0] > valuePairs[0][1]) return sortBy.desc ? -1 : 1
		if (valuePairs[0][0] < valuePairs[0][1]) return sortBy.desc ? 1 : -1

		if (valuePairs[1][0] > valuePairs[1][1]) return -1
		if (valuePairs[1][0] < valuePairs[1][1]) return 1

		return 0
	}

	const getPlaythroughs = () => {
		playthroughs.sort((playthroughA, playthroughB) => {
			const gameA = games.find((game) => game.id === playthroughA.gameId)
			const gameB = games.find((game) => game.id === playthroughB.gameId)

			const titleA = gameA.title.replace(/The /, '').toLowerCase()
			const titleB = gameB.title.replace(/The /, '').toLowerCase()

			switch (sortBy.method) {
				case 'title': {
					const dateFinishedA = new Date(playthroughA.dateFinished)
					const dateFinishedB = new Date(playthroughB.dateFinished)

					return compareValues([[titleB, titleA], [dateFinishedA, dateFinishedB]])
				}
				case 'dateFinished': {
					const dateFinishedA = new Date(playthroughA.dateFinished)
					const dateFinishedB = new Date(playthroughB.dateFinished)

					return compareValues([[dateFinishedA, dateFinishedB], [titleB, titleA]])
				}
				case 'score': {
					const scoreA = gameA.score
					const scoreB = gameB.score

					return compareValues([[scoreA, scoreB], [titleB, titleA]])
				}
				default: {
					const comparisonA = playthroughA[sortBy.method]
					const comparisonB = playthroughB[sortBy.method]

					return compareValues([[comparisonA, comparisonB], [titleB, titleA]])
				}
			}
		})

		return playthroughs.map((playthrough, i) => {
			const game = games.find((game) => game.id === playthrough.gameId)
			const gameTitle = game.title
			const gameScore = game.score

			const titleClasses = classNames('gameDataTable__cell gameDataTable__title', {
				'gameDataTable__title--dropped': playthrough.timesCompleted === 0
			})

			return (
				<tr className="gameDataTable__game" onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game})} key={`details-${year}-${i}`}>
					<td className={titleClasses}>{gameTitle}</td>
					<td className="gameDataTable__cell gameDataTable__detailsHours">{playthrough.hoursPlayed}</td>
					<td className="gameDataTable__cell gameDataTable__small">{playthrough.timesCompleted}</td>
					<td className="gameDataTable__cell gameDataTable__small">{gameScore}</td>
					<td className="gameDataTable__cell gameDataTable__small">{playthrough.platform}</td>
					<td className="gameDataTable__cell gameDataTable__date">{playthrough.dateFinished}</td>
				</tr>
			)
		})
	}

	const now = new Date()
	const currentYear = now.getFullYear()

	const dividerClasses = classNames('gameDataTable__divider', { 'gameDataTable__divider--currentYear': currentYear === year })
	const headerClass = 'gameDataTable__header'
	const titleClasses = classNames(`${headerClass} gameDataTable__title`, { 'is-active-sort': sortBy.method === 'title' })
	const hoursClasses = classNames(`${headerClass} gameDataTable__detailsHours`, { 'is-active-sort': sortBy.method === 'hoursPlayed' })
	const timesCompletedClasses = classNames(`${headerClass} gameDataTable__small`, { 'is-active-sort': sortBy.method === 'timesCompleted' })
	const scoreClasses = classNames(`${headerClass} gameDataTable__small`, { 'is-active-sort': sortBy.method === 'score' })
	const platformClasses = classNames(`${headerClass} gameDataTable__small`, { 'is-active-sort': sortBy.method === 'platform' })
	const dateFinishedClasses = classNames(`${headerClass} gameDataTable__date`, { 'is-active-sort': sortBy.method === 'dateFinished' })

	return (
		<React.Fragment>
			<div className={dividerClasses}>{year}</div>
			<table className="gameDataTable gameDataTable--details" cellPadding="0" cellSpacing="0">
				<thead>
					<tr>
						<th className={titleClasses} onClick={() => handleSetSortBy('title')}><span>Title</span></th>
						<th className={hoursClasses} onClick={() => handleSetSortBy('hoursPlayed')}><span>Hours</span></th>
						<th className={timesCompletedClasses} onClick={() => handleSetSortBy('timesCompleted')}><span>Fin</span></th>
						<th className={scoreClasses} onClick={() => handleSetSortBy('score')}><span>Score</span></th>
						<th className={platformClasses} onClick={() => handleSetSortBy('platform')}><span>Platform</span></th>
						<th className={dateFinishedClasses} onClick={() => handleSetSortBy('dateFinished')}><span>Finished</span></th>
					</tr>
				</thead>
				<tbody>
					{getPlaythroughs()}
				</tbody>
			</table>
		</React.Fragment>
	)
}

DetailsYear.propTypes = {
	year: PropTypes.number.isRequired,
	games: PropTypes.array.isRequired,
	playthroughs: PropTypes.array.isRequired
}

export default DetailsYear
