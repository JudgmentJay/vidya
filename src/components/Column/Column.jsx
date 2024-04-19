import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import * as styles from './_styles.module.scss'

const Column = ({
	wide,
	children
}) => {
	const classes = classNames(styles.column, {
		[styles['column--wide']]: wide
	})

	return (
		<section className={classes}>
			{children}
		</section>
	)
}

Column.propTypes = {
	wide: PropTypes.bool,
	children: PropTypes.node.isRequired
}

Column.defaultProps = {
	wide: false
}

export default Column
