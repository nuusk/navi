const assert = require('assert');
const User = require('../server/models/user');
const Place = require('../server/models/place');
const Entity = require('../server/models/entity');
const bcrypt = require('bcrypt');

//blok testow
describe('Reading records out of the database', () => {
  let joe, place, entity;

  // zanim przeprowadze testy tworze instancje usera, place i entity zeby mial co wyszukac
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
      .then(() => { });

    place = new Place({
      googleId: '0730c3e35b6d5367031ab85ef2225d765089a90c',
      name: 'testowe miejsce',
      location: {
        lat: 52.406374,
        lng: 16.9251681
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
      rating: 4.1,
      types: [
        "lodging",
        "point_of_interest",
        "establishment"
      ],
      address: 'Testowa 69, Testowo'
    });
    place.save()
      .then(() => { });

    entity = new Entity({
      name: 'greet',
      intents: ['hello', 'hey', 'hi', 'good morning']
    })

    entity.save()
      .then(() => done());
  })

  it.only('finds all users with a name of joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
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

  it.only('find a user with a particular email', (done) => {
    User.findOne({ email: 'test@test.com' })
      .then((user) => {
        assert(user.email === 'test@test.com');
        done();
      })
  });

  it.only('check if password is properly hashing', (done) => {
    User.findOne({ name: 'Joe' })
      .then((user) => {
        assert(bcrypt.compareSync('test', user.password)); //obiekty w bazie sa opakowane handlerem ObjectId, dlatego nie sa rowne, trzeba uzyc .toString()
        done();
      });
  });

  it.only('read place by type', (done) => {
    Place.findOne({ types: 'lodging' })
      .then((res) => {
        assert(res.types.includes('lodging'));
        done();
      });
  });

  it.only('read entity by type', (done) => {
    Entity.findOne({ name: 'greet' })
      .then((res) => {
        assert(res.intents.length === 4 && res.intents.includes('hello', 'hey', 'hi', 'good morning'));
        done();
      });
  });

})
