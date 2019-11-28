import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

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

	useEffect(() => {
		const roundedScore = Math.round(game.score)

		const stars = document.getElementsByClassName('gameInfo__star')

		for (let i = 0; i < roundedScore; i++) {
			stars[i].classList.add('gameInfo__star--full')
		}
	}, [game.score])

	return (
		<React.Fragment>
			<h2>{game.title}</h2>

			<div className="gameInfo">
				{ game.score &&
					<div className="gameInfo__starRating">
						<span className="gameInfo__star">&#9733;</span>
						<span className="gameInfo__star">&#9733;</span>
						<span className="gameInfo__star">&#9733;</span>
						<span className="gameInfo__star">&#9733;</span>
						<span className="gameInfo__star">&#9733;</span>
						<span className="gameInfo__star">&#9733;</span>
						<span className="gameInfo__star">&#9733;</span>
						<span className="gameInfo__star">&#9733;</span>
						<span className="gameInfo__star">&#9733;</span>
						<span className="gameInfo__star">&#9733;</span>
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
				{ (Boolean(!game.playing) && new Date(game.releaseDate) < new Date()) && <button className="modal__button" onClick={() => setView('startplaythrough')}>Start New Playthrough</button> }
				{ Boolean(game.playing) && <button className="modal__button" onClick={() => setView('finishplaythrough')}>Finish Playthrough</button> }
			</div>
		</React.Fragment>
	)
}

GameInfo.propTypes = {
	setView: PropTypes.func.isRequired
}

export default GameInfo
