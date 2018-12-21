import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import Verse from '../verse'
import LoadingIcon from '../loading-icon'
import { exampleTags } from '../../assets/exampleTags.js'

class Body extends React.PureComponent {
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
		const searchTerm = this.props.lastSearch.toLowerCase()
    let verses = [...this.props.verses]
		let testamentText = ""

    // Filter based on user tickbox input
    if (!this.props.testaments["old"]) {
			verses = verses.filter((verse) => { return verse.testament !== "old" })
			testamentText = " new testament"
		}
    if (!this.props.testaments["new"]) {
			verses = verses.filter((verse) => { return verse.testament !== "new" })
			testamentText = " old testament"
		}

    return (
      <main className="content">
				{ this.props.loading ?
					 <LoadingIcon /> :

					 verses.length > 0 ?
					 	(
							<div>
								<p>
									{/* this sucks */}
									{verses.length}<span style={{ fontWeight: 'bold' }}>{testamentText}</span> verses found for
									<span style={{ fontWeight: 'bold' }}> {verses[0].tags[0]}</span>
									{verses[0].tags[0] !== searchTerm ? ` (similar to ${searchTerm})` : null}
								</p>

								{verses.map((verse) => <Verse key={shortid.generate()} verse={verse} />)}
								<span className="copyright">{this.props.copyright}</span>
							</div>
						) :

						this.props.lastSearch === "" ?
							(
								<div>
									<h2>Type a keyword into the box above to get related Bible verses.</h2>
									<p className="example">For example, try "{this.state.exampleTag}"</p>
								</div>
							) :

							this.props.error ?
								(
									<div>
										<h2>{this.props.error}</h2>
										<p>Try again later</p>
									</div>
								) :

								(
									<div>
		                <h2>No verses for "{this.props.lastSearch}" were found.</h2>
		                <p className="example">Maybe try "{this.state.exampleTag}" instead</p>
		              </div>
								)
				 }
      </main>
    )
  }
}

Body.propTypes = {
	verses: PropTypes.array,
	loading: PropTypes.bool,
	lastSearch: PropTypes.string,
	copyright: PropTypes.string,
	error: PropTypes.string,
	testaments: PropTypes.object
}

Body.defaultProps = {
	verses: [],
	loading: false,
	lastSearch: "",
	copyright: "",
	error: "",
	testaments: { old: true, new: true }
}

export default Body
