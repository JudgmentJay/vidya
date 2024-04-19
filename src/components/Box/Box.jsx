import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ThemeContext } from '../../context'

import * as styles from './_styles.module.scss'

const Box = ({
	noShrink,
	modifier,
	children
}) => {
	const { theme } = useContext(ThemeContext)

	const classes = classNames(styles.box, styles[`box--${theme}`], {
		[styles[`box--${modifier}`]]: Boolean(modifier),
		'noshrink': noShrink
	})

	return (
		<div className={classes}>
			{children}
		</div>
	)
}

Box.propTypes = {
	noShrink: PropTypes.bool,
	modifier: PropTypes.string,
	children: PropTypes.node.isRequired
}

Box.defaultProps = {
	noShrink: false,
	statsBox: false
}

export default Box
