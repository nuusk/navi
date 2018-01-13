const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: String,
  email: String,
  password: String,
  localizationImportance: Number,
  ratingImportance: Number,
  priceImportance: Number,
  wantsToBeQuestioned: Boolean
});

const User = mongoose.model('user', UserSchema);

module.exports = User;