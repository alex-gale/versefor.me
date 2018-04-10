import React from 'react';

export default class Header extends React.Component {
	render() {
		let _class = `dropdown search-form ${this.props.state}`

		return (
			<form className={_class} onSubmit={this.props.handleSubmit}>
				<input className="textInput search-input" type="text" value={this.props.value} onChange={this.props.handleChange} disabled={this.props.state === "hidden"} />
				<input className="button search-button" type="submit" value="Search" />
			</form>
		)
	}
}
