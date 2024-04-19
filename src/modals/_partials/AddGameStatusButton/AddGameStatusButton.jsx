import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import * as styles from './_styles.module.scss'

const AddGameStatusButton = ({
	text,
	onClick,
	isSelected
}) => {
	const classes = classNames(styles.button, {
		[styles['button--selected']]: isSelected
	})

	return <button onClick={onClick} className={classes} >{text}</button>
}

AddGameStatusButton.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	isSelected: PropTypes.bool.isRequired
}

export default AddGameStatusButton
