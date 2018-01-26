import React from 'react';
import Header from './Header.js';
import Body from './Body.js';
import '../index.min.css';

export default class VerseFor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVerses: [],
      loading: false,
      submittedInput: "",
      copyright: getCopyright("nlt"),
      error: null
    }

    this.updateVerses = this.updateVerses.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.updateSubmittedInput = this.updateSubmittedInput.bind(this);
    this.updateCopyright = this.updateCopyright.bind(this);
    this.updateError = this.updateError.bind(this);
  }

  updateVerses(verses) {
    if (verses.length <= 5) {
      this.setState({currentVerses: shuffle(verses)});
    } else {
      this.setState({currentVerses: getRandom(verses, 5)})
    }
  }

  toggleLoading() {
    let loading = !this.state.loading;
    this.setState({loading: loading});
  }

  updateSubmittedInput(input) {
    this.setState({submittedInput: input})
  }

  updateCopyright(version) {
    this.setState({copyright: getCopyright(version)});
  }

  updateError(error) {
    this.setState({error: error});
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
        />
        <Body
          verses={this.state.currentVerses}
          loading={this.state.loading}
          toggleLoading={this.toggleLoading}
          submittedInput={this.state.submittedInput}
          copyright={this.state.copyright}
          error={this.state.error}
        />
      </div>
    );
  }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
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
