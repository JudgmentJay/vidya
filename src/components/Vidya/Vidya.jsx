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

	const [data, setData] = useState({ gameData: [], playthroughData: [] })
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

	const fetchGameData = () => {
		const callback = (result) => {
			setData({ gameData: result.games, playthroughData: result.playthroughs })
		}

		fetchAll(callback)
	}

	const now = new Date()
	const currentYear = now.getFullYear()

	return (
		<React.Fragment>
			{ data.gameData.length > 0 &&
				<React.Fragment>
					<Column>
						<Nav
							view={view}
							setView={setView} />
						<Playing
							games={data.gameData}
							currentDate={now} />
						<Played
							games={data.gameData}
							playthroughs={data.playthroughData}
							currentYear={currentYear} />
					</Column>

					{ view === 'home' &&
						<React.Fragment>
							<Column>
								<BacklogCurrentYear
									games={data.gameData}
									currentDate={now}
									currentYear={currentYear} />
								<Wishlist
									games={data.gameData}
									currentDate={now} />
							</Column>

							<Column>
								<BacklogOld
									games={data.gameData}
									currentYear={currentYear} />
							</Column>
						</React.Fragment>
					}

					{ view === 'details' &&
						<Column wide={true}>
							<Details
								games={data.gameData}
								playthroughs={data.playthroughData} />
						</Column>
					}

					{ view === 'stats' &&
						<React.Fragment>
							<Column>
								<Stats
									games={data.gameData}
									playthroughs={data.playthroughData} />
							</Column>
							<Column>
								<Stats
									year={currentYear}
									games={data.gameData}
									playthroughs={data.playthroughData} />
							</Column>
						</React.Fragment>
					}

					{ modalVisible &&
						<Modal>
							<ModalContent
								games={data.gameData}
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
