const assert = require('assert');
const User = require('../server/models/user');

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync(); // niesynchroniczny validator, samo validate jest asynchroniczne
    //const message = validationResult.errors.name.message; // pobieram error message
    const { message } = validationResult.errors.name; // to samo co linijka wyzej es6

    assert(message === 'Name is required.'); //sprawdzam czy zwrocony error message zgadza mi sie z tym co mam w user.js
  });

  it('requires a user name longer than 2 characters', () => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name must be longer than 2 characters.') //sprawdzam czy zwrocony error message zgadza mi sie z tym co mam w user.js

  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({ name: 'Al' });
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;

        assert(message === 'Name must be longer than 2 characters.');
        done();  
      })
  });
});