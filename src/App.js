import React from 'react';
import {Route} from 'react-router-dom';

import VerseFor from './components/VerseFor/VerseFor';
import AddTag from './components/AddTag/AddTag';

export default class App extends React.Component {
  render() {
    return (
      <main>
        <Route exact={true} path="/" component={VerseFor} />
        <Route exact={true} path="/addtag" component={AddTag} />
      </main>
    )
  }
}
