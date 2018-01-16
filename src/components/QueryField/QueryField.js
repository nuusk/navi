import React, { Component } from 'react'
import PropTypes from 'prop-types';

import SpeechRecognition from 'react-speech-recognition'

import './QueryField.css';

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  recognition: PropTypes.Object
}

class QueryField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.query
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleInput(event) {
    if (!this.state.microphone) {
      this.setState({
        query: event.target.value
      });
    } else {
      this.setState({
        query: event.target.value
      });
      setTimeout(()=> {
        this.props.setQuery(this.state.query);
        this.props.getData(this.state.query);
      }, 2000);
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter' && this.state.query !== '') {
      this.props.setQuery(this.state.query);
      this.props.getData(this.state.query);
    }
  }

  handleFocus() {
    this.refs.input.select();
  }

  render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition, recognition } = this.props;
    // const { latitude, longitude } = this.props;
    recognition.lang = 'pl-PL';
    if (!browserSupportsSpeechRecognition) {
      return null
    }


    return (
      <div className="QueryField">
        <input id="query-field"
               placeholder="What's up?"
               type="text"
               name="query"
               value={this.state.query}
               onChange={this.handleInput}
               onKeyPress={this.handleKeyPress}
               onFocus={this.handleFocus}
               ref='input' />
        <button onClick={resetTranscript}>Reset</button>
      </div>
    );
  }

}
QueryField.propTypes = propTypes;
export default SpeechRecognition(QueryField);
