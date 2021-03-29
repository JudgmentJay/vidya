import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './_styles.module.scss'

const TableHeader = ({
	type,
	modifier,
	onClick,
	className,
	children
}) => {
	const classes = classNames(styles.tableHeader, [styles[`tableHeader--${type}`]], {
		[styles[`tableHeader--${modifier}`]]: Boolean(modifier)
	}, className)

	return <th onClick={onClick} className={classes}>{children}</th>
}

TableHeader.propTypes = {
	type: PropTypes.string,
	modifier: PropTypes.string,
	onClick: PropTypes.func,
	className: PropTypes.string,
	children: PropTypes.node.isRequired
}

TableHeader.defaultProps = {
	type: 'box'
}

export default TableHeader
