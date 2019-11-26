import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import AllPlayedYear from './AllPlayedYear'

const AllPlayed = ({
	games,
	playthroughs
}) => {
	const [sortBy, setSortBy] = useState({ method: 'dateFinished', desc: true })

	const handleSetSortBy = (method) => {
		if (method === sortBy.method) {
			setSortBy({ method, desc: !sortBy.desc })
		} else {
			setSortBy({ method, desc: true })
		}
	}

	const yearsOnRecord = []

	playthroughs.forEach((playthrough) => {
		if (playthrough.dateFinished && !yearsOnRecord.includes(new Date(playthrough.dateFinished).getFullYear())) {
			yearsOnRecord.push(new Date(playthrough.dateFinished).getFullYear())
		}
	})

	const headerClass = 'gameDataTable__header'
	const titleClasses = classNames(`${headerClass} gameDataTable__title`, { 'is-active-sort': sortBy.method === 'title' })
	const hoursClasses = classNames(`${headerClass} gameDataTable__allPlayedHours`, { 'is-active-sort': sortBy.method === 'hours' })
	const timesCompletedClasses = classNames(`${headerClass} gameDataTable__small`, { 'is-active-sort': sortBy.method === 'timesCompleted' })
	const scoreClasses = classNames(`${headerClass} gameDataTable__small`, { 'is-active-sort': sortBy.method === 'score' })
	const platformClasses = classNames(`${headerClass} gameDataTable__small`, { 'is-active-sort': sortBy.method === 'platform' })
	const dateFinishedClasses = classNames(`${headerClass} gameDataTable__date`, { 'is-active-sort': sortBy.method === 'dateFinished' })

	return (
		<div className="box">
			<h1>Games Played 2015&ndash;Present</h1>

			<table className="gameDataTable gameDataTable--allPlayed" cellPadding="0" cellSpacing="0">
				<thead>
					<tr>
						<th className={titleClasses} onClick={() => handleSetSortBy('title')}><span>Title</span></th>
						<th className={hoursClasses} onClick={() => handleSetSortBy('hours')}><span>Hours</span></th>
						<th className={timesCompletedClasses} onClick={() => handleSetSortBy('timesCompleted')}><span>Fin</span></th>
						<th className={scoreClasses} onClick={() => handleSetSortBy('score')}><span>Score</span></th>
						<th className={platformClasses} onClick={() => handleSetSortBy('platform')}><span>Platform</span></th>
						<th className={dateFinishedClasses} onClick={() => handleSetSortBy('dateFinished')}><span>Finished</span></th>
					</tr>
				</thead>
				<tbody>
					{
						yearsOnRecord.map((year, i) => {
							return (
								<AllPlayedYear
									year={year}
									games={games}
									playthroughs={playthroughs.filter((playthrough) => playthrough.dateFinished && new Date(playthrough.dateFinished).getFullYear() === year)}
									sortBy={sortBy}
									key={`AllPlayed-${i}`} />
							)
						})
					}
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
