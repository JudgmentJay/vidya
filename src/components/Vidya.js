import React, { useContext, useState, useEffect } from 'react'
import classNames from 'classnames'

import { fetchAll } from '../util/fetch'

import { ModalContext } from '../context/modal'

import Nav from './Nav'
import Playing from './Playing'
import Played from './Played'
import BacklogCurrentYear from './BacklogCurrentYear'
import Wishlist from './Wishlist'
import BacklogOld from './BacklogOld'
import Details from './Details'
import Stats from './Stats'
import Modal from '../modals/Modal'
import AddGame from '../modals/AddGame'
import ViewAndSearch from '../modals/ViewAndSearch'

const Vidya = () => {
	const { modalVisible, modalType } = useContext(ModalContext)

	const [data, setData] = useState({ gameData: [], playthroughData: [] })
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
		const callback = (result) => {
			setData({ gameData: result.games, playthroughData: result.playthroughs })
		}

		fetchAll(callback)
	}

	const now = new Date()
	const currentYear = now.getFullYear()

	const columnClasses = classNames('column', {
		'column--twoCol': view === 'details'
	})

	return (
		<React.Fragment>
			{ data.gameData.length > 0 &&
				<React.Fragment>
					<section className={columnClasses}>
						<Nav
							view={view}
							setView={setView} />
						<Playing games={data.gameData} />
						<Played
							games={data.gameData}
							playthroughs={data.playthroughData}
							currentYear={currentYear} />
					</section>

					{ view === 'home' &&
						<React.Fragment>
							<section className={columnClasses}>
								<BacklogCurrentYear
									games={data.gameData}
									currentDate={now}
									currentYear={currentYear} />
								<Wishlist
									games={data.gameData}
									currentDate={now} />
							</section>

							<section className={columnClasses}>
								<BacklogOld
									games={data.gameData}
									currentYear={currentYear} />
							</section>
						</React.Fragment>
					}

					{ view === 'details' &&
						<section className={columnClasses}>
							<Details
								games={data.gameData}
								playthroughs={data.playthroughData} />
						</section>
					}

					{ view === 'stats' &&
						<React.Fragment>
							<section className={columnClasses}>
								<Stats
									games={data.gameData}
									playthroughs={data.playthroughData} />
							</section>
							<section className={columnClasses}>
								<Stats
									year={currentYear}
									games={data.gameData}
									playthroughs={data.playthroughData} />
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
