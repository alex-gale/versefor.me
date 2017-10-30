import React from 'react';
import Header from './Header.js';
import Body from './Body.js';

export default class VerseFor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVerses: [],
      loading: false
    }

    this.updateVerses = this.updateVerses.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  updateVerses(verses) {
    this.setState({currentVerses: verses});
  }

  toggleLoading() {
    let loading = !this.state.loading;
    this.setState({loading: loading});
  }

  render() {
    return (
      <div className="container">
        <Header
          updateVerses={this.updateVerses}
          toggleLoading={this.toggleLoading}
        />
        <Body
          verses={this.state.currentVerses}
          loading={this.state.loading}
          toggleLoading={this.toggleLoading}
        />
      </div>
    );
  }
}
