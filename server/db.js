const mongoose = require('mongoose');
mongoose.connect('mongodb://maciejkrol:password@ds135817.mlab.com:35817/kruche_krolestwo');

const Place = require('./models/place');
const Entity = require('./models/entity');

class Database {

  async addPlace(place) {
    console.log(place);

    const insertedPlace = new Place({
      _id: new mongoose.Types.ObjectId(),
      googleId: place.id,
      name: place.name,
      location: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng
      },
      icon: place.icon,
      //parametr do zapytania google photo api
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

  findPlace() {

    // to do preferenceModel() 
  }
  
  findEntityByType(type) {
    return new Promise(function (resolve, reject) {
      Entity.findOne({ name: type })
        .then((res) => {
          let intent = res.intents[Math.floor(Math.random() * res.intents.length)];
          resolve(intent);
        })
    })
  }

}

module.exports = Database;
