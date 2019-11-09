import React, { useContext, useState, useEffect } from 'react'
import classNames from 'classnames'

import { ModalContext } from '../context/modal'

import Nav from './Nav'
import Playing from './Playing'
import Played from './Played'
import Backlog from './Backlog'
import AllPlayed from './AllPlayed'
import Stats from './Stats'
import Modal from '../modals/Modal'
import AddGame from '../modals/AddGame'
import ViewAndSearch from '../modals/ViewAndSearch'

const Vidya = () => {
	const modalContext = useContext(ModalContext)

	const {
		modalVisible,
		modalType
	} = modalContext

	const [data, setData] = useState({ gameData: [], playthroughData: [], loaded: false })
	const [view, setView] = useState('home')

	useEffect(() => {
		const themes = ['hyperLightDrifter', 'bloodborne', 'darkSouls', 'hollowKnight', 'journey', 'muramasa', 'sekiro', 'metroid', 'zelda', 'ffix']
		const randomNumber = Math.floor(Math.random() * themes.length)

		const bodyTag = document.getElementsByTagName('body')[0]
		bodyTag.classList.add(themes[randomNumber])

		fetchGameData()
	}, [])

	useEffect(() => {
		const bodyTag = document.getElementsByTagName('body')[0]

		if (modalVisible) {
			bodyTag.classList.add('modal-is-open')
		} else {
			bodyTag.classList.remove('modal-is-open')
		}
	}, [modalVisible])

	const fetchGameData = () => {
		fetch('http://localhost:3010/games/all')
			.then((response) => {
				if (response.status === 404) {
					console.log('Bad Resposne')
				} else if (response.ok) {
					return response.json()
				}
			})
			.then(result => {
				setData({ gameData: result.games, playthroughData: result.playthroughs, loaded: true })
			})
	}

	const now = new Date()
	const currentYear = now.getFullYear()

	const getPlaythroughsForYear = (year) => {
		const playthroughsInCurrentYear = data.playthroughData.filter((playthrough) => {
			return playthrough.dateFinished && new Date(playthrough.dateFinished).getFullYear() === year
		})

		return playthroughsInCurrentYear.sort((playthroughA, playthroughB) => new Date(playthroughA.dateFinished) - new Date(playthroughB.dateFinished))
	}

	const getBacklogGames = (year) => {
		const backlogGames = data.gameData.filter((game) => game.playthroughs.length === 0)

		if (year) {
			const gameList = backlogGames.filter((game) => {
				const startOfYear = new Date(`January 1, ${year}`)
				const endOfYear = new Date(`January 1, ${year + 1}`)
				const releaseDate = new Date(game.releaseDate)

				return releaseDate >= startOfYear && releaseDate < endOfYear
			})

			return gameList.sort((gameA, gameB) => new Date(gameA.releaseDate) - new Date(gameB.releaseDate))
		} else {
			const gameList = backlogGames.filter((game) => {
				const startOfYear = new Date(`January 1, ${currentYear}`)
				const releaseDate = new Date(game.releaseDate)

				return releaseDate < startOfYear
			})

			return gameList.sort((gameA, gameB) => new Date(gameB.releaseDate) - new Date(gameA.releaseDate))
		}
	}

	const currentlyPlaying = data.gameData.filter((game) => game.playing)
	const playthroughsInCurrentYear = getPlaythroughsForYear(currentYear)

	const backlogGamesInCurrentYear = getBacklogGames(currentYear)
	const wishlistGamesNextYear = getBacklogGames(currentYear + 1)
	const olderBacklogGames = getBacklogGames()

	const columnClasses = classNames('column', { 'column--twoCol': view === 'allplayed' })

	return (
		<React.Fragment>
			{ data.loaded &&
				<React.Fragment>
					<section className={columnClasses}>
						<Nav
							view={view}
							setView={setView} />
						<Playing games={currentlyPlaying} />
						<Played
							games={data.gameData}
							playthroughs={playthroughsInCurrentYear}
							year={currentYear} />
					</section>

					{ view === 'home' &&
						<React.Fragment>
							<section className={columnClasses}>
								{ backlogGamesInCurrentYear.length > 0 &&
									<Backlog
										games={backlogGamesInCurrentYear}
										year={currentYear} />
								}
								{ wishlistGamesNextYear.length > 0 &&
									<Backlog
										games={wishlistGamesNextYear}
										year={currentYear + 1} />
								}
							</section>

							<section className={columnClasses}>
								<Backlog games={olderBacklogGames} />
							</section>
						</React.Fragment>
					}

					{ view === 'allplayed' &&
						<section className={columnClasses}>
							<AllPlayed
								games={data.gameData}
								playthroughs={data.playthroughData} />
						</section>
					}

					{ view === 'stats' &&
						<React.Fragment>
							<section className={columnClasses}>
								<Stats games={data.gameData} />
							</section>
							<section className={columnClasses}>
								{ playthroughsInCurrentYear.length > 0 &&
									<Stats
										initialYear={currentYear}
										games={data.gameData} />
								}
								{ playthroughsInCurrentYear.length === 0 &&
									<Stats
										initialYear={currentYear - 1}
										games={data.gameData} />
								}
							</section>
						</React.Fragment>
					}

					{ (modalVisible && modalType === 'add') &&
						<Modal>
							<AddGame fetchGameData={fetchGameData} />
						</Modal>
					}

					{ (modalVisible && modalType !== 'add') &&
						<Modal>
							<ViewAndSearch
								games={data.gameData}
								fetchGameData={fetchGameData} />
						</Modal>
					}
				</React.Fragment>
			}
			<div className="background"></div>
		</React.Fragment>
	)
}

export default Vidya
