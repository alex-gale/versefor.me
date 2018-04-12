import React from 'react';

import Verse from './Verse.js';
import LoadingIcon from './LoadingIcon.js';

export default class Body extends React.Component {
  render() {
    var verses = this.props.verses;

    // Filter based on user tickbox input
    if (!this.props.testaments[0]) verses = verses.filter((verse) => {return verse.testament !== "old"});
    if (!this.props.testaments[1]) verses = verses.filter((verse) => {return verse.testament !== "new"});

    // shuffle verses if user wants them shuffled
    if (this.props.sortBy === "random") {
      verses = shuffle(verses).slice(0, 5);
    }

    // example tags, minus what the user just inputted
    var tags = ['idols', 'creation', 'parents', 'murder', 'envy', 'lying', 'church', 'theft', 'greed', 'swearing', 'salad', 'pig', 'baptism'].filter((tag) => {
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
            {verses.map((verse, i) => <Verse key={i} verse={verse} />)}
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
