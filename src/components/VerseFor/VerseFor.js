import React from 'react';
import { Helmet } from 'react-helmet';

import Header from './Header';
import Body from './Body';

export default class VerseFor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVerses: [],
			shuffledVerses: [],
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
    // import new verses as array
    this.setState({currentVerses: verses, shuffledVerses: shuffle(verses)});
  }

  toggleLoading() {
    // toggle loading state
    this.setState({loading: !this.state.loading});
  }

  updateSubmittedInput(input) {
    // update the input that was submitted for display purposes
    this.setState({submittedInput: input});
  }

  updateCopyright(version) {
    // update copyright per version
    this.setState({copyright: getCopyright(version)});
  }

  updateError(error) {
    // update the current error
    this.setState({error: error});
  }

  updateSort(event) {
    // update sorting type
    this.setState({sortBy: event.target.value})
	}

  updateTestament(event) {
    // update whether old or new testaments are checked
    if (event.target.value === "old") {
      this.setState({oldTestament: event.target.checked});
    }
    else if (event.target.value === "new") {
      this.setState({newTestament: event.target.checked});
    }
  }

  render() {
		let title = this.state.submittedInput ? `VerseFor - ${this.state.submittedInput}` : 'VerseFor - Bible Verses for You'

    return (
      <div className="container">
				<Helmet title={title} />

        <Header
          updateVerses={this.updateVerses}
          toggleLoading={this.toggleLoading}
          updateSubmittedInput={this.updateSubmittedInput}
          updateCopyright={this.updateCopyright}
          updateError={this.updateError}
          updateSort={this.updateSort}
          updateTestament={this.updateTestament}
        />
        <Body
          verses={this.state.sortBy === "random" ? this.state.shuffledVerses : this.state.currentVerses}
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
  // return specific copyright info for display based on the version passed in
  switch(version) {
    case "niv":
      return "THE HOLY BIBLE, NEW INTERNATIONAL VERSION®, NIV®\nCopyright © 1973, 1978, 1984, 2011 by Biblica, Inc.™\nUsed by permission. All rights reserved worldwide."
    case "nlt":
      return "Scripture quotations are taken from the Holy Bible, New Living Translation\nCopyright © 1996, 2004, 2007 by Tyndale House Foundation.\nUsed by permission of Tyndale House Publishers, Inc., Carol Stream, IL 60188. All rights reserved."
    case "nkjv":
      return "Scripture taken from the New King James Version®.\nCopyright © 1982 by Thomas Nelson, Inc.\nUsed by permission. All rights reserved."
    case "msg":
      return "All Scripture quotations are taken from THE MESSAGE\nCopyright © 1993, 1994, 1995, 1996, 2000, 2001, 2002.\nUsed by permission of NavPress. All rights reserved."
    case "esv":
      return "Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®)\nCopyright © 2001 by Crossway, a publishing ministry of Good News Publishers.\nUsed by permission. All rights reserved."
    default:
      return ""
  }
}

// shuffle function I stole off the internet
function shuffle(array) {
  array = array.slice();
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
