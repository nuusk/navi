const assert = require('assert');
const User = require('../server/models/user');
const Place = require('../server/models/place');
const bcrypt = require('bcrypt');


//blok testow
describe('Creating records', () => {
  //pojedynczy test
  it.only('saves a user', (done) => {
    // assert oznacza ze oczekujemy taki wynik i na tej podstawie testy przechodza albo nie
    //assert(1 + 1 === 2);

    // tworze instancje usera
    const joe = new User({
      name: 'Joe',
      email: 'test@test.com',
      password: bcrypt.hashSync('test', 10), // hashuje bcryptem
      localizationImportance: 1,
      ratingImportance: 1,
      priceImportance: 1
    });

    joe.save()
      .then(() => {
        // has joe been saved successfully?
        assert(!joe.isNew);
        done();
      });
  });

  it.only('saves a place', (done) => {
    // tworze instancje place
    const place = new Place({
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
    })

    place.save()
      .then(() => {
        // has place been saved successfully?
        assert(!place.isNew);
        done();
      });
  });
})
