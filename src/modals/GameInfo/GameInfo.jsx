import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { ModalContext } from '../../context'

import {
	ModalButtons,
	ModalButton,
	StarRating
} from '../_partials'

import * as styles from './_styles.module.scss'

const GameInfo = ({ setModal }) => {
	const { game, modalType } = useContext(ModalContext)

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

	const releaseDate = game.releaseDate.includes('December 31')
		? new Date(game.releaseDate).getFullYear()
		: game.releaseDate

	const today = new Date()
	const playableDate = new Date(game.releaseDate)
	playableDate.setDate(playableDate.getDate() - 1)

	return (
		<React.Fragment>
			<h2>{game.title}</h2>

			<div className={styles.info}>
				{ Boolean(game.score) &&
					<StarRating score={game.score} />
				}

				<span className={styles.stat}>
					Release Date: {releaseDate}
				</span>
				{ (Boolean(game.score)) &&
					<React.Fragment>
						<span className={`${styles.stat} clickable`}>
							<a onClick={() => setModal('playthroughs')}>Times completed: {timesCompleted}</a>
						</span>
						<span className={styles.stat}>
							Hours played: {hoursPlayed}
						</span>
						<span className={styles.stat}>
							{platforms.length === 1 ? 'Platform' : 'Platforms'}: {platforms.join(', ')}
						</span>
					</React.Fragment>
				}
			</div>

			<ModalButtons>
				{ modalType === 'search' &&
					<ModalButton
						text="Back"
						onClick={() => setModal('search')} />
				}
				<ModalButton
					text="Edit Game"
					onClick={() => setModal('editgame')} />
				{ (Boolean(!game.playing) && playableDate < today) &&
					<ModalButton
						text="Start New Playthrough"
						onClick={() => setModal('startplaythrough')} />
				}
				{ Boolean(game.playing) &&
					<ModalButton
						text="Finish Playthrough"
						onClick={() => setModal('finishplaythrough')} />
				}
			</ModalButtons>
		</React.Fragment>
	)
}

GameInfo.propTypes = {
	setModal: PropTypes.func.isRequired
}

export default GameInfo
