const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = Schema({
  googleId: String,
  name: String,
  location: {
    lat: Number,
    lng: Number
  },
  icon: String,
  //parametr do zapytania google photo api
  photoReference: String,
  rating: Number,
  types: [String],
  address: String,
});

const Place = mongoose.model('place', PlaceSchema);

module.exports = Place;