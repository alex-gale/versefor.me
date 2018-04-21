import React from 'react';

export default class Header extends React.Component {
	render() {
		let componentClasses = ['dropdown', 'search-form'];
		componentClasses.push(this.props.state);

		return (
			<form className={componentClasses.join(' ')} onSubmit={this.props.handleSubmit}>
				<input className="search-input" type="text" value={this.props.value} onChange={this.props.handleChange} disabled={this.props.state === "hidden"} />
				<input className="search-button" type="submit" value="Search" />
			</form>
		)
	}
}
