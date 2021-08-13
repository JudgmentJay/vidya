import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { getStats } from '../../util/getStats'

import { ModalContext } from '../../context'

import {
	Box,
	Stat,
	StatsContainer,
	YearSelect
} from '../../components'

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
		: <h1>2015&ndash;Present Stats</h1>

	return (
		<React.Fragment>
			{ view.section === 'stats' &&
				<Box modifier="stats">
					{title}

					<StatsContainer>
						<h3>Totals</h3>

						<Stat>
							Unique games played: {data.gamesPlayed}{droppedGames ? ` (${data.gamesCompleted} finished, ${data.gamesPlayed - data.gamesCompleted} dropped)` : ''}
						</Stat>
						<Stat>
							Hours played: {data.totalHoursPlayed}
						</Stat>
						<Stat>
							Playthroughs completed: {data.totalPlaythroughs}
						</Stat>
						<Stat>
							Average game score: {data.averageScore}
						</Stat>
					</StatsContainer>

					{ Boolean(data.gamesPlayed) &&
						<React.Fragment>
							<StatsContainer>
								<h3>Most Played Games (Hours)</h3>

								{
									data.topGamesByHoursPlayed.map((game, i) => {
										return (
											<Stat
												modifier="linked"
												onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game: game.gameData })}
												key={`${view.year}-stats-mostHoursPlayed-${i}`}>
												{i + 1}. {game.gameData.title} - {game.hoursPlayed}
											</Stat>
										)
									})
								}
							</StatsContainer>

							{ data.topGamesByPlaythroughCount.length > 0 &&
								<StatsContainer>
									<h3>Most Played Games (Playthroughs)</h3>

									{
										data.topGamesByPlaythroughCount.map((game, i) => {
											return (
												<Stat
													modifier="linked"
													onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game: game.gameData})}
													key={`${view.year}-stats-mostPlaythroughs-${i}`}>
													{i + 1}. {game.gameData.title} - {game.playthroughCount}
												</Stat>
											)
										})
									}
								</StatsContainer>
							}

							<StatsContainer>
								<h3>Platform breakdown</h3>

								{
									data.platformData.map((platform, i) => {
										const platformName = platform[0]
										const completed = platform[1].completed
										const dropped = platform[1].dropped
										const hoursPlayed = platform[1].hours

										return (
											<Stat key={`${view.year}-stats-platform-${i}`}>
												{i + 1}. {platformName} - {completed} finished, { Boolean(dropped) && <React.Fragment>{dropped} dropped, </React.Fragment> } {hoursPlayed} hours
											</Stat>
										)
									})
								}
							</StatsContainer>
						</React.Fragment>
					}
				</Box>
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
