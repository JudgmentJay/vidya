import React, { useReducer } from 'react'
import PropTypes from 'prop-types'

const ModalContext = React.createContext()

const ModalProvider = ({ children }) => {
	const initialState = {
		modalVisible: false,
		modalType: 'add',
		game: {
			title: '',
			releaseDate: '',
			score: 0,
			playthroughCount: 0,
			status: 'backlog',
			dateStarted: '',
			dateFinished: '',
			hoursPlayed: 0,
			platform: ''
		}
	}

	const [modalStatus, dispatch] = useReducer(modalReducer, initialState)

	const providedItems = {
		modalVisible: modalStatus.modalVisible,
		modalType: modalStatus.modalType,
		game: modalStatus.game,
		dispatch: dispatch
	}

	return <ModalContext.Provider value={providedItems}>{children}</ModalContext.Provider>
}

const modalReducer = (state, action) => {
	const blankGame = {
		title: '',
		releaseDate: '',
		score: 0,
		playthroughCount: 0,
		status: 'backlog',
		dateStarted: '',
		dateFinished: '',
		hoursPlayed: 0,
		platform: ''
	}

	switch (action.type) {
		case 'TOGGLE_ADD_GAME_MODAL':
			return {...state, modalVisible: true}
		case 'TOGGLE_VIEW_GAME_MODAL':
			return {...state, modalVisible: true, modalType: 'view', game: action.game}
		case 'TOGGLE_SEARCH_MODAL':
			return {...state, modalVisible: true, modalType: 'search'}
		case 'CLOSE_MODAL':
			return {...state, modalVisible: false, modalType: 'add', game: blankGame}
		default:
			return state
	}
}

ModalProvider.propTypes = {
	children: PropTypes.node
}

export {
	ModalContext,
	ModalProvider
}
