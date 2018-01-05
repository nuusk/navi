//convert meters to latitude using special formula
function metersToLatitude(distance) {
  return distance/111111.1;
}

// Incidentally, these magic numbers of 111,111 are easy to remember by knowing some history:
// the French originally defined the meter so that 10^7 meters would be the distance along the Paris meridian from the equator to the north pole.
// Thus, 10^7 / 90 = 111,111.1 meters equals one degree of latitude to within the capabilities of French surveyors two centuries ago

//convert meters to longitude
function metersToLongitude(distance, latitude) {
  return distance / (111111.1 * Math.cos(latitude));
}

//circle area of one division
function getDivisionRadius(cityRadius, itemsInRow) {
  return cityRadius*Math.sqrt(2)/(2*itemsInRow);
}

//using the center point of the city, divide the city area into given number of divisions
function getCenterOfDivisions(cityCenterLatitude, cityCenterLongitude, divisionsInColumn, divisionsInRow, cityRadius) {
  let centerOfDivisions = new Array(divisionsInRow);
  for (let i = 0; i < divisionsInRow; i++) {
    centerOfDivisions[i] = new Array(divisionsInColumn);
  }

  //the script starts at the top-left position on the map.
  let startingPosition = {
    //to do this, add the radius of the city (in latitude measurement) to the center point latitude
    latitude: cityCenterLatitude + metersToLatitude(cityRadius),
    //and subtract the radius of the city (in longitude measurement) from the center point longitude
    longitude: cityCenterLongitude - metersToLongitude(cityRadius, cityCenterLatitude)
  };

  //create the center points of all divisions
  for (let i=0; i<divisionsInColumn; i++) {
    for (let j=0; j<divisionsInRow; j++) {
      centerOfDivisions[i][j] = {
        position: {
          //latitude: startingPosition.latitude - metersToLatitude(poznanRadius*i/(divisionsInColumn/2)),
          latitude: startingPosition.latitude - metersToLatitude(cityRadius*i/(divisionsInColumn/2)),
          //longitude: startingPosition.longitude + metersToLongitude(poznanRadius*j/(divisionsInRow/2), startingPosition.latitude - metersToLatitude(poznanRadius*i/(divisionsInColumn/2)))
          longitude: startingPosition.longitude + metersToLongitude(cityRadius*j/(divisionsInRow/2), startingPosition.latitude)
        }
      };
    }
  }

  //return the whole array of center points of each division
  return centerOfDivisions;
};


module.exports = {
    getCenterOfDivisions: getCenterOfDivisions,
    getDivisionRadius: getDivisionRadius
}
