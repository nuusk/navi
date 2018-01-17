import React, { Component } from 'react';
import './SpeechBalloon.css';

class SpeechBalloon extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="SpeechBalloon">
        <div className={this.props.dialogue}>
          {this.props.response}
        </div>
      </div>
    );
  }
}


export default SpeechBalloon;
