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
          //console.log(res);
          resolve(res)
        });
    });
  }

  // zwraca encje na podstawie keyworda, encja zawiera tablice opcji, ktore sa losowane
  findEntityByType(type) {
    return new Promise(function (resolve, reject) {
      Entity.findOne({ name: type })
        .then((res) => {
          if(res) {
            console.log(res);
            let intent = res.intents[Math.floor(Math.random() * res.intents.length)];
            resolve(intent);
          } else {
            console.log(res);
          }

        });
    });
  }

  // setUserPreferenceModel() {
  //   return new Promise(() => {
  //   })
  // }

  findUserByEmail(req) {
    return new Promise(function (resolve, reject) {
      User.findOne({ email: req }, function (err, user) {
        if (err) return console.error(err);
        resolve(user);
      });
    });
  }

  findUserById(userId) {
    return new Promise(function (resolve, reject) {
      User.findById(userId, function (err, user) {
        if (err) return console.error(err);
        resolve(user);
      });
    });
  }

  findUserByIdAndUpdate(userId, ratingImportance, priceImportance, wantsToBeQuestioned ) {
    return new Promise(function (resolve, reject) {
      User.findByIdAndUpdate(
        userId,
        {   
          ratingImportance: ratingImportance,
          priceImportance: priceImportancember,
          wantsToBeQuestioned: wantsToBeQuestioned
         }
      )
        .then((user) => {
          resolve(user);
        });
    });
  }

}

module.exports = Database;
