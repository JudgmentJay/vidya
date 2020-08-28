import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { getStats } from '../util/getStats'

import { ModalContext } from '../context/modal'

const StatsOld = ({ games }) => {
	const { dispatch } = useContext(ModalContext)

	const [data, setData] = useState({ gamesPlayed: 0, gamesCompleted: 0, totalHoursPlayed: 0, totalPlaythroughs: 0, platformData: [], topGamesByHoursPlayed: [], topGamesByPlaythroughCount: [], averageScore: 0 })

	useEffect(() => {
		const gamesPlayed = games.filter((game) => game.playthroughs.some((playthrough) => playthrough.dateFinished))

		if (gamesPlayed.length) {
			setData(getStats(gamesPlayed))
		}
	}, [games])

	return (
		<div className="box box--stats">
			<h1>2015&ndash;Present Stats</h1>

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
								return <span className="statsBox__stat statsBox__stat--linked" onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game: game.gameData })} key={`alltime-stats-mostHoursPlayed-${i}`}>{i + 1}. {game.gameData.title} - {game.hoursPlayed}</span>
							})
						}
					</div>

					{ data.topGamesByPlaythroughCount.length > 0 &&
						<div className="statsBox">
							<h3>Most Played Games (Playthroughs)</h3>

							{
								data.topGamesByPlaythroughCount.map((game, i) => {
									return <span className="statsBox__stat statsBox__stat--linked" onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game: game.gameData})} key={`alltime-stats-mostPlaythroughs-${i}`}>{i + 1}. {game.gameData.title} - {game.timesCompleted}</span>
								})
							}
						</div>
					}

					<div className="statsBox">
						<h3>Top Platforms Played</h3>

						{
							data.platformData.map((platform, i) => {
								return <span className="statsBox__stat" key={`alltime-stats-platform-${i}`}>{i + 1}. {platform[0]} - {platform[1]}</span>
							})
						}
					</div>
				</React.Fragment>
			}
		</div>
	)
}

StatsOld.propTypes = {
	games: PropTypes.array.isRequired,
	playthroughs: PropTypes.array
}

export default StatsOld
