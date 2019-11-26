import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { ModalContext } from '../context/modal'

import SearchForm from './SearchForm'
import GameInfo from './GameInfo'
import EditGame from './EditGame'
import StartPlaythrough from './StartPlaythrough'
import FinishPlaythrough from './FinishPlaythrough'
import Playthroughs from './Playthroughs'
import AddPlaythrough from './AddPlaythrough'

const ViewAndSearch = ({
	games,
	fetchGameData
}) => {
	const modalContext = useContext(ModalContext)

	const [view, setView] = useState(modalContext.modalType === 'view' ? 'info' : 'search')
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

			{ view === 'edit' &&
				<EditGame
					setView={setView}
					fetchGameData={fetchGameData} />
			}

			{ view === 'start' &&
				<StartPlaythrough
					setView={setView}
					fetchGameData={fetchGameData} />
			}

			{ view === 'finish' &&
				<FinishPlaythrough
					setView={setView}
					fetchGameData={fetchGameData} />
			}

			{ view === 'playthroughs' && <Playthroughs setView={setView} /> }

			{ view === 'addplaythrough' &&
				<AddPlaythrough
					setView={setView}
					fetchGameData={fetchGameData} />
			}
		</React.Fragment>
	)
}

ViewAndSearch.propTypes = {
	games: PropTypes.array.isRequired,
	fetchGameData: PropTypes.func.isRequired
}

export default ViewAndSearch
