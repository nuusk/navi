import React, { Component } from 'react';

import Navi from '../components/Navi/Navi';
import SpeechBalloon from '../components/SpeechBalloon/SpeechBalloon';
import PlaceInfo from '../components/PlaceInfo/PlaceInfo';
import QueryField from '../components/QueryField/QueryField';
import Logo from '../components/Logo/Logo';

import './setting.css'

class Main extends Component {
  constructor(props) {
    super(props);
    this.setQuery = this.setQuery.bind(this);
    this.getData = this.getData.bind(this);

    this.state = {
      searching: false,
      query: '',
      results: [],
      latitude: '',
      longitude: '',
      animation: 'idle',
      dialogue: 'hidden',
      placeName: '',
      placeAddress: '',
      placeLat: '',
      placeLng: '',
      placeRating: ''
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

  setAnimation(type) {

  }

  getData(query) {
    this.setState({
      animation: 'loading'
    });

    console.log(query);
    console.log(this.state.latitude);
    console.log(this.state.longitude);
    fetch('http://localhost:9004/api/message?name='+encodeURIComponent(query)
    +'&lat='+this.state.latitude
    +'&lng='+this.state.longitude, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      return res.json();
    })
    .then(result => {
      //if this is a place
      if (result.location) {
        this.setState({
          animation: 'idle',
          dialogue: 'appear',
          response: 'proponuję to',
          placeName: result.name,
          placeAddress: result.address,
          placeLat: result.location.lat,
          placeLng: result.location.lng,
          placeRating: result.rating
        });
      } else {
        this.setState({
          animation: 'idle',
          response: result,
          dialogue: 'appear'
        });
      }
    })
    .catch(err => {
      console.error('!Request failed! ~ ', err);
      this.setState({
        animation: 'idle'
      });
    });


  }

  render() {
    if (!navigator.geolocation){
      console.log("Geolocation is not supported by your browser");
      return null;
    }

    const success = (position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });

    }

    function error() {
      console.log("Unable to retrieve your location");
    }

    navigator.geolocation.getCurrentPosition(success, error);
    return (
      <div className="main-view">
        <Logo />
        <SpeechBalloon response={this.state.response} dialogue={this.state.dialogue}/>
        <Navi animation={this.state.animation} />
        <QueryField query={this.state.query}
                    setQuery={this.setQuery}
                    getData={this.getData} />
        <PlaceInfo  placeName={this.state.placeName}
                    placeAddress={this.state.placeAddress}
                    placeLat={this.state.placeLat}
                    placeLng={this.state.placeLng}
                    placeRating={this.state.placeRating} />
      </div>
    );
  }

  // componentWillUpdate() {
  //
  // }
}

export default Main;
