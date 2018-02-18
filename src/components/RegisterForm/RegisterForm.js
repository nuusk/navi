import React, { Component } from 'react';
import './RegisterForm.css';

class RegisterForm extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="RegisterForm">
        <form id="registerForm">
            <input id="email" name="email" type="text" placeholder="your@email.com" required />
            <input id="password" name="password" type="password" placeholder="yourpassword" required />
            <input id="repeat-password" name="repeatPassword" type="password" placeholder="repeatpassword" required />
            <input id="name" name="name" type="text" placeholder="name" required />
        </form>
        <button type="button" onClick={this.props.onSubmit}>Register</button>
      </div>
    );
  }
}


export default RegisterForm;
