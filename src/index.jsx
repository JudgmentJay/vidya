import React from 'react'
import { createRoot } from 'react-dom/client'

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

const container = document.getElementById('vidya')
const root = createRoot(container)
root.render(<App />)
