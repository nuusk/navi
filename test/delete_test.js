const assert = require('assert');
const User = require('../server/models/user');

describe('Deleting a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });


  it('model instance remove', (done) => {
    // usuwa konkretna instancje joe
    joe.remove()                                                      // chain promises
      .then(() => User.findOne({ name: 'Joe' })) // jak joe zostanie usuniety to znajdz w bazie uzytkownika o nazwie joe   Promise #1
      .then((user) => {                          // drugi then bedzie odpalony dopiero jak pierwszy sie skonczy Promise #2
        assert(user === null);
        done();
      });
  });

  it('class method remove', (done) => {
    // remove a bunch of records with some given criteria, w tym wypadku usun wszystkich co maja name joe
    User.remove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', (done) => {
    User.findOneAndRemove(joe._id)
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});