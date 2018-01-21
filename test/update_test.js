const assert = require('assert');
const User = require('../server/models/user');

describe('Updating a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', postCount: 0 });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({})) // jak w find daje pusty obiekt to zwraca mi wszystko
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      })
  }


  it('instance type using set n save', (done) => {
    joe.set('name', 'Alex'); //setuje properties name na alex, to tylko setuje ale nie zapisuje tego w bazie (nie robi persist)
    assertName(joe.save(), done);
  });

  it('model instance update', (done) => {
    assertName(joe.update({ name: 'Alex' }), done); // zapisuje automatycznie, robi od razu set i save
  });

  it('class method update', (done) => {
    assertName(
      User.update({ name: 'Joe' }, { name: 'Alex' }), // pierwszy argument to obiekt ktory ma byc updatowany, drugi to na co ma byc updatowany
      done
    );
  });

  it('class method findOneAndUpdate', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), // pierwszy argument to obiekt ktory ma byc updatowany, drugi to na co ma byc updatowany
      done
    );
  });

  it('class method findByIdAndRemove', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex' }), // pierwszy argument to id obiektu ktory ma byc updatowany, drugi to na co ma byc updatowany
      done
    );
  });

  //xit mocha ominie ten test
  xit('a user can have their postcount incremented by 1', (done) => {
      User.update({ name: 'Joe' }, { $inc: { postCount: 1 } }) // mongo operator $inc do inkrementowania, w srodku wrzucam properties ktory chcemy updatowac i o ile
        .then(() => User.findOne({ name: 'Joe'}))
        .then((user) => {
          assert(user.postCount === 1);
          done();
        })
  });
});