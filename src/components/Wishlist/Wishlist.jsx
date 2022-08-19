import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { ModalContext } from '../../context'

import {
	Box,
	Table,
	TableCell,
	TableHeader,
	TableRow,
	YearSelect
} from '../../components'

const Wishlist = ({
	games,
	currentDate
}) => {
	const { dispatch } = useContext(ModalContext)

	const unreleasedGames = games
		.filter((game) => {
			const releaseDate = new Date(game.releaseDate)

			return game.playthroughs.length === 0 && releaseDate > currentDate
		})
		.sort((gameA, gameB) => new Date(gameA.releaseDate) - new Date(gameB.releaseDate))

	const unreleasedGameYears = []

	unreleasedGames.forEach((game) => {
		const releaseYear = new Date(game.releaseDate).getFullYear()

		if (!unreleasedGameYears.includes(releaseYear)) {
			unreleasedGameYears.push(releaseYear)
		}
	})

	const [view, setView] = useState('games')
	const [year, setYear] = useState(unreleasedGameYears[0])

	const unreleasedGamesInSelectedYear = unreleasedGames.filter((game) => {
		const releaseYear = new Date(game.releaseDate).getFullYear()

		return releaseYear === year
	})

	const title = unreleasedGameYears.length === 1
		? <h1>{year} Wishlist</h1>
		: <h1 className="clickable"><span onClick={() => setView('years')}>{year}</span> Wishlist</h1>

	return (
		<React.Fragment>
			{ unreleasedGames.length > 0 &&
				<React.Fragment>
					{ view === 'games' &&
						<Box>
							{title}

							<Table>
								<thead>
									<tr>
										<TableHeader modifier="title">Title</TableHeader>
										<TableHeader modifier="date">Release Date</TableHeader>
									</tr>
								</thead>
								<tbody>
									{
										unreleasedGamesInSelectedYear.map((game) => {
											const releaseDate = !game.releaseDate.includes('December 31')
												? game.releaseDate
												: year

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

					{ view === 'years' &&
						<YearSelect
							years={unreleasedGameYears}
							selectedYear={year}
							onYearSelect={(year) => {
								setYear(year)
								setView('games')
							}} />
					}
				</React.Fragment>
			}
		</React.Fragment>
	)
}

Wishlist.propTypes = {
	games: PropTypes.array.isRequired,
	currentDate: PropTypes.instanceOf(Date).isRequired
}

export default Wishlist
