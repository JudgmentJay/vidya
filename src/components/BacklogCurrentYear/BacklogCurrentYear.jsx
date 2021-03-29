import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { ModalContext } from '../../context'

import {
	Box,
	Table,
	TableCell,
	TableHeader,
	TableRow
} from '../../components'

const BacklogCurrentYear = ({
	games,
	currentDate,
	currentYear
}) => {
	const { dispatch } = useContext(ModalContext)

	const startOfYear = new Date(`January 1, ${currentYear}`)
	const endOfYear = new Date(`January 1, ${currentYear + 1}`)

	const releasedUnplayedGames = games
		.filter((game) => {
			const releaseDate = new Date(game.releaseDate)

			return game.playthroughs.length === 0 && releaseDate >= startOfYear && releaseDate < endOfYear && releaseDate <= currentDate
		})
		.sort((gameA, gameB) => new Date(gameA.releaseDate) - new Date(gameB.releaseDate))

	return (
		<React.Fragment>
			{ releasedUnplayedGames.length > 0 &&
				<Box noShrink={true}>
					<h1>{currentYear} Backlog</h1>

					<Table>
						<thead>
							<tr>
								<TableHeader modifier="title">Title</TableHeader>
								<TableHeader modifier="date">Release Date</TableHeader>
							</tr>
						</thead>
						<tbody>
							{
								releasedUnplayedGames.map((game) => {
									const releaseDate = !game.releaseDate.includes('December 31')
										? game.releaseDate
										: currentYear

									return (
										<TableRow
											onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game})}
											hoverHighlight={true}
											key={`backlog-${game.title}`}>
											<TableCell modifier="title">{game.title}</TableCell>
											<TableCell modifier="date">{releaseDate}</TableCell>
										</TableRow>
									)
								})
							}
						</tbody>
					</Table>
				</Box>
			}
		</React.Fragment>
	)
}

BacklogCurrentYear.propTypes = {
	games: PropTypes.array.isRequired,
	currentDate: PropTypes.instanceOf(Date).isRequired,
	currentYear: PropTypes.number.isRequired
}

export default BacklogCurrentYear
