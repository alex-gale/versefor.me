import React from 'react'
import { Helmet } from 'react-helmet'

import Header from '../../components/header'
import Body from '../../components/VerseFor/Body'
import copyright from '../../assets/copyright'
import { getVerses } from '../../lib/getVerses'

export default class VerseFor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentVerses: [],
			shuffledVerses: [],
      loading: false,
      lastSearch: "",
      version: localStorage.getItem('version') ? localStorage.getItem('version') : 'nlt',
      copyright: "",
      error: "",
      sortBy: "random",
      oldTestament: true,
      newTestament: true
    }

    this.state.copyright = copyright[this.state.version]

    this.updateVerses = this.updateVerses.bind(this)
    this.toggleLoading = this.toggleLoading.bind(this)
    this.updateVersion = this.updateVersion.bind(this)
    this.updateSort = this.updateSort.bind(this)
    this.updateTestament = this.updateTestament.bind(this)
    this.search = this.search.bind(this)
  }

  updateVerses(verses) {
    this.setState({ currentVerses: verses, shuffledVerses: shuffle(verses) })
  }

  toggleLoading() {
    this.setState(prevState => ({
      loading: !prevState.loading
    }))
  }

  updateVersion(version) {
    this.setState({ version, copyright: copyright[version]})
  }

  updateSort(event) {
    this.setState({sortBy: event.target.value})
	}

  updateTestament(event) {
    // update whether old or new testaments are checked
    if (event.target.value === "old") {
      this.setState({oldTestament: event.target.checked})
    }
    else if (event.target.value === "new") {
      this.setState({newTestament: event.target.checked})
    }
  }

  search(tag) {
    if (this.state.loading) return

    this.updateVerses([])
    this.toggleLoading()
    this.setState({ lastSearch: tag })

    getVerses(this.state.version, tag, (err, verses) => {
      this.toggleLoading()

      if (err) return this.setState({ error: err.message })

      this.updateVerses(verses)
      this.setState({ error: "" })
    })
  }

  render() {
		const title = this.state.lastSearch ? `VerseFor - ${this.state.lastSearch}` : 'VerseFor - Bible Verses for You'

    return (
      <div className="container">
				<Helmet title={title} />

        <Header
          updateVersion={this.updateVersion}
          version={this.state.version}
          updateSort={this.updateSort}
          updateTestament={this.updateTestament}
          search={this.search}
        />
        <Body
          verses={this.state.sortBy === "random" ? this.state.shuffledVerses : this.state.currentVerses}
          loading={this.state.loading}
          toggleLoading={this.toggleLoading}
          lastSearch={this.state.lastSearch}
          copyright={this.state.copyright}
          error={this.state.error}
          sortBy={this.state.sortBy}
          testaments={[this.state.oldTestament, this.state.newTestament]}
        />
      </div>
    )
  }
}

// shuffle function I stole off the internet
const shuffle = (array) => {
  array = array.slice()
  var currentIndex = array.length, temporaryValue, randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
