import React from 'react'
import PropTypes from 'prop-types'

import styles from './_styles.module.scss'

const StatsContainer = ({ children }) => {
	return (
		<div className={styles.container}>
			{children}
		</div>
	)
}

StatsContainer.propTypes = {
	children: PropTypes.node.isRequired
}

export default StatsContainer
