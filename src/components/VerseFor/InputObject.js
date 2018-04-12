import React from 'react';

export default class InputObject extends React.Component {
  render() {
    return (
      <form className="search-form" onSubmit={this.props.handleSubmit}>
        <input className="search-input" type="text" value={this.props.value} onChange={this.props.handleChange} />
        <input className="search-button" type="submit" value="Search" /><br />
        <select className="select-input" value={this.props.currentVersion} onChange={this.props.changeVersion}>
          <option value="esv">English Standard Version (ESV)</option>
          <option value="niv">New International Version (NIV)</option>
          <option value="nkjv">New King James Version (NKJV)</option>
          <option value="nlt">New Living Translation (NLT)</option>
          <option value="msg">The Message (MSG)</option>
        </select><br />
      </form>
    );
  }
}
