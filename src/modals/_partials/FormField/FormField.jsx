import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './_styles.module.scss'

const FormField = ({
	type,
	id,
	label,
	placeholder,
	value,
	onChange,
	onKeyDown,
	isInvalid,
	focusOnLoad,
	modifier
}) => {
	const inputRef = useRef(null)

	useEffect(() => {
		if (focusOnLoad) {
			inputRef.current.focus()
		}
	}, [focusOnLoad])

	const classes = classNames(styles.field, {
		[styles['field--hasPlaceholder']]: Boolean(placeholder)
	})

	const inputClasses = classNames(styles.input, {
		[styles['input--invalid']]: isInvalid,
		[styles[`input--${modifier}`]]: Boolean(modifier)
	})

	const inputProps = {
		type,
		id,
		className: inputClasses,
		value,
		onChange,
		ref: inputRef
	}

	if (placeholder) {
		inputProps.placeholder = placeholder
	}

	if (onKeyDown) {
		inputProps.onKeyDown = onKeyDown
	}

	return (
		<div className={classes}>
			{ label && <label className={styles.label} htmlFor={id}>{label}</label> }
			<input {...inputProps}></input>
		</div>
	)
}

FormField.propTypes = {
	type: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onKeyDown: PropTypes.func,
	isInvalid: PropTypes.bool,
	focusOnLoad: PropTypes.bool,
	modifier: PropTypes.string
}

FormField.defaultProps = {
	isInvalid: false,
	focusOnLoad: false
}

export default FormField
