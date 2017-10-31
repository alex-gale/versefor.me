import React from 'react';
import Header from './Header.js';
import Body from './Body.js';

export default class VerseFor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVerses: [],
      loading: false,
      submittedInput: ""
    }

    this.updateVerses = this.updateVerses.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.updateSubmittedInput = this.updateSubmittedInput.bind(this);
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

  render() {
    return (
      <div className="container">
        <Header
          updateVerses={this.updateVerses}
          toggleLoading={this.toggleLoading}
          updateSubmittedInput={this.updateSubmittedInput}
        />
        <Body
          verses={this.state.currentVerses}
          loading={this.state.loading}
          toggleLoading={this.toggleLoading}
          submittedInput={this.state.submittedInput}
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
