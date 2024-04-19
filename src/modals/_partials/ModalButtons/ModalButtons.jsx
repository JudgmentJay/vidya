import React from 'react'
import PropTypes from 'prop-types'

import * as styles from './_styles.module.scss'

const ModalButtons = ({ children }) => {
	return (
		<div className={styles.buttons}>
			{children}
		</div>
	)
}

ModalButtons.propTypes = {
	children: PropTypes.node.isRequired
}

export default ModalButtons
