//const poznanRadius = 9131.9;

const metersToLatitude = (distance) => {
  return distance/111132.954;
}

const metersToLongitude = (distance, latitude) => {
  return distance / (111132.954 * Math.cos(latitude));
}

const getDivisionRadius = (fullRadius, itemsInRow) => {
  return fullRadius*Math.sqrt(2)/(2*itemsInRow);
}

const splitDivisions = (cityCenterLatitude, cityCenterLongitude, divisionsInColumn, divisionsInRow, fullRadius) => {
  let centerOfDivisions = new Array(divisionsInRow);
  for (let i = 0; i < divisionsInRow; i++) {
    centerOfDivisions[i] = new Array(divisionsInColumn);
  }

  let startingPosition = {
    latitude: cityCenterLatitude + metersToLatitude(fullRadius),
    longitude: cityCenterLongitude - metersToLongitude(fullRadius, cityCenterLatitude)
  };

  for (let i=0; i<divisionsInColumn; i++) {
    for (let j=0; j<divisionsInRow; j++) {
      centerOfDivisions[i][j] = {
        position: {
          //latitude: startingPosition.latitude - metersToLatitude(poznanRadius*i/(divisionsInColumn/2)),
          latitude: startingPosition.latitude - metersToLatitude(fullRadius*i/(divisionsInColumn/2)),
          //longitude: startingPosition.longitude + metersToLongitude(poznanRadius*j/(divisionsInRow/2), startingPosition.latitude - metersToLatitude(poznanRadius*i/(divisionsInColumn/2)))
          longitude: startingPosition.longitude + metersToLongitude(fullRadius*j/(divisionsInRow/2), startingPosition.latitude)
        }
      };
    }
  }
  return centerOfDivisions;

};


// splitDivisions(52.40692, 16.92993, 12, 12, 9131.9);
module.exports = {
    divisionsCenter: splitDivisions,
    divisionRadius: getDivisionRadius
}
