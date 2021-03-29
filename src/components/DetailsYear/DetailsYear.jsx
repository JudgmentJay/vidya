import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ModalContext } from '../../context'

import {
	DetailDivider,
	Table,
	TableCell,
	TableHeader,
	TableRow
} from '../../components'

import styles from './_styles.module.scss'

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

			const titleClasses = classNames({
				'strikethrough': playthrough.timesCompleted === 0
			})

			return (
				<TableRow
					onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game})}
					hoverHighlight={true}
					key={`details-${year}-${i}`}>
					<TableCell
						type="details"
						modifier="title"
						className={titleClasses}>
						{game.title}
					</TableCell>
					<TableCell type="details" modifier="hours">{playthrough.hoursPlayed}</TableCell>
					<TableCell type="details" modifier="detail">{playthrough.timesCompleted}</TableCell>
					<TableCell type="details" modifier="detail">{game.score}</TableCell>
					<TableCell type="details" modifier="detail">{playthrough.platform}</TableCell>
					<TableCell type="details" modifier="date">{playthrough.dateFinished}</TableCell>
				</TableRow>
			)
		})
	}

	const titleClasses = classNames('clickable', { [styles.activeSort]: sortBy.method === 'title' })
	const hoursClasses = classNames('clickable', { [styles.activeSort]: sortBy.method === 'hoursPlayed' })
	const timesCompletedClasses = classNames('clickable', { [styles.activeSort]: sortBy.method === 'timesCompleted' })
	const scoreClasses = classNames('clickable', { [styles.activeSort]: sortBy.method === 'score' })
	const platformClasses = classNames('clickable', { [styles.activeSort]: sortBy.method === 'platform' })
	const dateFinishedClasses = classNames('clickable', { [styles.activeSort]: sortBy.method === 'dateFinished' })

	return (
		<React.Fragment>
			<DetailDivider year={year} />

			<Table>
				<thead>
					<tr>
						<TableHeader
							type="details"
							modifier="title"
							onClick={() => handleSetSortBy('title')}
							className={titleClasses}>
							<span>Title</span>
						</TableHeader>
						<TableHeader
							type="details"
							modifier="hours"
							onClick={() => handleSetSortBy('hoursPlayed')}
							className={hoursClasses}>
							<span>Hours</span>
						</TableHeader>
						<TableHeader
							type="details"
							modifier="detail"
							onClick={() => handleSetSortBy('timesCompleted')}
							className={timesCompletedClasses}>
							<span>Fin</span>
						</TableHeader>
						<TableHeader
							type="details"
							modifier="detail"
							onClick={() => handleSetSortBy('score')}
							className={scoreClasses}>
							<span>Score</span>
						</TableHeader>
						<TableHeader
							type="details"
							modifier="detail"
							onClick={() => handleSetSortBy('platform')}
							className={platformClasses}>
							<span>Platform</span>
						</TableHeader>
						<TableHeader
							type="details"
							modifier="date"
							onClick={() => handleSetSortBy('dateFinished')}
							className={dateFinishedClasses}>
							<span>Finished</span>
						</TableHeader>
					</tr>
				</thead>
				<tbody>
					{getPlaythroughs()}
				</tbody>
			</Table>
		</React.Fragment>
	)
}

DetailsYear.propTypes = {
	year: PropTypes.number.isRequired,
	games: PropTypes.array.isRequired,
	playthroughs: PropTypes.array.isRequired
}

export default DetailsYear
