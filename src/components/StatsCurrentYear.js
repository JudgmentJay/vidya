import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { getStats } from '../util/getStats'

import { ModalContext } from '../context/modal'

import YearSelect from './YearSelect'

const StatsCurrentYear = ({
	games,
	playthroughs,
	currentDate
}) => {
	const { dispatch } = useContext(ModalContext)

	const currentYear = currentDate.getFullYear()

	const [view, setView] = useState({ section: 'stats', year: currentYear })
	const [data, setData] = useState({ gamesPlayed: 0, gamesCompleted: 0, totalHoursPlayed: 0, totalPlaythroughs: 0, topGamesByHoursPlayed: [], topGamesByPlaythroughCount: [], platformData: [], averageScore: 0 })

	useEffect(() => {
		const gamesPlayedInCurrentYear = games.filter((game) => game.playthroughs.some((playthrough) => {
			return playthrough.dateFinished && new Date(playthrough.dateFinished).getFullYear() === view.year
		}))

		if (gamesPlayedInCurrentYear.length) {
			setData(getStats(gamesPlayedInCurrentYear, view.year))
		}
	}, [view.year, games])

	const yearsOnRecord = []

	playthroughs.forEach((playthrough) => {
		const playthroughYear = playthrough.dateFinished && new Date(playthrough.dateFinished).getFullYear()

		if (playthroughYear && !yearsOnRecord.includes(playthroughYear)) {
			yearsOnRecord.push(playthroughYear)
		}
	})

	return (
		<React.Fragment>
			{ view.section === 'stats' &&
				<div className="box box--stats">
					<h1 className="clickable"><span onClick={() => setView({ section: 'years', year: view.year })}>{view.year}</span> Stats</h1>

					<div className="statsBox">
						<h3>Totals</h3>

						<span className="statsBox__stat">Games played: {data.gamesPlayed} ({data.gamesCompleted} complete, {data.gamesPlayed - data.gamesCompleted} dropped)</span>
						<span className="statsBox__stat">Playthroughs completed: {data.totalPlaythroughs}</span>
						<span className="statsBox__stat">Hours Played: {data.totalHoursPlayed}</span>
						<span className="statsBox__stat">Average Game Score: {data.averageScore}</span>
					</div>

					{ Boolean(data.gamesPlayed) &&
						<React.Fragment>
							<div className="statsBox">
								<h3>Most Played Games (Hours)</h3>

								{
									data.topGamesByHoursPlayed.map((game, i) => {
										return <span className="statsBox__stat statsBox__stat--linked" onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game: game.gameData })} key={`${view.year !== 'all' ? view.year : 'alltime'}-stats-mostHoursPlayed-${i}`}>{i + 1}. {game.gameData.title} - {game.hoursPlayed}</span>
									})
								}
							</div>

							{ data.topGamesByPlaythroughCount.length > 0 &&
								<div className="statsBox">
									<h3>Most Played Games (Playthroughs)</h3>

									{
										data.topGamesByPlaythroughCount.map((game, i) => {
											return <span className="statsBox__stat statsBox__stat--linked" onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game: game.gameData})} key={`${view.year !== 'all' ? view.year : 'alltime'}-stats-mostPlaythroughs-${i}`}>{i + 1}. {game.gameData.title} - {game.timesCompleted}</span>
										})
									}
								</div>
							}

							<div className="statsBox">
								<h3>Top Platforms Played</h3>

								{
									data.platformData.map((platform, i) => {
										return <span className="statsBox__stat" key={`${view.year !== 'all' ? view.year : 'alltime'}-stats-platform-${i}`}>{i + 1}. {platform[0]} - {platform[1]}</span>
									})
								}
							</div>
						</React.Fragment>
					}
				</div>
			}

			{ view.section === 'years' &&
				<YearSelect
					years={yearsOnRecord}
					selectedYear={view.year}
					onYearSelect={(year) => setView({ section: 'stats', year })} />
			}
		</React.Fragment>
	)
}

StatsCurrentYear.propTypes = {
	games: PropTypes.array.isRequired,
	playthroughs: PropTypes.array.isRequired,
	currentDate: PropTypes.instanceOf(Date).isRequired
}

export default StatsCurrentYear
