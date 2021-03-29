import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Box } from '../../components'

import styles from './_styles.module.scss'

const YearSelect = ({
	years,
	selectedYear,
	onYearSelect
}) => {
	return (
		<Box>
			<h1>Select a Year</h1>

			<ul className={styles.list}>
				{
					years.map((year, i) => {
						const classes = classNames(styles.year, {
							[styles['year--isSelected']]: year === selectedYear
						})

						return (
							<li className={classes} onClick={() => onYearSelect(year)} key={`yearSelect-${i}`}>
								<span>{year}</span>
							</li>
						)
					})
				}
			</ul>
		</Box>
	)
}

YearSelect.propTypes = {
	years: PropTypes.array.isRequired,
	selectedYear: PropTypes.number.isRequired,
	onYearSelect: PropTypes.func.isRequired
}

export default YearSelect
