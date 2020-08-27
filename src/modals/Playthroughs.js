import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ModalContext } from '../context/modal'

const Playthroughs = ({ setView }) => {
	const { game, dispatch } = useContext(ModalContext)

	const handlePlaythroughClick = (playthrough) => {
		if (playthrough.dateFinished) {
			dispatch({ type: 'ADD_PLAYTHROUGH', playthrough })

			setView('editplaythrough')
		} else {
			setView('finishplaythrough')
		}
	}

	return (
		<React.Fragment>
			<h2>{game.title} Playthroughs</h2>

			<table className="modalTable playthroughsTable" cellPadding="0" cellSpacing="0">
				<thead>
					<tr>
						<th className="modalTable__header playthroughsTable__dateStarted">Date Started</th>
						<th className="modalTable__header">Date Finished</th>
						<th className="modalTable__header playthroughsTable__hours">Hours</th>
						<th className="modalTable__header playthroughsTable__timesCompleted">Fin</th>
						<th className="modalTable__header playthroughsTable__platform">Platform</th>
					</tr>
				</thead>
				<tbody>
					{
						game.playthroughs.map((playthrough, i) => {
							const dateFinishedClasses = classNames('modalTable__cell', { 'playthroughsTable__dropped': !playthrough.timesCompleted })

							return (
								<tr className="modalTable__dataRow playthroughsTable__dataRow" onClick={() => handlePlaythroughClick(playthrough)} key={`playthrough-${i}`}>
									<td className="modalTable__cell playthroughsTable__dateStarted">{playthrough.dateStarted}</td>
									<td className={dateFinishedClasses}>{playthrough.dateFinished ? playthrough.dateFinished : '--'}</td>
									<td className="modalTable__cell playthroughsTable__hours">{playthrough.hoursPlayed ? playthrough.hoursPlayed : '--'}</td>
									<td className="modalTable__cell playthroughsTable__timesCompleted">{playthrough.timesCompleted}</td>
									<td className="modalTable__cell playthroughsTable__platform">{playthrough.platform}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>

			<div className="modal__buttons">
				<button className="modal__button" onClick={() => setView('info')}>Back</button>
				<button className="modal__button" onClick={() => setView('addplaythrough')}>Add Playthrough</button>
			</div>
		</React.Fragment>
	)
}

Playthroughs.propTypes = {
	setView: PropTypes.func.isRequired
}

export default Playthroughs
