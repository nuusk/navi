const assert = require('assert');
const User = require('../server/models/user');

describe('Updating a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({
      name: 'Joe',
      email: 'test@test.com',
      password: 'test',
      localizationImportance: 1,
      ratingImportance: 1,
      priceImportance: 1
    });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({})) // jak w find daje pusty obiekt to zwraca mi wszystko
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].localizationImportance === 5);
        done();
      })
  }

  it.only('instance type using set n save', (done) => {
    joe.set('localizationImportance', 5); //setuje properties name na alex, to tylko setuje ale nie zapisuje tego w bazie (nie robi persist)
    assertName(joe.save(), done);
  });

  it.only('model instance update', (done) => {
    assertName(joe.update({ localizationImportance: 5 }), done); // zapisuje automatycznie, robi od razu set i save
  });

  it.only('class method update', (done) => {
    assertName(
      User.update({ name: 'Joe' }, { localizationImportance: 5 }), // pierwszy argument to obiekt ktory ma byc updatowany, drugi to na co ma byc updatowany
      done
    );
  });

  it.only('class method findOneAndUpdate', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { localizationImportance: 5 }), // pierwszy argument to obiekt ktory ma byc updatowany, drugi to na co ma byc updatowany
      done
    );
  });

  it.only('class method findByIdAndUpdate', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { localizationImportance: 5 }), // pierwszy argument to id obiektu ktory ma byc updatowany, drugi to na co ma byc updatowany
      done
    );
  });

});