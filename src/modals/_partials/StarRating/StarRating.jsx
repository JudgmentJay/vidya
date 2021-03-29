import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './_styles.module.scss'

const StarRating = ({ score }) => {
	const halfStarNumber = score.toString().includes('.5')
		? Math.round(score)
		: null

	const starClasses = []

	for (let i = 0; i < 10; i++) {
		const classes = classNames(styles.star, {
			[styles['star--full']]: i + 1 <= Math.floor(score),
			[styles['star--half']]: halfStarNumber && halfStarNumber === i + 1
		})

		starClasses.push(classes)
	}

	return (
		<div className={styles.starRating}>
			{
				starClasses.map((classes, i) => {
					return <span className={classes} key={`star-${i}`}></span>
				})
			}
		</div>
	)
}

StarRating.propTypes = {
	score: PropTypes.number.isRequired
}

export default StarRating
