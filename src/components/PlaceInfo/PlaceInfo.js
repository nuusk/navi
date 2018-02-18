import React, { Component } from 'react';
import './PlaceInfo.css';
import Map from '../Map/Map';
import Rating from '../Rating/Rating';

class PlaceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }

    //zdarzenia odbywające się na elementach DOM na stronie internetowej nalezy powiązać
      //z komponentami renderowanymi przez React
    this.handleExpanding = this.handleExpanding.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(this.props);
  }

  handleExpanding() {
    //następuje zmiana stanu. przy zmianie stanu React dostaje informację, że należy przerenderować komponenty
    //oznacza to, że do funkcji render trafi informacja o optymalnych operacjach modyfikujących wyświetlany stan
    this.setState({
      expanded: !(this.state.expanded)
    });
  }

  render() {
    if (this.props.placeName === '') {
      return null
    } else {
      return (
        <div className="PlaceInfo">
          <div className="place"
                onClick={this.handleExpanding}>
            <div className="name">{this.props.placeName}</div>
            <Rating stars={this.props.placeRating} />
            <div className="address">{this.props.placeAddress}</div>
            {/*<div className="lat">{this.props.placeLat}</div>
            <div className="lng">{this.props.placeLng}</div> */}


              <Map  lat={this.props.placeLat}
                    lng={this.props.placeLng}
                    expanded={this.state.expanded}/>

          </div>
        </div>
      );
    }
  }
}


export default PlaceInfo;
