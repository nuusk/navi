class Calculator() {

  Number.prototype.toRadians = function() {
    console.log(this);
    return this * Math.PI / 180;
  }

  function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371e3; // metres
    const lat1Radians = lat1.toRadians();
    const lat2Radians = lat2.toRadians();
    const latDelta = (lat2-lat1).toRadians();
    const lngDelta = (lng2-lng1).toRadians();

    const a = Math.sin(latDelta/2) * Math.sin(latDelta/2) +
            Math.cos(lat1Radians) * Math.cos(lat2Radians) *
            Math.sin(lngDelta/2) * Math.sin(lngDelta/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c;
    return d;
  }
}

module.exports = Calculator;
