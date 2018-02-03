import React from 'react';
import Verse from './Verse.js';
import LoadingIcon from './LoadingIcon.js';

export default class Body extends React.Component {
  render() {
    var tags = ['idols', 'creation', 'parents', 'murder', 'envy', 'lying', 'church', 'stealing', 'greed', 'swearing', 'salad'];
    var exampleTag = tags[Math.floor(Math.random() * tags.length)]
    var content;

    // If not getting verses
    if (!this.props.loading) {

      // If verses are currently stored
      if (this.props.verses.length > 0 ) {
        content =
          <div>
            {this.props.verses.map((verse) => <Verse key={verse._id} verse={verse} />)}
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

    else {
      content = <LoadingIcon />
    }

    return (
      <div className="content">
        {content}
      </div>
    );
  }
}
