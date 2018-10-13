import React from 'react';

import './index.css'

const DropdownSearch = (props) => {
	let componentClasses = ['dropdown', 'search-form']
	componentClasses.push(props.state)

	return (
		<form className={componentClasses.join(' ')} onSubmit={props.handleSubmit}>
			<input className="search-input" type="text" value={props.value} onChange={props.handleChange} disabled={props.state === "hidden"} />
			<input className="search-button" type="submit" value="Search" />
		</form>
	)
}

export default DropdownSearch
