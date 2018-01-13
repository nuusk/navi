// operacje na bazie danych
const mongoose = require('mongoose');
mongoose.connect('mongodb://maciejkrol:password@ds135817.mlab.com:35817/kruche_krolestwo');

const Place = require('./models/place');
const Entity = require('./models/entity');
const User = require('./models/user');

class Database {

  // tworzy i dodaje miejsca do bazy na podstawie argumentu
  async addPlace(place) {
    const insertedPlace = new Place({
      googleId: place.id,
      name: place.name,
      location: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng
      },
      icon: place.icon,
      // parametr do zapytania google photo api
      // photoReference: place.photos[0].photo_reference,     !!poprawic
      rating: place.rating,
      types: place.types,
      address: place.vicinity
    })
    await insertedPlace.save(err => {
      if (err) {
        console.error(err);
      }
    });
  }

  // tworzy i dodaje encje do bazy na podstawie argumentów 
  async insertEntity(name, intents) {
    const entity = new Entity({
      name: name,
      intents: intents
    });
    await entity.save()
      .then(() => {
        console.log("entity saved");
      })
      .catch((err) => console.log(err));
    console.log(entity);
  }

  // szuka miejsc na podstawie keyworda
  findPlaces(keyword) {
    return new Promise(function (resolve, reject) {
      Place.find({ types: keyword })
        .then((res) => {
          console.log(res);
          resolve(res)
        });
    });
  }

  // zwraca encje na podstawie keyworda, encja zawiera tablice opcji, ktore sa losowane
  findEntityByType(type) {
    return new Promise(function (resolve, reject) {
      Entity.findOne({ name: type })
        .then((res) => {
          console.log(res);
          let intent = res.intents[Math.floor(Math.random() * res.intents.length)];
          resolve(intent);
        });
    });
  }

  // setUserPreferenceModel() {
  //   return new Promise(() => {
  //   })
  // }

  findUserByEmail(req, res) {
    return new Promise(function (resolve, reject) {
      User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        res.status(200).send("git");
        resolve(user.id);
      });
    });
  }

}

module.exports = Database;
