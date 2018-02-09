import React from 'react';

export default class InputObject extends React.Component {
  render() {
    return (
      <form className="search-form" onSubmit={this.props.handleSubmit}>
        <input className="textInput search-input" type="text" value={this.props.value} onChange={this.props.handleChange} />
        <input className="button search-button" type="submit" value="Search" /><br />
        <select className="select-input" value={this.props.currentVersion} onChange={this.props.changeVersion}>
          <option value="niv">New International Version (NIV)</option>
          <option value="nlt">New Living Translation (NLT)</option>
        </select><br />
      </form>
    );
  }
}
