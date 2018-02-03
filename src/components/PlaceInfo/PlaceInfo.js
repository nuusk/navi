import React, { Component } from 'react';
import './PlaceInfo.css';
import Map from '../Map/Map';
import Rating from '../Rating/Rating';

class PlaceInfo extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props);
  }

  render() {
    if (this.props.placeName == '') {
      return null
    } else {
      return (
        <div className="PlaceInfo">
          <div className="place">
            <div className="name">{this.props.placeName}</div>
            <div className="address">{this.props.placeAddress}</div>
            <div className="lat">{this.props.placeLat}</div>
            <div className="lng">{this.props.placeLng}</div>
            <Rating stars={this.props.placeRating} />
            <Map  lat={this.props.placeLat}
                  lng={this.props.placeLng} />
          </div>
        </div>
      );
    }
  }
}


export default PlaceInfo;
