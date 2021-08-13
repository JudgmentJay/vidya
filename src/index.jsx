import React from 'react'
import ReactDOM from 'react-dom'

import {
	ModalProvider,
	ThemeContext
} from './context'

import { Vidya } from './components'

import './scss/globals.scss'

const App = () => {
	const themes = ['hyperLightDrifter', 'bloodborne', 'darkSouls', 'hollowKnight', 'journey', 'muramasa', 'sekiro', 'metroid', 'zelda', 'ffix']
	const randomNumber = Math.floor(Math.random() * themes.length)

	const theme = themes[randomNumber]

	const bodyTag = document.getElementsByTagName('body')[0]
	bodyTag.classList.add(theme)

	return (
		<ThemeContext.Provider value={{ theme }}>
			<ModalProvider>
				<Vidya />
			</ModalProvider>
		</ThemeContext.Provider>
	)
}

ReactDOM.render(<App />, document.getElementById('vidya'))
