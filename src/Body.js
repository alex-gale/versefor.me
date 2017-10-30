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

    var tags = ['idols', 'creation', 'parents', 'murder', 'envy', 'lying'];
    var exampleTag = tags[Math.floor(Math.random() * tags.length)]
    var content;
    if (!this.props.loading) {
      if (this.props.verses.length > 0 ) {
        content = this.props.verses.map((verse) => <Verse key={verse._id} verse={verse} />);
      }
      else {
        content = (
          <div>
            <h2>Type a keyword into the box above to get related Bible verses.</h2>
            <p className="example">For example, try "{exampleTag}"</p>
          </div>
        )
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
