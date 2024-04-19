import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ThemeContext } from '../../context'

import * as styles from './_styles.module.scss'

const DetailDivider = ({ year }) => {
	const { theme } = useContext(ThemeContext)

	const classes = classNames(styles.divider, styles[`divider--${theme}`])

	return <div className={classes}>{year}</div>
}

DetailDivider.propTypes = {
	year: PropTypes.number.isRequired
}

export default DetailDivider
