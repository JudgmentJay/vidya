import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const YearSelect = ({
	years,
	selectedYear,
	onYearSelect
}) => {
	return (
		<div className="box">
			<h1>Select a Year</h1>

			<ul className="yearList">
				{
					years.map((year, i) => {
						const classes = classNames('yearList__year', {
							'is-selected': year === selectedYear
						})

						return (
							<li className={classes} onClick={() => onYearSelect(year)} key={`yearSelect-${i}`}>
								<span>{year}</span>
							</li>
						)
					})
				}
			</ul>
		</div>
	)
}

YearSelect.propTypes = {
	years: PropTypes.array.isRequired,
	selectedYear: PropTypes.number.isRequired,
	onYearSelect: PropTypes.func.isRequired
}

export default YearSelect
