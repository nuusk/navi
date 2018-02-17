import React, { Component } from 'react';

//importowanie komponentów
import Navi from '../components/Navi/Navi';
import SpeechBalloon from '../components/SpeechBalloon/SpeechBalloon';
import PlaceInfo from '../components/PlaceInfo/PlaceInfo';
import QueryField from '../components/QueryField/QueryField';
import Logo from '../components/Logo/Logo';
import RegisterForm from '../components/RegisterForm/RegisterForm';

import './setting.css'

class Main extends Component {
  constructor(props) {
    super(props);

    this.setQuery = this.setQuery.bind(this);
    this.getData = this.getData.bind(this);

    //stan, który definiuje zachowanie
    //wszystkich komponentów w danym widoku
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
      placeRating: '',
      view: 'query'
    };
  }

  //funkcja ta jest wywoływana przez komponent QueryField,
  //kiedy użytkownik wpisze zapytanie
  //informacja o tym, że navi szuka odpowiedzi,
  //trafi następnie do komponentu Navi
  //komponent Navi dostosuje swój stan
  //(w tym przypadku animacje) do podanej wartości
  setSearching(value = true) {
    this.setState({
      searching: value
    });
  }

  //funkcja ta jest wywoływana za każdym razem,
  //kiedy zmieni się wartość zapytania
  //wprowadzanego przez użytkownika
  setQuery(value) {
    this.setState({
      query: value
    });
  }

  //funkcja ta jest wywoływana,
  //kiedy użytkownik wpisze zapytanie
  getData(query) {
    //informacja o zmianie stanu
    //zostanie przekazana do komponentu Navi
    this.setState({
      animation: 'loading',
      view: 'dialogue'
    });
    //żądanie GET zostaje wysłane
    //na adres dostarczany przez API
    fetch('http://localhost:9004/api/message?name='
    +encodeURIComponent(query)
    +'&lat='+this.state.latitude
    +'&lng='+this.state.longitude, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      this.setState({
        animation: 'idle'
      });
      return res.json();
    })
    .then(result => {
      //jeśli to co otrzymaliśmy w odpowiedzi
      //jest miejscem to wiemy, że Navi
      //zaproponuje to miejsce użytkownikowi
      if (result.location) {
        this.setState({
          animation: 'dialogue',
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
          animation: 'dialogue',
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

  //geolokalizacja jest walidowana tylko w przypadku,
  //jeśli przeglądarka wspiera ten moduł
  componentWillMount() {
    if (!navigator.geolocation){
      console.log("Geolocation is not supported by your browser");
      return null;
    }

    //jeśli udało się zlokalizować położenie,
    //zmieniany jest stan głównego komponentu
    //te wartości będą wykorzystywane
    //podczas zapytań do określenia pozycji użytkownika
    const success = (position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }

    //jeśli nie udało się zlokalizować użytkownika
    //z jakiegokolwiek powodu, wywoływana jest funkcja error
    function error() {
      console.log("Unable to retrieve your location");
    }

    //przekierowanie na odpowiednią funkcję
    //w zależności od stanu powodzenia geolokalizacji
    navigator.geolocation.getCurrentPosition(success, error);
  }

  render() {
    //zmienna view zawiera główne komponenty
    let view;
    //w zależności od stanu widoku Main.js,
    //zmieniamy główne komponenty
    switch (this.state.view) {
      case 'query':
        view = (
          <span>
          <Logo />
          <QueryField query={this.state.query}
                      setQuery={this.setQuery}
                      getData={this.getData}
                      position="center"/>
          <PlaceInfo  placeName={this.state.placeName}
                      placeAddress={this.state.placeAddress}
                      placeLat={this.state.placeLat}
                      placeLng={this.state.placeLng}
                      placeRating={this.state.placeRating} />
          </span>
        )
        break;
    case 'register':
      view = (
        <span>
        <Logo />
        <SpeechBalloon response={this.state.response}
                       dialogue={this.state.dialogue}/>
        <RegisterForm />
        </span>
      )
      break;
    case 'dialogue':
      view = (
        <span>
        <Logo />
        <QueryField query={this.state.query}
                    setQuery={this.setQuery}
                    getData={this.getData}
                    position="top"/>
        <SpeechBalloon response={this.state.response}
                       dialogue={this.state.dialogue}/>
        <PlaceInfo  placeName={this.state.placeName}
                    placeAddress={this.state.placeAddress}
                    placeLat={this.state.placeLat}
                    placeLng={this.state.placeLng}
                    placeRating={this.state.placeRating} />
        </span>
      )
      break;
     default:
      break;
    }
    return (
      <div className="main-view">
        <Navi animation={this.state.animation}
              view={this.state.view} />
        { view }
      </div>
    );
  }

}

export default Main;
