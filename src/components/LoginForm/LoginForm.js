import React, { Component } from 'react';
import './LoginForm.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let classes = "LoginForm " + this.props.animation;
    return (
      <div className={classes}>
        <form id="registerForm">
          <input id="email" name="email" type="text" placeholder="your@email.com" required />
          <input id="password" name="password" type="password" placeholder="yourpassword" required />
        </form>
        <button type="button" onClick={this.props.onSubmit}>Login</button>
      </div>
    );
  }
}


export default LoginForm;
