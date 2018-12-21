import React from 'react'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/fontawesome-free-solid'
import Waypoint from 'react-waypoint'

import './index.scss'
import SearchForm from '../search-form'
import DropdownSearch from '../dropdown-search'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: "",
      addOptionsIcon: faAngleDown,
      addOptionsVisible: false,
			dropdownOpen: false,
			lastInput: ""
    }

    this.updateInput = this.updateInput.bind(this)
    this.submitInput = this.submitInput.bind(this)
    this.changeVersion = this.changeVersion.bind(this)
    this.addOptionsToggle = this.addOptionsToggle.bind(this)
    this.showDropdown = this.showDropdown.bind(this)
    this.hideDropdown = this.hideDropdown.bind(this)
  }

  updateInput(event) {
    this.setState({ inputValue: event.target.value })
  }

  submitInput(event) {
		// prevent a page refresh if run by a form
    if (event) event.preventDefault()

		this.setState({ lastInput: this.state.inputValue })
		this.props.search(this.state.inputValue)
  }

  changeVersion(event) {
    this.props.updateVersion(event.target.value)
		localStorage.setItem('version', event.target.value)
  }

  addOptionsToggle() {
    this.setState(prevState => ({
       addOptionsVisible: !prevState.addOptionsVisible
    }))
  }

	showDropdown() {
		this.setState({ dropdownOpen: true })
	}

	hideDropdown() {
		this.setState({ dropdownOpen: false })
	}

  render() {
    return (
      <header>
				<DropdownSearch
					open={this.state.dropdownOpen}
					value={this.state.inputValue}
					handleChange={this.updateInput}
					handleSubmit={this.submitInput}
				/>

        <div className="header-body">
          <h1 className="title">I need a Verse For...</h1>
          <SearchForm
            value={this.state.inputValue}
            handleChange={this.updateInput}
            handleSubmit={this.submitInput}
            currentVersion={this.props.version}
            changeVersion={this.changeVersion}
          /><br />
          <p onClick={this.addOptionsToggle} className="addOptions-dropdown">
            Additional Options
            <FontAwesomeIcon className="icon" icon={this.state.addOptionsVisible ? faAngleUp : faAngleDown} />
          </p>
        </div>

        <div className="addOptions">
          <div className={`addOptions-content ${this.state.addOptionsVisible ? "" : "hide"}`}>
            <div className="addOptions-sortby">
              <p>Sort by:</p>
              <input className="radio" type="radio" name="sortBy" value="random" id="random" onChange={this.props.updateSort} defaultChecked /><label htmlFor="random">Random</label>
              <input className="radio" type="radio" name="sortBy" value="chronological" id="chronological" onChange={this.props.updateSort} /><label htmlFor="chronological">Chronological</label>
            </div>
            <div className="addOptions-testament">
              <p>Testament:</p>
              <input className="check" type="checkbox" name="testament" id="old" value="old" onChange={this.props.updateTestament} defaultChecked /><label htmlFor="old">Old</label>
              <input className="check" type="checkbox" name="testament" id="new" value="new" onChange={this.props.updateTestament} defaultChecked /><label htmlFor="new">New</label>
            </div>
          </div>
        </div>

				<Waypoint onLeave={this.showDropdown} onEnter={this.hideDropdown} />
      </header>
    )
  }
}

Header.propTypes = {
  updateVersion: PropTypes.func.isRequired,
  updateSort: PropTypes.func.isRequired,
  updateTestament: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  version: PropTypes.string.isRequired
}

export default Header
