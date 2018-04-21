import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import './main.scss';
import VerseFor from './components/VerseFor/VerseFor';

export default class App extends React.Component {
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
