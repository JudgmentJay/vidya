import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './_styles.module.scss'

const Stat = ({
	modifier,
	onClick,
	children
}) => {
	const classes = classNames(styles.stat, {
		[styles[`stat--${modifier}`]]: Boolean(modifier)
	})

	return (
		<span className={classes} onClick={onClick}>
			{children}
		</span>
	)
}

Stat.propTypes = {
	modifier: PropTypes.string,
	onClick: PropTypes.func,
	children: PropTypes.node.isRequired
}

Stat.defaultProps = {
	onClick: () => {}
}

export default Stat
