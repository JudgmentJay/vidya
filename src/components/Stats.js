import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { ModalContext } from '../context/modal'

const Stats = ({
	initialYear,
	games,
	id
}) => {
	const modalContext = useContext(ModalContext)

	const [view, setView] = useState({ section: 'stats', year: initialYear ? initialYear : 'all' })
	const [data, setData] = useState({ beatenGames: 0, totalHoursPlayed: 0, totalPlaythroughs: 0, platformData: [], topGamesByHoursPlayed: [], topGamesByPlaythroughCount: [], averageScore: 0 })

	useEffect(() => {
		const relevantGames = view.year === 'all'
			? games.filter((game) => !game.playing && game.playthroughs.length > 0)
			: games.filter((game) => !game.playing && game.playthroughs.length > 0 && game.playthroughs.some((playthrough) => new Date(playthrough.dateFinished).getFullYear() === view.year))

		const beatenGames = relevantGames.filter((game) => game.playthroughs.some((playthrough) => playthrough.timesCompleted > 0)).length
		let totalHoursPlayed = 0
		let totalPlaythroughs = 0
		const tempPlatformData = {}
		const platformData = []
		const topGamesByHoursPlayed = []
		const topGamesByPlaythroughCount = []
		const scores = []

		relevantGames.forEach((game) => {
			const usedPlatforms = []
			let gameHoursPlayed = 0
			let timesCompleted = 0

			const relevantPlaythroughs = view.year === 'all'
				? game.playthroughs.filter((playthrough) => playthrough.dateFinished)
				: game.playthroughs.filter((playthrough) => playthrough.dateFinished && new Date(playthrough.dateFinished).getFullYear() === view.year)

			relevantPlaythroughs.forEach((playthrough) => {
				totalHoursPlayed += playthrough.hoursPlayed
				totalPlaythroughs += playthrough.timesCompleted
				timesCompleted += playthrough.timesCompleted

				gameHoursPlayed += playthrough.hoursPlayed

				if (!usedPlatforms.includes(playthrough.platform)) {
					if (tempPlatformData[playthrough.platform]) {
						tempPlatformData[playthrough.platform].count++
					} else {
						tempPlatformData[playthrough.platform] = {}
						tempPlatformData[playthrough.platform].count = 1
					}

					usedPlatforms.push(playthrough.platform)
				}
			})

			if (topGamesByHoursPlayed.length < 3) {
				topGamesByHoursPlayed.push({
					gameData: game,
					hoursPlayed: gameHoursPlayed
				})
			} else {
				topGamesByHoursPlayed.sort((gameA, gameB) => gameA.hoursPlayed - gameB.hoursPlayed)

				if (topGamesByHoursPlayed[0].hoursPlayed < gameHoursPlayed) {
					topGamesByHoursPlayed.splice(0, 1, {
						gameData: game,
						hoursPlayed: gameHoursPlayed
					})
				}
			}

			if (topGamesByPlaythroughCount.length < 3) {
				if (timesCompleted > 1) {
					topGamesByPlaythroughCount.push({
						gameData: game,
						timesCompleted
					})
				}
			} else {
				topGamesByPlaythroughCount.sort((gameA, gameB) => gameA.timesCompleted - gameB.timesCompleted)

				if (timesCompleted > 1 && timesCompleted > topGamesByPlaythroughCount[0].timesCompleted) {
					topGamesByPlaythroughCount.splice(0, 1, {
						gameData: game,
						timesCompleted
					})
				}
			}

			scores.push(game.score)
		})

		Object.keys(tempPlatformData).forEach((platform) => {
			platformData.push({
				platform,
				count: tempPlatformData[platform].count
			})
		})

		platformData.sort((platformA, platformB) => platformB.count - platformA.count)

		if (platformData.length > 3) {
			platformData.splice(3, platformData.length - 3)
		}

		topGamesByHoursPlayed.sort((gameA, gameB) => gameB.hoursPlayed - gameA.hoursPlayed)
		topGamesByPlaythroughCount.sort((gameA, gameB) => gameB.timesCompleted - gameA.timesCompleted)

		const totalPoints = scores.reduce((acc, cur) => acc + cur)
		const averageScore = (totalPoints / scores.length).toFixed(1)

		setData({ beatenGames, totalPlaythroughs, totalHoursPlayed, platformData, topGamesByHoursPlayed, topGamesByPlaythroughCount, averageScore })
	}, [view.year, games])

	const statYears = []

	games.forEach((game) => {
		game.playthroughs.forEach((playthrough) => {
			if (playthrough.dateFinished && !statYears.includes(new Date(playthrough.dateFinished).getFullYear())) {
				statYears.push(new Date(playthrough.dateFinished).getFullYear())
			}
		})
	})

	const getHeader = () => {
		if (initialYear) {
			return <h1 className="clickable"><span onClick={() => setView({ section: 'years', year: view.year })}>{view.year}</span> Stats</h1>
		} else {
			return <h1>2015&ndash;Present Stats</h1>
		}
	}

	return (
		<div className="box box--stats">
			{ view.section === 'stats' &&
				<React.Fragment>
					{getHeader()}

					<div className="statsBox">
						<h3>Totals</h3>

						<span className="statsBox__stat">Games completed: {data.beatenGames}</span>
						<span className="statsBox__stat">Playthroughs completed: {data.totalPlaythroughs}</span>
						<span className="statsBox__stat">Hours Played: {data.totalHoursPlayed}</span>
						<span className="statsBox__stat">Average Game Score: {data.averageScore}</span>
					</div>

					<div className="statsBox">
						<h3>Most Played Games (Hours)</h3>

						{
							data.topGamesByHoursPlayed.map((game, i) => {
								return <span className="statsBox__stat statsBox__stat--linked" onClick={() => modalContext.dispatch({type: 'TOGGLE_VIEW_AND_SEARCH_MODAL', modalType: 'view', game: game.gameData })} key={`${view.year !== 'all' ? view.year : 'alltime'}-stats-mostHoursPlayed-${i}`}>{i + 1}. {game.gameData.title} - {game.hoursPlayed}</span>
							})
						}
					</div>

					{data.topGamesByPlaythroughCount.length > 0 &&
						<div className="statsBox">
							<h3>Most Played Games (Playthroughs)</h3>

							{
								data.topGamesByPlaythroughCount.map((game, i) => {
									return <span className="statsBox__stat statsBox__stat--linked" onClick={() => modalContext.dispatch({type: 'TOGGLE_VIEW_AND_SEARCH_MODAL', modalType: 'view', game: game.gameData})} key={`${view.year !== 'all' ? view.year : 'alltime'}-stats-mostPlaythroughs-${i}`}>{i + 1}. {game.gameData.title} - {game.timesCompleted}</span>
								})
							}
						</div>
					}

					<div className="statsBox">
						<h3>Top Platforms Played</h3>

						{
							data.platformData.map((platform, i) => {
								return <span className="statsBox__stat" key={`${view.year !== 'all' ? view.year : 'alltime'}-stats-platform-${i}`}>{i + 1}. {platform.platform} - {platform.count}</span>
							})
						}
					</div>
				</React.Fragment>
			}

			{ view.section === 'years' &&
				<React.Fragment>
					<h1>Select a Year</h1>

					<div className="statsBox">
						<ul className="statsBox__yearList">
							{
								statYears.sort((yearA, yearB) => yearB - yearA).map((year, i) => {
									return <li className={`statsBox__year ${year === view.year ? 'is-selected' : ''}`} onClick={() => setView({ section: 'stats', year })} key={`${id}-yearSelect-${i}`}><span>{year}</span></li>
								})
							}
						</ul>
					</div>
				</React.Fragment>
			}
		</div>
	)
}

Stats.propTypes = {
	initialYear: PropTypes.number,
	games: PropTypes.array.isRequired,
	id: PropTypes.string
}

export default Stats
