import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { ModalContext } from '../context/modal'

const Modal = ({ children }) => {
	const modalContext = useContext(ModalContext)

	return (
		<div id="modalBackground">
			<div className="modal">
				{ children }
				<svg className="modal__close" viewBox="0 0 28 28" onClick={() => modalContext.dispatch({ type: 'CLOSE_MODAL' })}>
					<g>
						<polygon points="28,22.398 19.594,14 28,5.602 22.398,0 14,8.402 5.598,0 0,5.602 8.398,14 0,22.398 5.598,28 14,19.598 22.398,28" />
					</g>
				</svg>
			</div>
		</div>
	)
}

Modal.propTypes = {
	children: PropTypes.node
}

export default Modal
