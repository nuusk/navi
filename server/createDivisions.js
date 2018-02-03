// konwertuje metry na szerokość geograficzną
function metersToLatitude(distance) {
  return distance/111111.1;
}

// Incidentally, these magic numbers of 111,111
// are easy to remember by knowing some history:
// the French originally defined the meter so that
// 10^7 meters would be the distance along the Paris
// meridian from the equator to the north pole.
// Thus, 10^7 / 90 = 111,111.1 meters equals one 
// degree of latitude to within the capabilities
// of French surveyors two centuries ago

// konwertuje metry na długość geograficzną
function metersToLongitude(distance, latitude) {
  return distance / (111111.1 * Math.cos(latitude));
}

// powierzchnia jednego obszaru
function getDivisionRadius(cityRadius, itemsInRow) {
  return cityRadius*Math.sqrt(2)/(2*itemsInRow);
}

// posiadając centralny punkt miasta, 
// dzieli miasto na podaną liczbę obszarów
function getCenterOfDivisions(cityCenterLatitude, 
    cityCenterLongitude, divisionsInColumn, divisionsInRow,
      cityRadius) {
  let centerOfDivisions = new Array(divisionsInRow);
  for (let i = 0; i < divisionsInRow; i++) {
    centerOfDivisions[i] = new Array(divisionsInColumn);
  }

  // skrypt rozpoczyna pracę w górnym lewym rogu mapy
  let startingPosition = {
    // żeby to zrobic, dodaj promień miasta,
    // jako szerokość geograficzną do środkowego punktu
    // szerokości geograficznej
    latitude: cityCenterLatitude + metersToLatitude(cityRadius),
    // i odejmij promień miasta jako długość geograficzną
    // od środkowego punktu długości geograficznej
    longitude: cityCenterLongitude - metersToLongitude(cityRadius, cityCenterLatitude)
  };

  // stwórz centralny punkt dla wszystkich obszarów
  for (let i=0; i<divisionsInColumn; i++) {
    for (let j=0; j<divisionsInRow; j++) {
      centerOfDivisions[i][j] = {
        position: {
          latitude: startingPosition.latitude -
            metersToLatitude(cityRadius*i/(divisionsInColumn/2)),
          longitude: startingPosition.longitude + 
            metersToLongitude(cityRadius*j/(divisionsInRow/2),
              startingPosition.latitude)
        }
      };
    }
  }
  // zwróć tablicę centralnych punktów dla każdego obszaru
  //return the whole array of center points of each division
  return centerOfDivisions;
};

// eksportuje powyższe funkcje
module.exports = {
    getCenterOfDivisions: getCenterOfDivisions,
    getDivisionRadius: getDivisionRadius
}
