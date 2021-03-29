import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './_styles.module.scss'

const TableCell = ({
	type,
	modifier,
	className,
	children
}) => {
	const classes = classNames(styles.tableCell, styles[`tableCell--${type}`], {
		[styles[`tableCell--${modifier}`]]: Boolean(modifier)
	}, className)

	return <td className={classes}>{children}</td>
}

TableCell.propTypes = {
	type: PropTypes.string,
	modifier: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node.isRequired
}

TableCell.defaultProps = {
	type: 'box'
}

export default TableCell
