import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ModalContext } from '../context/modal'

const Nav = ({
	view,
	setView
}) => {
	const { dispatch } = useContext(ModalContext)

	const navBarItemClass = 'navBar__item'
	const homeClasses = classNames(navBarItemClass, { 'is-selected': view === 'home' })
	const detailsClasses = classNames(navBarItemClass, { 'is-selected': view === 'details' })
	const statsClasses = classNames(navBarItemClass, { 'is-selected': view === 'stats' })

	return (
		<nav className="navBar noshrink">
			<span className={homeClasses} onClick={() => setView('home')}>Home</span>
			<span className={detailsClasses} onClick={() => setView('details')}>Details</span>
			<span className={statsClasses} onClick={() => setView('stats')}>Stats</span>
			<span className={navBarItemClass} onClick={(() => dispatch({ type: 'OPEN_MODAL', modalType: 'add' }))}>Add</span>
			<span className={navBarItemClass} onClick={(() => dispatch({ type: 'OPEN_MODAL', modalType: 'search' }))}>Search</span>
		</nav>
	)
}

Nav.propTypes = {
	view: PropTypes.string.isRequired,
	setView: PropTypes.func.isRequired
}

export default Nav
