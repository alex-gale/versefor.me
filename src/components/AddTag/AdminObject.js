import React from 'react';

export default class AdminObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      admin: false,
      specialMessage: ""
    }

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  // Update state for form items
  updateUsername(event) {
    this.setState({username: event.target.value})
  }
  updatePassword(event) {
    this.setState({password: event.target.value})
  }

  addUser(event) {
    var username = this.state.username.toLowerCase();
    var password = this.state.password;
    var admin = this.state.admin;

    var token = window.localStorage.getItem('token')
    fetch(`https://api.wagical.co.uk/auth/adduser?token=${token}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username,
        password: password,
        admin: admin
      })
    })
      .then(result => {return result.json()})
      .then(data => {
        if (data.success) {
          this.setState({username: "", password: "", specialMessage: data.data})
        }
        else {
          this.setState({specialMessage: data.data})
        }
      })
    event.preventDefault();
  }

  render() {
    return (
      <div className="adminForm" onSubmit={this.addUser}>
        <h2>Add user</h2>
        <form className="adduser-form" onSubmit={this.props.handleAdduser}>
          <input className="textInput adduser-username" type="text" value={this.state.username} placeholder="Username" onChange={this.updateUsername} /><br />
          <input className="textInput adduser-password" type="password" value={this.state.password} placeholder="Password" onChange={this.updatePassword} /><br />
          <p className="specialMessage">{this.state.specialMessage}</p>
          <input className="button adduser-submit" type="submit" />
        </form>
      </div>
    )
  }
}
