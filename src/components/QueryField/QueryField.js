import React, { Component } from 'react'
import PropTypes from 'prop-types';

import SpeechRecognition from 'react-speech-recognition';

// import microphone from './Microphone.svg'
import './QueryField.css';

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  stopListening: PropTypes.func,
  startListening: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
  // recognition: PropTypes.Object
}

class QueryField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.query,
      transcript: '',
      microphoneMode: false
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);

  }

  handleInput(event) {
    const { transcript } = this.props;
    if (!this.state.microphone) {
      this.setState({
        query: event.target.value
      });
    } else {
      this.setState({
        query: transcript
      });
    //   setTimeout(()=> {
    //     this.props.setQuery(this.state.query);
    //     this.props.getData(this.state.query);
    //   }, 2000);
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

  componentDidMount() {
    const { recognition, stopListening } = this.props;
    recognition.lang = 'pl-PL';
    stopListening();
  }

  componentWillMount() {
    this.timeouts = [];
  }

  startRecording() {
    const { startListening, transcript, resetTranscript } = this.props;
    resetTranscript();
    this.setState({
      microphoneMode: true
    });
    startListening();
    this.props.animate("recording");
    this.timer = setTimeout(function() {
      console.log("transcript: " + transcript);
      this.props.setQuery(this.state.query);
      this.props.getData(this.state.query);
      this.setState({
        microphoneMode: false
      });
      this.stopRecording();
     }.bind(this), 3000);
  }

  stopRecording() {
    const { stopListening } = this.props;
    this.setState({
      microphoneMode: false
    });
    stopListening();
    this.props.animate("idle");
  }

  render() {
    const { transcript, browserSupportsSpeechRecognition, recognition, listening } = this.props;
    recognition.lang = 'pl-PL';
    if (!browserSupportsSpeechRecognition) {
      return null;
    }
    if (listening) {
      if (this.state.query != transcript) {
        clearTimeout(this.timer);
        this.timer = setTimeout(function() {
          console.log("transcript: " + transcript);
          this.props.setQuery(transcript);
          this.props.getData(transcript);
          this.setState({
            microphoneMode: false
          });
          this.stopRecording();
         }.bind(this), 3000);
      }
      this.state.query = transcript;
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
               ref='input'
               className={this.props.position}/>
        {/* <button onClick={resetTranscript}>Reset</button> */}
        <svg version="1.1" id="Capa_1" x="0px" y="0px"
        	 width="40px" height="40px" viewBox="0 0 64 64" onClick={!this.state.microphoneMode ? this.startRecording : this.stopRecording} className={this.state.microphoneMode ? "recording" : ""}>
        <g>
        	<g>
        		<g id="circle">
        			<g>
        				<path d="M32,0C14.327,0,0,14.327,0,32s14.327,32,32,32s32-14.327,32-32S49.673,0,32,0z M32,62C15.432,62,2,48.568,2,32
        					C2,15.432,15.432,2,32,2c16.568,0,30,13.432,30,30C62,48.568,48.568,62,32,62z"/>
        			</g>
        		</g>
        		<g id="mouse">
        			<g>
        				<path d="M32,37c3.312,0,6-2.688,6-6v-9c0-3.313-2.688-6-6-6c-3.313,0-6,2.687-6,6v9C26,34.312,28.687,37,32,37z M28,22
        					c0-2.209,1.791-4,4-4s4,1.791,4,4v9c0,2.209-1.791,4-4,4s-4-1.791-4-4V22z M42,31c0-0.553-0.447-1-1-1s-1,0.447-1,1
        					c0,4.418-3.582,8-8,8s-8-3.582-8-8c0-0.553-0.447-1-1-1s-1,0.447-1,1c0,5.186,3.947,9.447,9,9.949V46h-3c-0.553,0-1,0.447-1,1
        					s0.447,1,1,1h8c0.553,0,1-0.447,1-1s-0.447-1-1-1h-3v-5.051C38.053,40.447,42,36.186,42,31z"/>
        			</g>
        		</g>
        	</g>
        </g>
        </svg>


      </div>
    );
  }

}
QueryField.propTypes = propTypes;
export default SpeechRecognition(QueryField);
