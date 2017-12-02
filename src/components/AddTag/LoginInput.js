import React from 'react';

export default class LoginInput extends React.Component {
  render() {
    return (
      <div className="hidden-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={this.props.handleSubmit}>
          <input className="textInput login-username" value={this.props.username} type="text" onChange={this.props.updateUsername} placeholder="Username" /><br />
          <input className="textInput login-password" value={this.props.password} type="password" onChange={this.props.updatePassword} placeholder="Password" /><br />
          <p className="specialMessage">{this.props.specialMessage}</p>
          <input className="button login-submit" type="submit" value="Login" />
        </form>
      </div>
    )
  }
}
