// importuje biblotekę mongoose i tworze Schema na podstawie modułu mongoose'a
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// tworze konkretną Schema, która reprezentuję strukturę modelu użytkownika
const UserSchema = Schema({
  name: String,
  email: String,
  password: String,
  localizationImportance: Number,
  ratingImportance: Number,
  priceImportance: Number,
  wantsToBeQuestioned: Boolean
});

// tworze model, na podstawie Schema
const User = mongoose.model('user', UserSchema);

// eksportuje model żeby mieć do niego dostęp z poziomu innych plikóœ
module.exports = User;