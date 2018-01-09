const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntitySchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,         //smalltalk
  intents: []           //greet
    // intent: { type: Array, lowercase: true, trim: true }
  // }

});

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

const User = monboose.model('user', UserSchema);
const Entity = mongoose.model('entity', EntitySchema);
const Place = mongoose.model('place', PlaceSchema);

module.exports = {
    Entity: Entity,
    Place: Place,
}
