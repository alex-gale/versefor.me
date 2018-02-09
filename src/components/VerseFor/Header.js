import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faAngleDown, faAngleUp} from '@fortawesome/fontawesome-free-solid';

import InputObject from './InputObject.js';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      currentVersion: "nlt",
      addOptionsIcon: faAngleDown,
      addOptionsVisible: false
    };

    this.updateInput = this.updateInput.bind(this);
    this.submitInput = this.submitInput.bind(this);
    this.changeVersion = this.changeVersion.bind(this);
    this.addOptionsToggle = this.addOptionsToggle.bind(this);
  }

  updateInput(event) {
    this.setState({inputValue: event.target.value});
  }

  submitInput(event) {
    var that = this
    this.props.updateVerses([]);

    if (this.state.inputValue !== "") {
      this.props.toggleLoading();

      //Fetch with timeout detection
      timeout(2000, fetch(`https://api.wagical.co.uk/bible/${this.state.currentVersion}?tag=${this.state.inputValue.toLowerCase().replace(/[^\w\s]/gi, '')}`)
        .then(result => {return result.json()})
        .then(data => {
          if (data.success) {
            this.props.updateVerses(data.data);
            this.props.updateError("");
          } else {
            this.props.updateVerses([]);
          }

          this.props.toggleLoading();
        })
      ).catch(function(error) {
        that.props.updateError("Could not connect to database :(");
        that.props.toggleLoading();
      })
    }

    this.props.updateSubmittedInput(this.state.inputValue);
    if (event) event.preventDefault();
  }

  changeVersion(event) {
    this.setState({currentVersion: event.target.value});
    this.props.updateCopyright(event.target.value);
    this.submitInput();
  }

  addOptionsToggle() {
    this.setState({addOptionsVisible: !this.state.addOptionsVisible})
    this.state.addOptionsVisible ? this.setState({addOptionsIcon: faAngleDown}) : this.setState({addOptionsIcon: faAngleUp})
  }

  render() {
    const addOptionsClassName = "addoptions-content" + (this.state.addOptionsVisible ? "" : " hide")

    return (
      <div>
        <div className="header-container">
          <div className="header">
            <h1 className="title">I need a verse for...</h1>
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
