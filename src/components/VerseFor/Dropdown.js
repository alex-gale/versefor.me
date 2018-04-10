import React from 'react';

export default class Header extends React.Component {
	render() {
		return (
			<form className="dropdown search-form">
				<input className="textInput search-input" type="text" />
				<input className="button search-button" type="submit" value="Search" />
			</form>
		)
	}
}
