import React from 'react'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import AOS from 'aos'

import './main.scss'
import VerseFor from './containers/main'

export default class App extends React.Component {
  componentDidMount() {
    AOS.init({
      once: true
    })
  }

  render() {
    return (
      <Router>
				<div>
					<Route exact={false} path="/" component={VerseFor} />
				</div>
      </Router>
    )
  }
}
