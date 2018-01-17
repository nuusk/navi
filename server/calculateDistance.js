class Calculator {

  toRadians = (angle) => angle * Math.PI / 180;

  calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; // metres
    const lat1Radians = toRadians(lat1);
    const lat2Radians = toRadians(lat2);
    const latDelta = toRadians((lat2-lat1));
    const lngDelta = toRadians((lng2-lng1));

    const a = Math.sin(latDelta/2) * Math.sin(latDelta/2) +
            Math.cos(lat1Radians) * Math.cos(lat2Radians) *
            Math.sin(lngDelta/2) * Math.sin(lngDelta/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c;
    return d;
  }
}

module.exports = Calculator;
