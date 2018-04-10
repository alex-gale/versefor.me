import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faAngleDown, faAngleUp} from '@fortawesome/fontawesome-free-solid';
import Waypoint from 'react-waypoint'

import InputObject from './InputObject.js';
import Dropdown from './Dropdown';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      currentVersion: "nlt",
      addOptionsIcon: faAngleDown,
      addOptionsVisible: false,
			dropdownState: "hidden"
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
    // assign for use in the catch block (award for the most self-documenting line ever)
    var that = this

    // blank verses
    this.props.updateVerses([]);

    // if the input is NOT blank
    if (this.state.inputValue !== "") {
      this.props.toggleLoading();

      //Fetch with timeout detection
      timeout(5000, fetch(`https://api.wagical.co.uk/bible/${this.state.currentVersion}?tag=${this.state.inputValue.toLowerCase().replace(/[^\w\s]/gi, '')}`)
        .then(result => {return result.json()})
        .then(data => {
          if (data.success) {
            // if the returned data is successful, update the stored verses and clear any errors
            this.props.updateVerses(data.data);
            this.props.updateError("");
          } else {
            // if the data is unsuccessful, clear verses to avoid confusion
            this.props.updateVerses([]);
          }

          this.props.toggleLoading();
        })
      ).catch(function(error) {
        that.props.updateError("Could not connect to database :(");
        that.props.toggleLoading();
      })
    }

    // update the previously submitted input so that Body can access it if no verses were found
    this.props.updateSubmittedInput(this.state.inputValue);

    // prevent a page refresh if run by a form
    if (event) event.preventDefault();
  }

  changeVersion(event) {
    // when user changes the version with the dropdown, auto update verses and copyright info
    this.props.updateCopyright(event.target.value);
    this.setState({currentVersion: event.target.value}, function() {
      this.submitInput();
    })
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
    const addOptionsClassName = "addoptions-content" + (this.state.addOptionsVisible ? "" : " hide")

    return (
      <div>
				<Dropdown
					state={this.state.dropdownState}
					value={this.state.inputValue}
					handleChange={this.updateInput}
					handleSubmit={this.submitInput}
				/>
        <div className="header-container">
          <div className="header">
            <h1 className="title">I need a Verse For...</h1>
            <InputObject
              value={this.state.inputValue}
              handleChange={this.updateInput}
              handleSubmit={this.submitInput}
              currentVersion={this.state.currentVersion}
              changeVersion={this.changeVersion}
            /><br />
            <p onClick={this.addOptionsToggle} className="addoptions-dropdown">Additional Options <FontAwesomeIcon className="icon" icon={this.state.addOptionsIcon} /></p>
          </div>
        </div>

        <div className="addoptions">
          <div className={addOptionsClassName}>
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
      </div>
    );
  }
}

function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}
