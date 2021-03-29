import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './_styles.module.scss'

const Table = ({
	modifier,
	children
}) => {
	const classes = classNames(styles.table, {
		[styles[`table--${modifier}`]]: Boolean(modifier)
	})

	return (
		<table className={classes} cellPadding="0" cellSpacing="0">
			{children}
		</table>
	)
}

Table.propTypes = {
	modifier: PropTypes.string,
	children: PropTypes.node.isRequired
}

export default Table
