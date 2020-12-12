import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { ModalContext } from '../context/modal'

import YearSelect from './YearSelect'

const Wishlist = ({
	games,
	currentDate
}) => {
	const { dispatch } = useContext(ModalContext)

	const unreleasedGames = games
		.filter((game) => {
			const releaseDate = new Date(game.releaseDate)

			return releaseDate > currentDate
		})
		.sort((gameA, gameB) => new Date(gameA.releaseDate) - new Date(gameB.releaseDate))

	const unreleasedGameYears = []

	unreleasedGames.forEach((game) => {
		const releaseYear = new Date(game.releaseDate).getFullYear()

		if (!unreleasedGameYears.includes(releaseYear)) {
			unreleasedGameYears.push(releaseYear)
		}
	})

	const [view, setView] = useState({ section: 'games', year: unreleasedGameYears[0] })

	const unreleasedGamesInSelectedYear = unreleasedGames.filter((game) => {
		const releaseYear = new Date(game.releaseDate).getFullYear()

		return releaseYear === view.year
	})

	const getTitleTag = () => {
		if (unreleasedGameYears.length === 1) {
			return <h1>{view.year} Wishlist</h1>
		} else {
			return <h1 className="clickable"><span onClick={() => setView({ section: 'years', year: view.year })}>{view.year}</span> Wishlist</h1>
		}
	}

	return (
		<React.Fragment>
			{ unreleasedGames.length > 0 &&
				<React.Fragment>
					{ view.section === 'games' &&
						<div className="box">
							{getTitleTag()}

							<table className="gameDataTable" cellPadding="0" cellSpacing="0">
								<thead>
									<tr>
										<th className="gameDataTable__header gameDataTable__title">Title</th>
										<th className="gameDataTable__header gameDataTable__date">Release Date</th>
									</tr>
								</thead>
								<tbody>
									{
										unreleasedGamesInSelectedYear.map((game) => {
											const releaseDate = !game.releaseDate.includes('December 31')
												? game.releaseDate
												: view.year

											return (
												<tr className="gameDataTable__game" onClick={() => dispatch({type: 'OPEN_MODAL', modalType: 'view', game})} key={`backlog-${game.title}`}>
													<td className="gameDataTable__cell gameDataTable__title">{game.title}</td>
													<td className="gameDataTable__cell gameDataTable__date">{releaseDate}</td>
												</tr>
											)
										})
									}
								</tbody>
							</table>
						</div>
					}

					{ view.section === 'years' &&
						<YearSelect
							years={unreleasedGameYears}
							selectedYear={view.year}
							onYearSelect={(year) => setView({ section: 'games', year })} />
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
