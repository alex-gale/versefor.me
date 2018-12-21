import React from 'react'
import PropTypes from 'prop-types'

import './index.css'

const DropdownSearch = (props) => (
	<form className={`dropdown search-form ${props.open ? '' : 'hidden'}`} onSubmit={props.handleSubmit}>
		<input className="search-input" type="text" value={props.value} onChange={props.handleChange} disabled={!props.open} />
		<input className="search-button" type="submit" value="Search" />
	</form>
)

DropdownSearch.propTypes = {
	open: PropTypes.bool.isRequired,
	value: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
}

export default DropdownSearch
