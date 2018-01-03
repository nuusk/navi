import React, { Component } from 'react';
import './QueryField.css';

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
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter' && this.state.question !== '') {
      this.props.setQuery(this.state.query);
      this.props.getData();
    }
  }

  handleFocus() {
    this.refs.input.select();
  }

  render() {
    return (
      <div className="QueryField">
        <input placeholder="What's up?"
               type="text"
               name="query"
               value={this.state.query}
               onChange={this.handleInput}
               onKeyPress={this.handleKeyPress}
               onFocus={this.handleFocus}
               ref='input' />
      </div>
    );
  }

}

export default QueryField;
