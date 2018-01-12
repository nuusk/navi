const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntitySchema = Schema({
  name: String,
  intents: [String]
});

const Entity = mongoose.model('entity', EntitySchema);

module.exports = Entity;