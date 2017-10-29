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

    return (
      <div className="content">
        {!this.props.loading ? this.props.verses.length > 0 ? this.props.verses.map((verse) => <Verse key={verse._id} verse={verse} />) : <h2>Verse of the Day</h2> : <h2>{loading}</h2>}
      </div>
    );
  }
}
