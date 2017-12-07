import React from 'react';
import LoginInput from './LoginInput.js';
import LoggedInView from './LoggedInView.js';
import '../index.min.css';
var jwtDecode = require('jwt-decode');

export default class AddVerse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedIn: false,
      token: "",
      currentBook: "0",
      currentChapter: "",
      currentVerse: "",
      currentTag: "",
      specialMessage: "",
      admin: false
    };

    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.addTag = this.addTag.bind(this);
    this.changeBook = this.changeBook.bind(this);
    this.changeChapter = this.changeChapter.bind(this);
    this.changeVerse = this.changeVerse.bind(this);
    this.changeTag = this.changeTag.bind(this);
  }

  componentDidMount() {
    var localStorage = window.localStorage;
    if (localStorage.getItem('username') && localStorage.getItem('token')) {
      if (jwtDecode(localStorage.getItem('token')).exp< Date.now() / 1000) {
        localStorage.clear()
      }
      else {
        var token = localStorage.getItem('token');
        var admin = jwtDecode(token).admin;
        var username = localStorage.getItem('username');
        this.setState({loggedIn: true, username: username, token: token, admin: admin});
      }
    }
  }

  login(event) {
    fetch('https://api.wagical.co.uk/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.username,
        password: this.state.password
      })
    })
      .then(result => {return result.json()})
      .then(data => {
        if (data.success) {
          var token = data.data.token;
          var admin = jwtDecode(token).admin;
          var username = data.data.username;
          this.setState({loggedIn: true, token: token, specialMessage: "", admin: admin, username: username});
          window.localStorage.setItem('token', data.data.token);
          window.localStorage.setItem('username', this.state.username);
        }
        else {
          this.setState({specialMessage: data.data});
        };
      })
    event.preventDefault();
  }

  logout(event) {
    window.localStorage.clear();
    window.refresh();
    event.preventDefault();
  }

  addTag(event) {
    var bookid = this.state.currentBook;
    var chapter = this.state.currentChapter;
    var verse = this.state.currentVerse;
    var tag = this.state.currentTag.toLowerCase();

    fetch(`https://api.wagical.co.uk/bible/addtag?bookid=${bookid}&chapter=${chapter}&verse=${verse}&tag=${tag}&token=${this.state.token}&username=${this.state.username}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(result => {return result.json()})
      .then(data => {
        if (data.success) {
          this.setState({currentChapter: "", currentVerse: "", currentTag: "", specialMessage: data.data})
        }
        else {
          this.setState({specialMessage: data.data})
        }
      })

    event.preventDefault();
  }

  // Update state for form items
  updateUsername(event) {
    this.setState({username: event.target.value})
  }
  updatePassword(event) {
    this.setState({password: event.target.value})
  }

  changeBook(event) {
    this.setState({currentBook: event.target.value})
  }
  changeChapter(event) {
    this.setState({currentChapter: event.target.value})
  }
  changeVerse(event) {
    this.setState({currentVerse: event.target.value})
  }
  changeTag(event) {
    this.setState({currentTag: event.target.value})
  }

  render() {
    return (
      <div className="container">
        {this.state.loggedIn ?
          <LoggedInView
            handleLogout={this.logout}
            username={this.state.username}
            handleAddtag={this.addTag}
            book={this.state.currentBook}
            chapter={this.state.currentChapter}
            verse={this.state.currentVerse}
            tag={this.state.currentTag}
            changeBook={this.changeBook}
            changeChapter={this.changeChapter}
            changeVerse={this.changeVerse}
            changeTag={this.changeTag}
            specialMessage={this.state.specialMessage}
            admin={this.state.admin}
          /> :
          <LoginInput
            handleSubmit={this.login}
            updateUsername={this.updateUsername}
            updatePassword={this.updatePassword}
            username={this.state.username}
            password={this.state.password}
            specialMessage={this.state.specialMessage}
          />}
      </div>
    )
  }
}
