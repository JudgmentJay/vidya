import React from 'react'
import PropTypes from 'prop-types'

import {
	Box,
	DetailsYear
} from '../../components'

const Details = ({
	games,
	playthroughs
}) => {
	const yearsOnRecord = []

	playthroughs.forEach((playthrough) => {
		const yearFinished = new Date(playthrough.dateFinished).getFullYear()

		if (playthrough.dateFinished && !yearsOnRecord.includes(yearFinished)) {
			yearsOnRecord.push(yearFinished)
		}
	})

	return (
		<Box>
			<h1>Game Details 2015&ndash;Present</h1>

			{
				yearsOnRecord.map((year, i) => {
					return (
						<DetailsYear
							year={year}
							games={games}
							playthroughs={playthroughs.filter((playthrough) => playthrough.dateFinished && new Date(playthrough.dateFinished).getFullYear() === year)}
							key={`Details-${i}`} />
					)
				})
			}
		</Box>
	)
}

Details.propTypes = {
	games: PropTypes.array.isRequired,
	playthroughs: PropTypes.array.isRequired
}

export default Details
