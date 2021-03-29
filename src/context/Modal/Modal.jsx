import React, { useReducer } from 'react'
import PropTypes from 'prop-types'

const ModalContext = React.createContext()

const ModalProvider = ({ children }) => {
	const initialState = {
		modalVisible: false,
		modalType: '',
		game: {},
		playthrough: {}
	}

	const [modalStatus, dispatch] = useReducer(modalReducer, initialState)

	const providedItems = {
		modalVisible: modalStatus.modalVisible,
		modalType: modalStatus.modalType,
		game: modalStatus.game,
		playthrough: modalStatus.playthrough,
		dispatch: dispatch
	}

	return <ModalContext.Provider value={providedItems}>{children}</ModalContext.Provider>
}

const modalReducer = (state, action) => {
	switch (action.type) {
		case 'OPEN_MODAL':
			return {...state, modalVisible: true, modalType: action.modalType, game: action.game ? action.game : {}}
		case 'ADD_GAME':
			return {...state, game: action.game}
		case 'ADD_PLAYTHROUGH':
			return {...state, playthrough: action.playthrough}
		case 'CLOSE_MODAL':
			return {modalVisible: false, modalType: '', game: {}, playthrough: {}}
	}
}

ModalProvider.propTypes = {
	children: PropTypes.node
}

export {
	ModalContext,
	ModalProvider
}
