const assert = require('assert');
const User = require('../server/models/user');
const bcrypt = require('bcrypt');

//blok testow
describe('Reading users out of the database', () => {
  let joe;
  // zanim przeprowadze testy zeby wyszukiwal w bazie, musze utworzyc takiego uzytkownika zeby mial
  // co wyszukac
  // tworze instancje usera
  beforeEach((done) => {
    joe = new User({
      name: 'Joe',
      email: 'test@test.com',
      password: bcrypt.hashSync('test', 10), // hashuje bcryptem
      localizationImportance: 1,
      ratingImportance: 1,
      priceImportance: 1
    });
    joe.save()
      .then(() => done())
  })

  it.only('finds all users with a name of joe', (done) => {
    //User.find(criteria) find all users that match the given criteria, returns an array
    //User.findOne(criteria) find first user that matches the criteria, returns a single record
    User.find({ name: 'Joe' })
      .then((users) => {
        console.log(users);
        assert(users[0]._id.toString() === joe._id.toString()); //obiekty w bazie sa opakowane handlerem ObjectId, dlatego nie sa rowne, trzeba uzyc .toString()
        done();
      });
  });

  it.only('find a user with a particular id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      })
  });

  it.only('check if password is properly hashing', (done) => {
    User.findOne({ name: 'Joe' })
    .then((user) => {
      assert(bcrypt.compareSync('test', user.password)); //obiekty w bazie sa opakowane handlerem ObjectId, dlatego nie sa rowne, trzeba uzyc .toString()
      done();
    });
  })

})
