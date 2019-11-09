import React, { useState } from 'react'
import PropTypes from 'prop-types'

import GameInfo from './GameInfo'
import EditGame from './EditGame'
import StartPlaythrough from './StartPlaythrough'
import FinishPlaythrough from './FinishPlaythrough'
import Playthroughs from './Playthroughs'
import AddPlaythrough from './AddPlaythrough'

const ViewGame = ({ fetchGameData }) => {
	const [view, setView] = useState('home')

	return (
		<React.Fragment>
			{ view === 'home' && <GameInfo setView={setView} /> }

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

ViewGame.propTypes = {
	fetchGameData: PropTypes.func.isRequired
}

export default ViewGame
