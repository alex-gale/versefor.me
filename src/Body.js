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
        <h2 className="loading">{loading}</h2>
        {this.props.verses.map((verse) => <Verse key={verse._id} verse={verse} />)}
      </div>
    );
  }
}
