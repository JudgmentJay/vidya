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

const BacklogOld = ({
	games,
	currentYear
}) => {
	const { dispatch } = useContext(ModalContext)

	const olderUnplayedGames = games
		.filter((game) => {
			return game.playthroughs.length === 0 && new Date(game.releaseDate) < new Date(`January 1, ${currentYear}`)
		})
		.sort((gameA, gameB) => new Date(gameB.releaseDate) - new Date(gameA.releaseDate))

	return (
		<React.Fragment>
			<Box>
				<h1>Older Backlog</h1>

				<Table>
					<thead>
						<tr>
							<TableHeader modifier="title">Title</TableHeader>
							<TableHeader modifier="date">Release Date</TableHeader>
						</tr>
					</thead>
					<tbody>
						{
							olderUnplayedGames.map((game) => {
								return (
									<TableRow
										onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game})}
										hoverHighlight={true}
										key={`backlog-${game.title}`}>
										<TableCell modifier="title">{game.title}</TableCell>
										<TableCell modifier="date">{game.releaseDate}</TableCell>
									</TableRow>
								)
							})
						}
					</tbody>
				</Table>
			</Box>
		</React.Fragment>
	)
}

BacklogOld.propTypes = {
	games: PropTypes.array.isRequired,
	currentYear: PropTypes.number.isRequired
}

export default BacklogOld
