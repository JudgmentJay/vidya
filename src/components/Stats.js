import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { getStats } from '../util/getStats'

import { ModalContext } from '../context/modal'

import YearSelect from './YearSelect'

const Stats = ({
	year,
	games,
	playthroughs
}) => {
	const { dispatch } = useContext(ModalContext)

	let playedGames = games.filter((game) => {
		return game.playthroughs.some((playthrough) => playthrough.dateFinished)
	})

	if (year) {
		const gamesPlayedInSelectedYear = playedGames.filter((game) => {
			return game.playthroughs.some((playthrough) => {
				return new Date(playthrough.dateFinished).getFullYear() === year
			})
		})

		if (!gamesPlayedInSelectedYear.length) {
			year -= 1

			playedGames = playedGames.filter((game) => {
				return game.playthroughs.some((playthrough) => {
					return new Date(playthrough.dateFinished).getFullYear() === year
				})
			})
		} else {
			playedGames = gamesPlayedInSelectedYear
		}
	}

	const initialData = getStats(playedGames, year)

	const [view, setView] = useState({ section: 'stats', year })
	const [data, setData] = useState(initialData)

	const handleSetYear = (year) => {
		const gamesPlayedInSelectedYear = games.filter((game) => {
			return game.playthroughs.some((playthrough) => {
				return playthrough.dateFinished && new Date(playthrough.dateFinished).getFullYear() === year
			})
		})

		setData(getStats(gamesPlayedInSelectedYear, year))
		setView({ section: 'stats', year })
	}

	const yearsOnRecord = []

	playthroughs.forEach((playthrough) => {
		const playthroughYear = playthrough.dateFinished && new Date(playthrough.dateFinished).getFullYear()

		if (playthroughYear && !yearsOnRecord.includes(playthroughYear)) {
			yearsOnRecord.push(playthroughYear)
		}
	})

	const droppedGames = data.gamesPlayed - data.gamesCompleted

	const title = year
		? <h1 className="clickable"><span onClick={() => setView({ section: 'years', year: view.year })}>{view.year}</span> Stats</h1>
		: <h1>2015&ndash;Present Statss</h1>

	return (
		<React.Fragment>
			{ view.section === 'stats' &&
				<div className="box box--stats">
					{title}

					<div className="statsBox">
						<h3>Totals</h3>

						<span className="statsBox__stat">Games played: {data.gamesPlayed}{droppedGames ? ` (${data.gamesCompleted} finished, ${data.gamesPlayed - data.gamesCompleted} dropped)` : ''}</span>
						<span className="statsBox__stat">Hours played: {data.totalHoursPlayed}</span>
						<span className="statsBox__stat">Average game score: {data.averageScore}</span>
					</div>

					{ Boolean(data.gamesPlayed) &&
						<React.Fragment>
							<div className="statsBox">
								<h3>Most Played Games (Hours)</h3>

								{
									data.topGamesByHoursPlayed.map((game, i) => {
										return (
											<span className="statsBox__stat statsBox__stat--linked" onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game: game.gameData })} key={`${view.year}-stats-mostHoursPlayed-${i}`}>
												{i + 1}. {game.gameData.title} - {game.hoursPlayed}
											</span>
										)
									})
								}
							</div>

							{ data.topGamesByPlaythroughCount.length > 0 &&
								<div className="statsBox">
									<h3>Most Played Games (Playthroughs)</h3>

									{
										data.topGamesByPlaythroughCount.map((game, i) => {
											return (
												<span className="statsBox__stat statsBox__stat--linked" onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game: game.gameData})} key={`${view.year}-stats-mostPlaythroughs-${i}`}>
													{i + 1}. {game.gameData.title} - {game.timesCompleted}
												</span>
											)
										})
									}
								</div>
							}

							<div className="statsBox">
								<h3>Platform breakdown</h3>

								{
									data.platformData.map((platform, i) => {
										return (
											<span className="statsBox__stat" key={`${view.year}-stats-platform-${i}`}>
												{i + 1}. {platform[0]} - {platform[1].completed} finished, {platform[1].dropped ? `${platform[1].dropped} dropped, ` : ''} {platform[1].hours} hours
											</span>
										)
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
					onYearSelect={(year) => handleSetYear(year)} />
			}
		</React.Fragment>
	)
}

Stats.propTypes = {
	year: PropTypes.number,
	games: PropTypes.array.isRequired,
	playthroughs: PropTypes.array.isRequired,
	currentDate: PropTypes.instanceOf(Date)
}

export default Stats
