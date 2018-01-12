const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntitySchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,         //smalltalk
  //intents: String          //greet
  intents: []
  // }
});

const Entity = mongoose.model('entity', EntitySchema);

module.exports = Entity;