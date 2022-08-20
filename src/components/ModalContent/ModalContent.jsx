import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { ModalContext } from '../../context'

import {
	AddGame,
	AddPlaythrough,
	DeleteGame,
	DeletePlaythrough,
	EditGame,
	EditPlaythrough,
	FinishPlaythrough,
	GameInfo,
	Playthroughs,
	Search,
	StartPlaythrough
} from '../../modals'

const ModalContent = ({
	games,
	fetchGameData,
	currentDate
}) => {
	const { modalType } = useContext(ModalContext)

	let initialModal

	switch(modalType) {
		case 'view': {
			initialModal = 'info'
			break
		}
		case 'add': {
			initialModal = 'addgame'
			break
		}
		case 'search': {
			initialModal = 'search'
			break
		}
	}

	const [modal, setModal] = useState(initialModal)
	const [storedSearchTerm, setStoredSearchTerm] = useState('')

	const getModalContent = (modal) => {
		let content

		switch(modal) {
			case 'info': {
				content = <GameInfo setModal={setModal} />
				break
			}
			case 'addgame': {
				content = <AddGame fetchGameData={fetchGameData} currentDate={currentDate} />
				break
			}
			case 'editgame': {
				content = <EditGame setModal={setModal} fetchGameData={fetchGameData} />
				break
			}
			case 'deletegame': {
				content = <DeleteGame setModal={setModal} fetchGameData={fetchGameData} />
				break
			}
			case 'startplaythrough': {
				content = <StartPlaythrough setModal={setModal} fetchGameData={fetchGameData} currentDate={currentDate} />
				break
			}
			case 'finishplaythrough': {
				content = <FinishPlaythrough setModal={setModal} fetchGameData={fetchGameData} currentDate={currentDate} />
				break
			}
			case 'playthroughs': {
				content = <Playthroughs setModal={setModal} />
				break
			}
			case 'addplaythrough': {
				content = <AddPlaythrough setModal={setModal} fetchGameData={fetchGameData} />
				break
			}
			case 'editplaythrough': {
				content = <EditPlaythrough setModal={setModal} fetchGameData={fetchGameData} />
				break
			}
			case 'deleteplaythrough': {
				content = <DeletePlaythrough setModal={setModal} fetchGameData={fetchGameData} />
				break
			}
			case 'search': {
				content = (
					<Search
						games={games}
						storedSearchTerm={storedSearchTerm}
						setStoredSearchTerm={setStoredSearchTerm}
						setModal={setModal} />
				)
				break
			}
		}

		return content
	}

	return getModalContent(modal)
}

ModalContent.propTypes = {
	games: PropTypes.array.isRequired,
	fetchGameData: PropTypes.func.isRequired,
	currentDate: PropTypes.instanceOf(Date).isRequired
}

export default ModalContent
