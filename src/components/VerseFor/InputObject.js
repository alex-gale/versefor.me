import React from 'react'

import TextInput from '../text-input'
import Button from '../button'

export default class InputObject extends React.Component {
  render() {
    return (
      <form className="search-form" onSubmit={this.props.handleSubmit}>
        <TextInput className="search-input" value={this.props.value} onChange={this.props.handleChange} />
        <Button className="search-button" value="Search" /><br />
        <select className="select-input" value={this.props.currentVersion} onChange={this.props.changeVersion}>
          <option value="esv">English Standard Version (ESV)</option>
          <option value="niv">New International Version (NIV)</option>
          <option value="nkjv">New King James Version (NKJV)</option>
          <option value="nlt">New Living Translation (NLT)</option>
          <option value="msg">The Message (MSG)</option>
        </select><br />
      </form>
    )
  }
}
