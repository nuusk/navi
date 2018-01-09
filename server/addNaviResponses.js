const Database = require('./db');
const db = new Database();
const responses = [];
// responses.push(require('../resources/responses/smalltalk.json'));
const smalltalk = require('../resources/responses/smalltalk.json');

// for (i in responses) {
//   console.log('entity: ' + responses[i]);
//   // for (j in responses[i].intents) {
//   //   console.log('intents: ' + responses[i].intents[j]);
//   // }
//   db.addEntity(responses[i]);
// }

// console.log(smalltalk);
db.addEntity(smalltalk);
