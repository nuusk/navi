import React, { Component } from 'react';
import './User.css';

class User extends Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  render() {
    return (
      <div className="User">
        {this.props.username}
      </div>
    );
  }
}


export default User;
