import React from 'react';

import Verse from './Verse.js';
import LoadingIcon from './LoadingIcon.js';

export default class Body extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			versesShown: 5,
			exampleTag: this.newExampleTag()
		}

		this.moreVerses = this.moreVerses.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ versesShown: 5, exampleTag: this.newExampleTag() });
	}

	moreVerses() {
		let versesShown = this.state.versesShown + 5;
		this.setState({versesShown: versesShown});
	}

	newExampleTag() {
		// generate random example tag for user
		var tags = ['idols', 'creation', 'parents', 'murder', 'envy', 'lying', 'church', 'theft', 'greed', 'swearing', 'salad', 'pig', 'baptism', 'lust', 'promises'];
    var exampleTag = tags[Math.floor(Math.random() * tags.length)];

		return exampleTag;
	}

  render() {
    let verses = this.props.verses;
		let testamentText = "";

    // Filter based on user tickbox input
    if (!this.props.testaments[0]) {
			verses = verses.filter((verse) => {return verse.testament !== "old"});
			testamentText = " new testament";
		}
    if (!this.props.testaments[1]) {
			verses = verses.filter((verse) => {return verse.testament !== "new"});
			testamentText = " old testament";
		}

		// number of verses present after any filtering
		const verseCount = verses.length;

		// only show correct number of verses
		let versesSliced = verses.slice(0, this.state.versesShown);

    var content;

    // If not loading
    if (!this.props.loading) {

      // If verses are currently stored
      if (verses.length > 0) {
        content =
          <div>
						<p>{verseCount}<span style={{ fontWeight: 'bold' }}>{testamentText}</span> verses found for <span style={{ fontWeight: 'bold' }}>{this.props.submittedInput.toLowerCase()}</span></p>
            {versesSliced.map((verse, i) => {
							return <Verse key={i} verse={verse} />
						})}
						{verses.length > this.state.versesShown ? <p className="more-button" onClick={this.moreVerses}>More verses...</p> : null}
            <span className="copyright">{this.props.copyright}</span>
          </div>;
      }
      // If no verses are stored
      else {
        // If the input is blank
        if (this.props.submittedInput === "") {
          content = (
            <div>
              <h2>Type a keyword into the box above to get related Bible verses.</h2>
              <p className="example">For example, try "{this.state.exampleTag}"</p>
            </div>
          )
        }
        // If no verses were returned by the API
        else {
          if (this.props.error) {
            content = (
              <div>
                <h2>{this.props.error}</h2>
                <p>Try again later</p>
              </div>
            )
          }
          else {
            content = (
              <div>
                <h2>No verses for "{this.props.submittedInput}" were found.</h2>
                <p className="example">Maybe try "{this.state.exampleTag}" instead</p>
              </div>
            )
          }
        }
      }
    }

    // If loading
    else {
      content = <LoadingIcon />
    }

    // the ol' render-a-roo
    return (
      <main className="content">
        {content}
      </main>
    );
  }
}
