const mongoose = require('mongoose');

//mongoose uzywaj global promisow a nie
mongoose.Promise = global.Promise;

// funkcja ktora wykonuje sie tylko raz przed rozpoczeciem wykonywania testow
before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => { done(); }) // jak connection is open to informuje mocha ze moze robic testy
    .on('error', (error) => {
      console.error('error', error);
    });
});

// funkcja ktora wykonuje sie przed kazdym testem
beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // ready to run the next test!
    done();
  });
});