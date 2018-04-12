import React from 'react';

export default class Verse extends React.Component {
  render() {
    // stick together bits of verse info for easy display
    var verse = this.props.verse;
    var verseName = verse.book + " " + verse.chapter + ":" + verse.verse;
    var verseTags = verse.tags.map((tag) => {
			return <div key={tag} className="tag">{tag}</div>
		})
    var verseText = verse.text

    return (
      <div className="verse-box">
        <div className="verse-info">
          <p className="verse-title">{verseName}</p>
          <div className="verse-tags">
            {verseTags}
          </div>
        </div>
        <div className="verse-text">
          <p>{verseText}</p>
        </div>
      </div>
    )
  }
}
