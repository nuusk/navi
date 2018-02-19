import React, { Component } from 'react';
import './AlertBalloon.css';

class AlertBalloon extends Component {
  render() {
    return (
      <div className="AlertBalloon">
        <div className="balloon-wrapper">
          {this.props.alert}
        </div>
      </div>
    );
  }
}

export default AlertBalloon;
