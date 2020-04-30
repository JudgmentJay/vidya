import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ModalContext } from '../context/modal'

const GameInfo = ({ setView }) => {
	const modalContext = useContext(ModalContext)

	const game = modalContext.game

	const [gameData, setGameData] = useState({ timesCompleted: 0, hoursPlayed: 0, platforms: [] })

	useEffect(() => {
		let timesCompleted = 0
		let hoursPlayed = 0
		const platforms = []

		game.playthroughs.forEach((playthrough) => {
			hoursPlayed += playthrough.hoursPlayed

			if (playthrough.timesCompleted > 0) {
				timesCompleted += playthrough.timesCompleted
			}

			if (!platforms.includes(playthrough.platform)) {
				platforms.push(playthrough.platform)
			}
		})

		setGameData({ timesCompleted, hoursPlayed, platforms })
	}, [game.playthroughs])

	const today = new Date()
	const releaseDate = new Date(game.releaseDate)
	releaseDate.setDate(releaseDate.getDate() - 1)

	const generateStars = () => {
		const halfStarNumber = game.score.toString().includes('.5')
			? Math.round(game.score)
			: null

		const starClasses = []

		for (let i = 0; i < 10; i++) {
			const classes = classNames('gameInfo__star', {
				'gameInfo__star--full': i + 1 <= Math.floor(game.score),
				'gameInfo__star--half': halfStarNumber && halfStarNumber === i + 1
			})

			starClasses.push(classes)
		}

		return starClasses.map((classes, i) => {
			return <span className={classes} key={`star-${i}`}></span>
		})
	}

	return (
		<React.Fragment>
			<h2>{game.title}</h2>

			<div className="gameInfo">
				{ game.score &&
					<div className="gameInfo__starRating">
						{generateStars()}
					</div>
				}
				<span className="gameInfo__stat">Release Date: {game.releaseDate.includes('December 31') ? new Date(game.releaseDate).getFullYear() : game.releaseDate}</span>
				{ ((game.playthroughs.length === 1 && !game.playing) || game.playthroughs.length > 1) &&
					<React.Fragment>
						<span className="gameInfo__stat gameInfo__stat--playthroughs"><a onClick={() => setView('playthroughs')}>Times completed: {gameData.timesCompleted}</a></span>
						<span className="gameInfo__stat">Hours played: {gameData.hoursPlayed}</span>
						<span className="gameInfo__stat">{gameData.platforms.length === 1 ? 'Platform' : 'Platforms'}: {gameData.platforms.join(', ')}</span>
					</React.Fragment>
				}
			</div>

			<div className="modal__buttons">
				{ modalContext.modalType === 'search' && <button className="modal__button" onClick={() => setView('search')}>Back</button> }
				<button className="modal__button" onClick={() => setView('editgame')}>Edit Game</button>
				{ (Boolean(!game.playing) && releaseDate < today) && <button className="modal__button" onClick={() => setView('startplaythrough')}>Start New Playthrough</button> }
				{ Boolean(game.playing) && <button className="modal__button" onClick={() => setView('finishplaythrough')}>Finish Playthrough</button> }
			</div>
		</React.Fragment>
	)
}

GameInfo.propTypes = {
	setView: PropTypes.func.isRequired
}

export default GameInfo
