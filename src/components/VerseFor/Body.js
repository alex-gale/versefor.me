import React from 'react'

import Verse from '../verse'
import LoadingIcon from '../loading-icon'
import { exampleTags } from '../../assets/exampleTags.js'

export default class Body extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			exampleTag: this.newExampleTag()
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.lastSearch !== prevProps.lastSearch) {
			this.setState({ exampleTag: this.newExampleTag() })
		}
	}

	newExampleTag() {
    return exampleTags[Math.floor(Math.random() * exampleTags.length)]
	}

  render() {
    let verses = this.props.verses
		let testamentText = ""
		let searchTerm = this.props.lastSearch.toLowerCase()

    // Filter based on user tickbox input
    if (!this.props.testaments[0]) {
			verses = verses.filter((verse) => {return verse.testament !== "old"})
			testamentText = " new testament"
		}
    if (!this.props.testaments[1]) {
			verses = verses.filter((verse) => {return verse.testament !== "new"})
			testamentText = " old testament"
		}

		// number of verses present after any filtering
		const verseCount = verses.length

    var content

    // If not loading
    if (!this.props.loading) {

      if (verses.length > 0) { // If verses are currently stored

				// Whether a synonym has been recognised by the API
				var synonymised = verses[0].tags[0] !== searchTerm

        content = (
          <div>
						<p>{verseCount}<span style={{ fontWeight: 'bold' }}>{testamentText}</span> verses found for <span style={{ fontWeight: 'bold' }}>{verses[0].tags[0]}</span>{synonymised ? ` (similar to ${searchTerm})` : null}</p>
            {verses.map((verse, i) => {
							return <Verse key={i} verse={verse} />
						})}
            <span className="copyright">{this.props.copyright}</span>
          </div>
				)
      }

      else { // If no verses are stored

        if (this.props.lastSearch === "") { // If the input is blank
          content = (
            <div>
              <h2>Type a keyword into the box above to get related Bible verses.</h2>
              <p className="example">For example, try "{this.state.exampleTag}"</p>
            </div>
          )
        }

        else { // If no verses were returned by the API

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
                <h2>No verses for "{this.props.lastSearch}" were found.</h2>
                <p className="example">Maybe try "{this.state.exampleTag}" instead</p>
              </div>
            )
          }
        }

      }

    }

    else { // If loading
      content = <LoadingIcon />
    }

    // the ol' render-a-roo
    return (
      <main className="content">
        {content}
      </main>
    )
  }
}
