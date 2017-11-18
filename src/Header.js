import React from 'react';
import InputObject from './InputObject.js';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputValue: "", currentVersion: "niv"};

    this.updateInput = this.updateInput.bind(this);
    this.submitInput = this.submitInput.bind(this);
    this.changeVersion = this.changeVersion.bind(this);
  }

  updateInput(event) {
    this.setState({inputValue: event.target.value});
  }

  submitInput(event) {
    this.props.toggleLoading();
    this.props.updateVerses([]);
    fetch(`https://api.wagical.co.uk/bible/${this.state.currentVersion}?tag=${this.state.inputValue.toLowerCase().replace(/[^\w\s]/gi, '')}`)
      .then(result => {return result.json()})
      .then(data => {
        data.success ? this.props.updateVerses(data.data) : this.props.updateVerses([]);
        this.props.toggleLoading();
      })

    this.props.updateSubmittedInput(this.state.inputValue);
    event.preventDefault();
  }

  changeVersion(event) {
    this.setState({currentVersion: event.target.value})
  }

  render() {
    return (
      <div className="header-container">
        <div className="header">
          <h1 className="title">I need a verse for...</h1>
          <InputObject
            value={this.state.inputValue}
            handleChange={this.updateInput}
            handleSubmit={this.submitInput}
            currentVersion={this.state.currentVersion}
            changeVersion={this.changeVersion}
          />
        </div>
      </div>
    );
  }
}
