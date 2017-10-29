import React from 'react';

export default class InputObject extends React.Component {
  render() {
    return (
      <form className="search-form" onSubmit={this.props.handleSubmit}>
        <input className="search-input" type="text" value={this.props.value} onChange={this.props.handleChange} />
        <input className="search-button" type="submit" value="Search" />
      </form>
    );
  }
}
