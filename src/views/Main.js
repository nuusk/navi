import React, { Component } from 'react';

import Navi from '../components/Navi/Navi';
import BorderLine from '../components/BorderLine/BorderLine';
import QueryField from '../components/QueryField/QueryField';

class Main extends Component {
  constructor(props) {
    super(props);
    this.setQuery = this.setQuery.bind(this);
    this.getData = this.getData.bind(this);

    this.state = {
      searching: false,
      query: '',
      results: []
    };
  }

  setSearching(value = true) {
    this.setState({
      searching: value
    });
  }

  setQuery(value) {
    this.setState({
      query: value
    });
  }

  getData(query) {
    console.log(query);
    fetch('http://localhost:9004/api/query', {
      method: 'POST',
      body: JSON.stringify({
        id: 1,
        text: query
      })
    })
    .then(res => {
      return res.json();
    })
    .then(result => {
      console.log('~ results: ' + result);
    })
    .catch(err => {
      console.log('!Request failed! ~ ', err);
    });


  }

  render() {
    return (
      <div className="main-view">
        <Navi />
        <BorderLine />
        <QueryField query={this.state.query}
                    setQuery={this.setQuery}
                    getData={this.getData} />
      </div>
    );
  }
}

export default Main;
