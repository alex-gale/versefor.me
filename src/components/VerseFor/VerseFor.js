import React from 'react';

import Header from './Header.js';
import Body from './Body.js';

export default class VerseFor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVerses: [],
      loading: false,
      submittedInput: "",
      copyright: getCopyright("nlt"),
      error: "",
      sortBy: "random",
      oldTestament: true,
      newTestament: true
    }

    this.updateVerses = this.updateVerses.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.updateSubmittedInput = this.updateSubmittedInput.bind(this);
    this.updateCopyright = this.updateCopyright.bind(this);
    this.updateError = this.updateError.bind(this);
    this.updateSort = this.updateSort.bind(this);
    this.updateTestament = this.updateTestament.bind(this);
  }

  updateVerses(verses) {
    this.setState({currentVerses: verses});
  }

  toggleLoading() {
    this.setState({loading: !this.state.loading});
  }

  updateSubmittedInput(input) {
    this.setState({submittedInput: input});
  }

  updateCopyright(version) {
    this.setState({copyright: getCopyright(version)});
  }

  updateError(error) {
    this.setState({error: error});
  }

  updateSort(event) {
    this.setState({sortBy: event.target.value})
  }

  updateTestament(event) {
    if (event.target.value === "old") {
      this.setState({oldTestament: event.target.checked});
    }
    else if (event.target.value === "new") {
      this.setState({newTestament: event.target.checked});
    }
  }

  render() {
    return (
      <div className="container">
        <Header
          updateVerses={this.updateVerses}
          toggleLoading={this.toggleLoading}
          updateSubmittedInput={this.updateSubmittedInput}
          updateCopyright={this.updateCopyright}
          updateError={this.updateError}
          verses={this.state.currentVerses}
          updateSort={this.updateSort}
          updateTestament={this.updateTestament}
        />
        <Body
          verses={this.state.currentVerses}
          loading={this.state.loading}
          toggleLoading={this.toggleLoading}
          submittedInput={this.state.submittedInput}
          copyright={this.state.copyright}
          error={this.state.error}
          sortBy={this.state.sortBy}
          testaments={[this.state.oldTestament, this.state.newTestament]}
        />
      </div>
    );
  }
}

function getCopyright(version) {
  switch(version) {
    case "niv":
      return "The Holy Bible, New International Version (NIV)\nCopyright 1973, 1978, 1984, 2011 by Biblica Inc.\nAll rights reserved."
    case "nlt":
      return "The Holy Bible, New Living Translation (NLT)\nCopyright 1996, 2004, 2007 by Tyndale House Foundation.\n All rights reserved."
    default:
      return ""
  }
}
