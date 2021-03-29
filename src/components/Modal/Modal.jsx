import React, { useContext, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {
	ModalContext,
	ThemeContext
} from '../../context'

import styles from './_styles.module.scss'

const Modal = ({ children }) => {
	const { dispatch } = useContext(ModalContext)
	const { theme } = useContext(ThemeContext)

	const modalBackgroundRef = useRef(null)

	useEffect(() => {
		const backgroundDiv = modalBackgroundRef.current

		document.addEventListener('keydown', (e) => handleKeyPress(e))
		backgroundDiv.addEventListener('click', () => dispatch({ type: 'CLOSE_MODAL' }))

		return () => {
			document.removeEventListener('keydown', (e) => handleKeyPress(e))
			backgroundDiv.removeEventListener('click', () => dispatch({ type: 'CLOSE_MODAL' }))
		}
	})

	const handleKeyPress = (e) => {
		if (e.key === 'Escape') {
			dispatch({ type: 'CLOSE_MODAL' })
		}
	}

	const classes = classNames(styles.modal, [styles[`modal--${theme}`]])
	const contentClasses = classNames(styles.content, [styles[`content--${theme}`]])
	const closeClasses = classNames(styles.close, [styles[`close--${theme}`]])

	return (
		<div className={classes}>
			<div className={contentClasses}>
				{ children }
				<svg className={closeClasses} viewBox="0 0 28 28" onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
					<g>
						<polygon points="28,22.398 19.594,14 28,5.602 22.398,0 14,8.402 5.598,0 0,5.602 8.398,14 0,22.398 5.598,28 14,19.598 22.398,28" />
					</g>
				</svg>
			</div>
			<div className={styles.overlay} ref={modalBackgroundRef}></div>
		</div>
	)
}

Modal.propTypes = {
	children: PropTypes.node
}

export default Modal
