import React from 'react';

import Verse from './Verse.js';
import LoadingIcon from './LoadingIcon.js';

export default class Body extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			randomShown: 5,
			previousInput: ""
		}

		this.moreVerses = this.moreVerses.bind(this);
	}

	moreVerses() {
		var randomShown = this.state.randomShown + 5;
		this.setState({randomShown: randomShown});
	}

  render() {
    var verses = this.props.verses;

    // Filter based on user tickbox input
    if (!this.props.testaments[0]) verses = verses.filter((verse) => {return verse.testament !== "old"});
    if (!this.props.testaments[1]) verses = verses.filter((verse) => {return verse.testament !== "new"});

    // shuffle verses if user wants them shuffled
    if (this.props.sortBy === "random") {
      verses = verses.slice(0, this.state.randomShown);
    }

    // example tags, minus what the user just inputted
    var tags = ['idols', 'creation', 'parents', 'murder', 'envy', 'lying', 'church', 'theft', 'greed', 'swearing', 'salad', 'pig', 'baptism', 'lust', 'promises'].filter((tag) => {
			return tag !== this.props.submittedInput
		});
    var exampleTag = tags[Math.floor(Math.random() * tags.length)]

    var content;

    // If not loading
    if (!this.props.loading) {

      // If verses are currently stored
      if (verses.length > 0 ) {
        content =
          <div>
            {verses.map((verse, i) => {
							return <Verse key={i} verse={verse} />
						})}
						{this.props.verses.length > this.state.randomShown ? <p className="more-button" onClick={this.moreVerses}>More verses...</p> : null}
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
              <p className="example">For example, try "{exampleTag}"</p>
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
                <p className="example">Maybe try "{exampleTag}" instead</p>
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
      <div className="content">
        {content}
      </div>
    );
  }
}
