const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PlaceSchema = Schema({
  _id: Schema.Types.ObjectId,
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
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

const UserSchema = Schema({
  _id: Schema.Types.ObjectId,
  username: String,
  email: String,
  password: String,
  localizationImportance: Number,
  ratingImportance: Number,
  priceImportance: Number,
  wantsToBeQuestioned: Boolean
});

const User = mongoose.model('user', UserSchema);
const Place = mongoose.model('place', PlaceSchema);

module.exports = {
    Place: Place,
}
