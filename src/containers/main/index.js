import React from 'react'
import { Helmet } from 'react-helmet'

import Header from '../../components/header'
import Body from '../../components/body'
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
      sort: "random",
      testaments: { old: true, new: true }
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
    this.setState({ version, copyright: copyright[version] })
  }

  updateSort(event) {
    this.setState({ sort: event.target.value })
	}

  updateTestament(event) {
    let testaments = Object.assign({}, this.state.testaments)
    testaments[event.target.value] = event.target.checked

    this.setState({ testaments })
  }

  search(tag) {
    if (this.state.loading) return

    this.setState({ error: "" })
    this.updateVerses([])
    this.toggleLoading()
    this.setState({ lastSearch: tag })

    getVerses(this.state.version, tag, (err, verses) => {
      this.toggleLoading()

      if (err) return this.setState({ error: err.message })

      this.updateVerses(verses)
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
          verses={this.state.sort === "random" ? this.state.shuffledVerses : this.state.currentVerses}
          loading={this.state.loading}
          lastSearch={this.state.lastSearch}
          copyright={this.state.copyright}
          error={this.state.error}
          testaments={this.state.testaments}
        />
      </div>
    )
  }
}

const shuffle = (array) => {
  array = array.slice()
  var currentIndex = array.length, temporaryValue, randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
