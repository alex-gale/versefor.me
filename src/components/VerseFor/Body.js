import React from 'react';
import Verse from './Verse.js';

export default class Body extends React.Component {
  render() {
    var loading;
    if (this.props.loading) {
      loading = "Loading...";
    } else {
      loading = "";
    }

    var tags = ['idols', 'creation', 'parents', 'murder', 'envy', 'lying', 'church', 'stealing', 'greed', 'swearing'];
    var exampleTag = tags[Math.floor(Math.random() * tags.length)]
    var content;

    // If not getting verses
    if (!this.props.loading) {

      // If verses are currently stored
      if (this.props.verses.length > 0 ) {
        content = this.props.verses.map((verse) => <Verse key={verse._id} verse={verse} />);
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
          content = (
            <div>
              <h2>No verses for "{this.props.submittedInput}" were found.</h2>
              <p className="example">Maybe try "{exampleTag}" instead</p>
            </div>
          )
        }
      }
    } else {
      content = <h2>{loading}</h2>
    }

    return (
      <div className="content">
        {content}
      </div>
    );
  }
}
