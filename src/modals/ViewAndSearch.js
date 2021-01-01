import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { ModalContext } from '../context/modal'

import SearchForm from './SearchForm'
import GameInfo from './GameInfo'
import EditGame from './EditGame'
import DeleteGame from './DeleteGame'
import StartPlaythrough from './StartPlaythrough'
import FinishPlaythrough from './FinishPlaythrough'
import Playthroughs from './Playthroughs'
import EditPlaythrough from './EditPlaythrough'
import AddPlaythrough from './AddPlaythrough'
import DeletePlaythrough from './DeletePlaythrough'

const ViewAndSearch = ({
	games,
	fetchGameData,
	currentDate
}) => {
	const { modalType } = useContext(ModalContext)

	const [view, setView] = useState(modalType === 'view' ? 'info' : 'search')
	const [searchTerm, setSearchTerm] = useState('')
	const [searchResults, setSearchResults] = useState({ games: [], searched: false })

	return (
		<React.Fragment>
			{ view === 'search' &&
				<SearchForm
					games={games}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					searchResults={searchResults}
					setSearchResults={setSearchResults}
					setView={setView} />
			}

			{ view === 'info' && <GameInfo setView={setView} /> }

			{ view === 'editgame' &&
				<EditGame
					setView={setView}
					fetchGameData={fetchGameData} />
			}

			{ view === 'deletegame' &&
				<DeleteGame
					setView={setView}
					fetchGameData={fetchGameData} />
			}

			{ view === 'startplaythrough' &&
				<StartPlaythrough
					setView={setView}
					fetchGameData={fetchGameData}
					currentDate={currentDate} />
			}

			{ view === 'finishplaythrough' &&
				<FinishPlaythrough
					setView={setView}
					fetchGameData={fetchGameData}
					currentDate={currentDate} />
			}

			{ view === 'playthroughs' && <Playthroughs setView={setView} /> }

			{ view === 'editplaythrough' &&
				<EditPlaythrough
					setView={setView}
					fetchGameData={fetchGameData} />
			}

			{ view === 'addplaythrough' &&
				<AddPlaythrough
					setView={setView}
					fetchGameData={fetchGameData} />
			}

			{ view === 'deleteplaythrough' &&
				<DeletePlaythrough
					setView={setView}
					fetchGameData={fetchGameData} />
			}
		</React.Fragment>
	)
}

ViewAndSearch.propTypes = {
	games: PropTypes.array.isRequired,
	fetchGameData: PropTypes.func.isRequired,
	currentDate: PropTypes.instanceOf(Date).isRequired
}

export default ViewAndSearch
