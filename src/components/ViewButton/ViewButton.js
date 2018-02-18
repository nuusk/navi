import React, { Component } from 'react';
import './ViewButton.css';

class ViewButton extends Component {
  // constructor(props) {
  //   super(props);
  //
  // }


  render() {
    let classes = "ViewButton " + this.props.viewName + " " + this.props.mode;
    return (
      <button className={classes} onClick={this.props.triggerMenu}>
        {this.props.viewName != 'trigger-menu' ? this.props.viewName : ''}
      </button>
    );
  }
}


export default ViewButton;
