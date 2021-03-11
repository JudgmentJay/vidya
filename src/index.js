import React from 'react'
import ReactDOM from 'react-dom'

import { ModalProvider } from './context/modal'

import Vidya from './components/Vidya'

import './css/main.scss'

const App = () => {
	return (
		<ModalProvider>
			<Vidya />
		</ModalProvider>
	)
}

ReactDOM.render(<App />, document.getElementById('vidya'))
