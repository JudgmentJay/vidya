import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './_styles.module.scss'

const TableRow = ({
	onClick,
	hoverHighlight,
	children
}) => {
	const classes = classNames({
		[styles.hoverHighlight]: Boolean(hoverHighlight)
	})

	return (
		<tr onClick={onClick} className={classes}>
			{children}
		</tr>
	)
}

TableRow.propTypes = {
	onClick: PropTypes.func,
	hoverHighlight: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node.isRequired
}

TableRow.defaultProps = {
	hoverHighlight: false
}

export default TableRow
