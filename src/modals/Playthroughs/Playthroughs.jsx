import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ModalContext } from '../../context'

import {
	Table,
	TableCell,
	TableHeader,
	TableRow
} from '../../components'

import {
	ModalButton,
	ModalButtons
} from '../_partials'

const Playthroughs = ({ setModal }) => {
	const { game, dispatch } = useContext(ModalContext)

	const handlePlaythroughClick = (playthrough) => {
		if (playthrough.dateFinished) {
			dispatch({ type: 'ADD_PLAYTHROUGH', playthrough })

			setModal('editplaythrough')
		} else {
			setModal('finishplaythrough')
		}
	}

	return (
		<React.Fragment>
			<h2>{game.title} Playthroughs</h2>

			<Table modifier="modal">
				<thead>
					<tr>
						<TableHeader type="modal" modifier="dateStarted">Date Started</TableHeader>
						<TableHeader type="modal" modifier="dateFinished">Date Finished</TableHeader>
						<TableHeader type="modal" modifier="hours">Hours</TableHeader>
						<TableHeader type="modal" modifier="timesCompleted">Fin</TableHeader>
						<TableHeader type="modal" modifier="platform">Platform</TableHeader>
					</tr>
				</thead>
				<tbody>
					{
						game.playthroughs.map((playthrough, i) => {
							const dateFinishedClasses = classNames({
								'strikethrough': playthrough.timesCompleted === 0
							})

							return (
								<TableRow
									onClick={() => handlePlaythroughClick(playthrough)}
									hoverHighlight={true}
									key={`playthrough-${i}`}>
									<TableCell type="modal">{playthrough.dateStarted}</TableCell>
									<TableCell type="modal" className={dateFinishedClasses}>
										{playthrough.dateFinished ? playthrough.dateFinished : '--'}
									</TableCell>
									<TableCell type="modal" modifier="hours">
										{playthrough.hoursPlayed ? playthrough.hoursPlayed : '--'}
									</TableCell>
									<TableCell type="modal" modifier="timesCompleted">
										{playthrough.timesCompleted}
									</TableCell>
									<TableCell type="modal" modifier="platform">
										{playthrough.platform}
									</TableCell>
								</TableRow>
							)
						})
					}
				</tbody>
			</Table>

			<ModalButtons>
				<ModalButton
					text="Back"
					onClick={() => setModal('info')} />
				<ModalButton
					text="Add Playthrough"
					onClick={() => setModal('addplaythrough')} />
			</ModalButtons>
		</React.Fragment>
	)
}

Playthroughs.propTypes = {
	setModal: PropTypes.func.isRequired
}

export default Playthroughs
