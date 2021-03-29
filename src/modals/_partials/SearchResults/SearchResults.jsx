import React from 'react'
import PropTypes from 'prop-types'

import {
	Table,
	TableCell,
	TableRow
} from '../../../components'

import styles from './_styles.module.scss'

const SearchResults = ({
	games,
	onGameClick
}) => {
	return (
		<div className={styles.searchResults}>
			{ games.length > 0 &&
				<Table modifier="modal">
					<tbody>
						{
							games.map((game, i) => {
								return (
									<TableRow
										onClick={() => onGameClick(game)}
										hoverHighlight={true}
										key={`searchResult-${i}`}>
										<TableCell type="modal" modifier="title">{game.title}</TableCell>
									</TableRow>
								)
							})
						}
					</tbody>
				</Table>
			}

			{ games.length === 0 &&
				<p className={styles.noneFound}>No games found...</p>
			}
		</div>
	)
}

SearchResults.propTypes = {
	games: PropTypes.array.isRequired,
	onGameClick: PropTypes.func.isRequired
}

export default SearchResults
