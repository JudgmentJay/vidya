import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import * as styles from './_styles.module.scss'

const ModalButton = ({
	text,
	onClick,
	modifier
}) => {
	const classes = classNames(styles.button, {
		[styles[`button--${modifier}`]]: Boolean(modifier)
	})

	return <button className={classes} onClick={onClick}>{text}</button>
}

ModalButton.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	modifier: PropTypes.string
}

export default ModalButton
