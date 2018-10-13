import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faAngleDown, faAngleUp} from '@fortawesome/fontawesome-free-solid';
import Waypoint from 'react-waypoint'

import InputObject from './InputObject.js';
import DropdownSearch from '../dropdown-search';
import { getVerses } from '../../lib/getVerses'

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      currentVersion: localStorage.getItem('version') ? localStorage.getItem('version') : 'nlt',
      addOptionsIcon: faAngleDown,
      addOptionsVisible: false,
			dropdownState: "hidden",
			lastInput: ""
    };

    this.updateInput = this.updateInput.bind(this);
    this.submitInput = this.submitInput.bind(this);
    this.changeVersion = this.changeVersion.bind(this);
    this.addOptionsToggle = this.addOptionsToggle.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }

  updateInput(event) {
    // update the userinput from the InputObject
    this.setState({inputValue: event.target.value});
  }

  submitInput(event) {
		// prevent a page refresh if run by a form
    if (event) event.preventDefault();

		if (this.state.inputValue === this.state.lastInput && this.state.inputValue === "") {
			return;
		}

    // blank verses
    this.props.updateVerses([]);

		this.setState({ lastInput: this.state.inputValue });

		// update the previously submitted input so that Body can access it if no verses were found
		this.props.updateSubmittedInput(this.state.inputValue);

    // if the input is NOT blank
    if (this.state.inputValue !== "") {
      this.props.toggleLoading();

			if(!navigator.onLine) {
				this.props.toggleLoading();
				return this.props.updateError("You are offline!")
			}

      // fetch verses from database
			getVerses(this.state.currentVersion, this.state.inputValue, (err, verses) => {
				this.props.toggleLoading()
				this.props.updateVerses([]);

				// if there is error, return function and update the error message
				if (err) {
					return this.props.updateError(err.message)
				}

				this.props.updateVerses(verses)
				this.props.updateError("")
			})
    }
  }

  changeVersion(event) {
    // when user changes the version with the dropdown, auto update verses and copyright info
    this.props.updateCopyright(event.target.value);
    this.setState({currentVersion: event.target.value}, function() {
      this.submitInput();
    })

		localStorage.setItem('version', event.target.value)
  }

  addOptionsToggle() {
    // toggle additional options (sorting and stuff) on click
    this.setState({addOptionsVisible: !this.state.addOptionsVisible})
    // change icon
    this.state.addOptionsVisible ? this.setState({addOptionsIcon: faAngleUp}) : this.setState({addOptionsIcon: faAngleDown})
  }

	showDropdown() {
		this.setState({dropdownState: ""})
	}

	hideDropdown() {
		this.setState({dropdownState: "hidden"})
	}

  render() {
    // classname for hiding/showing additional options
    const addOptionsClasses = ['addOptions-content'];
		addOptionsClasses.push(this.state.addOptionsVisible ? "" : "hide");

    return (
      <header>
				<DropdownSearch
					state={this.state.dropdownState}
					value={this.state.inputValue}
					handleChange={this.updateInput}
					handleSubmit={this.submitInput}
				/>
        <div className="header-body">
          <h1 className="title">I need a Verse For...</h1>
          <InputObject
            value={this.state.inputValue}
            handleChange={this.updateInput}
            handleSubmit={this.submitInput}
            currentVersion={this.state.currentVersion}
            changeVersion={this.changeVersion}
          /><br />
          <p onClick={this.addOptionsToggle} className="addOptions-dropdown">Additional Options <FontAwesomeIcon className="icon" icon={this.state.addOptionsIcon} /></p>
        </div>

        <div className="addOptions">
          <div className={addOptionsClasses.join(' ')}>
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
    );
  }
}
