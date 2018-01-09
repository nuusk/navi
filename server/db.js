const mongoose = require('mongoose');
mongoose.connect('mongodb://maciejkrol:password@ds135817.mlab.com:35817/kruche_krolestwo');
const schemas = require('./schemas');

class Database {

  async addPlace(place) {
    console.log(place);

    const googlePlace = new schemas.Place({
      _id: new mongoose.Types.ObjectId(),
      googleId: place.id,
      name: place.name,
      location: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng
      },
      icon: place.icon,
      //parametr do zapytania google photo api
      // photoReference: place.photos[0].photo_reference,     !!poprawic
      rating: place.rating,
      types: place.types,
      address: place.vicinity
    })

    await googlePlace.save(err => {
      if (err) {
        console.error(err);
      }
    });
  }

  findByType(typ) {
    Place.find({}).
    where('types').equals(typ).
    limit(10).
    exec((err, res) => {
      console.log(res);
    })
  }
}

module.exports = Database;
