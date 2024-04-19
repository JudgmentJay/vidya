import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ModalContext } from '../../context'

import { Box } from '../../components'

import * as styles from './_styles.module.scss'

const Nav = ({
	view,
	setView
}) => {
	const { dispatch } = useContext(ModalContext)

	const navBarItemClass = styles.link
	const homeClasses = classNames(navBarItemClass, { [styles['link--selected']]: view === 'home' })
	const detailsClasses = classNames(navBarItemClass, { [styles['link--selected']]: view === 'details' })
	const statsClasses = classNames(navBarItemClass, { [styles['link--selected']]: view === 'stats' })

	return (
		<Box
			noShrink={true}
			modifier="nav">
			<nav className={styles.nav}>
				<span className={homeClasses} onClick={() => setView('home')}>Home</span>
				<span className={detailsClasses} onClick={() => setView('details')}>Details</span>
				<span className={statsClasses} onClick={() => setView('stats')}>Stats</span>
				<span className={navBarItemClass} onClick={(() => dispatch({ type: 'OPEN_MODAL', modalType: 'add' }))}>Add</span>
				<span className={navBarItemClass} onClick={(() => dispatch({ type: 'OPEN_MODAL', modalType: 'search' }))}>Search</span>
			</nav>
		</Box>
	)
}

Nav.propTypes = {
	view: PropTypes.string.isRequired,
	setView: PropTypes.func.isRequired
}

export default Nav
