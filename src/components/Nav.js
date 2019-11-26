import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ModalContext } from '../context/modal'

const Nav = ({
	view,
	setView
}) => {
	const modalContext = useContext(ModalContext)

	const navBarItemClass = 'navBar__item'
	const homeClasses = classNames(navBarItemClass, { 'is-selected': view === 'home' })
	const allClasses = classNames(navBarItemClass, { 'is-selected': view === 'allplayed' })
	const statsClasses = classNames(navBarItemClass, { 'is-selected': view === 'stats' })

	return (
		<nav className="navBar noshrink">
			<span className={homeClasses} onClick={() => setView('home')}>Home</span>
			<span className={allClasses} onClick={() => setView('allplayed')}>All</span>
			<span className={statsClasses} onClick={() => setView('stats')}>Stats</span>
			<span className={navBarItemClass} onClick={(() => modalContext.dispatch({ type: 'TOGGLE_ADD_GAME_MODAL' }))}>Add</span>
			<span className={navBarItemClass} onClick={(() => modalContext.dispatch({ type: 'TOGGLE_VIEW_AND_SEARCH_MODAL', modalType: 'search' }))}>Search</span>
		</nav>
	)
}

Nav.propTypes = {
	view: PropTypes.string.isRequired,
	setView: PropTypes.func.isRequired
}

export default Nav
