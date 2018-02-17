import React, { Component } from 'react';
import './Map.css';
import less from './less.svg';
import more from './more.svg';

//moduł zapewniający integrację biblioteki React z Google Maps
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

//stworzenie komponentu implementującego moduł z mapą
//zmienne w props definiują punkty charakterystyczne na mapie oraz położenie kursora
const MapIntegration = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}
  </GoogleMap>
));

//stworzenie domyślnego komponentu wrapującego mapę
class Map extends Component {
  constructor(props) {
    super(props);

    //zmienne zawierają tekst, który jest zmieniany w zależności od tego czy mapa jest rozwinięta czy nie
    this.textExpand = "Pokaż mapę";
    this.textHide = "Ukryj mapę";

    //stan komponentu określa najważniejsze informacje potrzebne do wyświetlenia mapy
    //są to domyślne wartości, które ulegną zmianie,
      //jeśli z backendu otrzymamy informację o położeniu wyszukiwanego miejsca
    this.state = {
      lat: -34.397,
      lng: 150.644
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   this.setState({
  //     lat: this.props.lat,
  //     lng: this.props.lng
  //   });
  // }

  //render to fundamentalna funckja wyświetlająca komponent ściśle związana z cyklem życia komponentów w React
  //render nie zostanie wywołana jeśli shouldComponentUpdate() zwróci false
  render() {
    //wywołanie funkcji render będzie skutkowało wyświetleniem komponentu zgodnie z jego obecnym stanem
    return (
      <div className="map">
        <span className="button-wrapper">
          <button className='button'>
            {this.props.expanded ? this.textHide : this.textExpand}
          </button>
          <img className='icon'
               src={this.props.expanded ? less : more}
               onClick={this.props.handleExpanding}
               alt=""/>
        </span>
        <div className={this.props.expanded ? "map-wrapper-expanded" : "map-wrapper-hidden"}>
          <MapIntegration isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `150px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            lat={this.props.lat}
            lng={this.props.lng}/>
        </div>
      </div>
    );
  }
}

export default Map;
