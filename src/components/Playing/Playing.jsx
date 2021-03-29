import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { ModalContext } from '../../context'

import {
	Box,
	RecommendGame,
	Table,
	TableCell,
	TableHeader,
	TableRow
} from '../../components'

const Playing = ({
	games,
	currentDate
}) => {
	const { dispatch } = useContext(ModalContext)

	const currentlyPlaying = games.filter((game) => game.playing).sort((gameA, gameB) => {
		return new Date(gameA.playthroughs[0].dateStarted) - new Date(gameB.playthroughs[0].dateStarted)
	})

	return (
		<Box noShrink={true}>
			<h1>Currently Playing</h1>

			{ currentlyPlaying.length > 0 &&
				<Table>
					<thead>
						<tr>
							<TableHeader modifier="title">Title</TableHeader>
							<TableHeader modifier="date">Started</TableHeader>
						</tr>
					</thead>
					<tbody>
						{
							currentlyPlaying.map((game, i) => {
								return (
									<TableRow
										onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game})}
										hoverHighlight={true}
										key={`playing-${i}`}>
										<TableCell modifier="title">{game.title}</TableCell>
										<TableCell modifier="date">{game.playthroughs[0].dateStarted}</TableCell>
									</TableRow>
								)
							})
						}
					</tbody>
				</Table>
			}

			{ currentlyPlaying.length === 0 &&
				<RecommendGame
					games={games}
					currentDate={currentDate} />
			}
		</Box>
	)
}

Playing.propTypes = {
	games: PropTypes.array.isRequired,
	currentDate: PropTypes.instanceOf(Date).isRequired
}

export default Playing
