import React, { useContext, useState, useEffect } from 'react'

import { fetchAll } from '../../util/fetch'

import { ModalContext } from '../../context'

import {
	BacklogCurrentYear,
	BacklogOld,
	Column,
	Details,
	Modal,
	ModalContent,
	Nav,
	Played,
	Playing,
	Stats,
	Wishlist,
} from '../../components'

const Vidya = () => {
	const { modalVisible } = useContext(ModalContext)

	const [gameData, setGameData] = useState([])
	const [playthroughData, setPlaythroughData] = useState([])
	const [view, setView] = useState('home')

	useEffect(() => {
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

	const fetchGameData = async () => {
		const data = await fetchAll()

		if (data) {
			setGameData(data.games)
			setPlaythroughData(data.playthroughs)
		}
	}

	const now = new Date()
	const currentYear = now.getFullYear()

	return (
		<React.Fragment>
			{ gameData.length > 0 &&
				<React.Fragment>
					<Column>
						<Nav
							view={view}
							setView={setView} />
						<Playing
							games={gameData}
							currentDate={now} />
						<Played
							games={gameData}
							playthroughs={playthroughData}
							currentYear={currentYear} />
					</Column>

					{ view === 'home' &&
						<React.Fragment>
							<Column>
								<BacklogCurrentYear
									games={gameData}
									currentDate={now}
									currentYear={currentYear} />
								<Wishlist
									games={gameData}
									currentDate={now} />
							</Column>

							<Column>
								<BacklogOld
									games={gameData}
									currentYear={currentYear} />
							</Column>
						</React.Fragment>
					}

					{ view === 'details' &&
						<Column wide={true}>
							<Details
								games={gameData}
								playthroughs={playthroughData} />
						</Column>
					}

					{ view === 'stats' &&
						<React.Fragment>
							<Column>
								<Stats
									games={gameData}
									playthroughs={playthroughData} />
							</Column>
							<Column>
								<Stats
									initialYear={currentYear}
									games={gameData}
									playthroughs={playthroughData} />
							</Column>
						</React.Fragment>
					}

					{ modalVisible &&
						<Modal>
							<ModalContent
								games={gameData}
								fetchGameData={fetchGameData}
								currentDate={now} />
						</Modal>
					}
				</React.Fragment>
			}
			<div className="background"></div>
		</React.Fragment>
	)
}

export default Vidya
