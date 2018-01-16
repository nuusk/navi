import React, { Component } from 'react';
import './Navi.css';

class Navi extends Component {
  render() {
    return (
      <div className="Navi">
        <div className={this.props.animation}>
          <div className="navi-outer"></div>
          <div className="navi-inner"></div>
        </div>
      </div>
    );
  }
}


export default Navi;
