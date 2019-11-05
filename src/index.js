import React from 'react'
import ReactDOM from 'react-dom'

import './css/main.scss'

require.context('./img', true, /\.(png|jpe?g|gif|svg)$/)

const App = () => {
	return (
		<div>
			Hello World!
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('app'))