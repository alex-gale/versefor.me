import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'
import TextInput from '../text-input'
import Button from '../button'

const SearchForm = (props) => (
  <form className="search-form" onSubmit={props.handleSubmit}>
    <TextInput className="search-input" value={props.value} onChange={props.handleChange} maxLength="50" />
    <Button className="search-button" value="Search" /><br />
    <select className="select-input" value={props.currentVersion} onChange={props.changeVersion}>
      <option value="esv">English Standard Version (ESV)</option>
      <option value="niv">New International Version (NIV)</option>
      <option value="nkjv">New King James Version (NKJV)</option>
      <option value="nlt">New Living Translation (NLT)</option>
      <option value="msg">The Message (MSG)</option>
    </select><br />
  </form>
)

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  changeVersion: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  currentVersion: PropTypes.string.isRequired
}

export default SearchForm
