import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import VerseFor from './components/VerseFor/VerseFor';
import AddTag from './components/AddTag/AddTag';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <main>
          <Route exact={true} path="/" component={VerseFor} />
          <Route exact={true} path="/addtag" component={AddTag} />
        </main>
      </Router>
    )
  }
}
