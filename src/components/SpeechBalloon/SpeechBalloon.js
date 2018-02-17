import React, { Component } from 'react';
import './SpeechBalloon.css';

class SpeechBalloon extends Component {
  render() {
    return (
      <div className="SpeechBalloon">
        <div className="balloon-wrapper">
          <div className={this.props.dialogue}>
            {this.props.response}
          </div>
        </div>
      </div>
    );
  }
}


export default SpeechBalloon;
