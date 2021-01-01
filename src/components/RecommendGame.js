import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { ModalContext } from '../context/modal'

const RecommendGame = ({
	games,
	currentDate
}) => {
	const { dispatch } = useContext(ModalContext)

	const backlogGames = games.filter((game) => {
		const releaseDate = new Date(game.releaseDate)

		return releaseDate <= currentDate && game.playthroughs.length === 0
	})

	const randomGameIndex = Math.floor(Math.random() * backlogGames.length)
	const randomGame = backlogGames[randomGameIndex]

	return <div className="emptyBox">
		Nothing at the moment... how about a <a className="emptyBox__link" onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game: randomGame})}>recommendation</a>?
	</div>
}

RecommendGame.propTypes = {
	games: PropTypes.array.isRequired,
	currentDate: PropTypes.instanceOf(Date).isRequired
}

export default RecommendGame
