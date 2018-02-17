import React, { Component } from 'react';
import './RegisterForm.css';

class RegisterForm extends Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  render() {
    return (
      <div className="RegisterForm">
        <div className={this.props.dialogue}>
          {this.props.response}
        </div>
      </div>
    );
  }
}


export default RegisterForm;
