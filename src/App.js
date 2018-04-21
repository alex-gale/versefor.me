import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './main.scss';
import VerseFor from './components/VerseFor/VerseFor';

export default class App extends React.Component {
  render() {
    return (
      <Router>
				<div>
					<Helmet>
						<title>VerseFor - Bible Verses for You</title>
					</Helmet>

					<Route exact={false} path="/" component={VerseFor} />
				</div>
      </Router>
    )
  }
}
