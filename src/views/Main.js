import React, { Component } from 'react';

import Navi from '../components/Navi/Navi';
import BorderLine from '../components/BorderLine/BorderLine';
import QueryField from '../components/QueryField/QueryField';

class Main extends Component {
  render() {
    return (
      <div className="main-view">
        <Navi />
        <BorderLine />
        <QueryField />
      </div>
    );
  }
}

export default Main;
