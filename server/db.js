const mongoose = require('mongoose');
mongoose.connect('mongodb://maciejkrol:password@ds135817.mlab.com:35817/kruche_krolestwo');
const Schema = mongoose.Schema;
const categorySchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  places: [{ type: Schema.Types.ObjectId, ref: 'Place' }]
});

const placeSchema = Schema({
  _id: Schema.Types.ObjectId,
  googleId: String,
  name: String,
  location: {
    lat: Number,
    lng: Number
  },
  icon: String,
  //parametr do zapytania google photo api
  photoReference: String,
  rating: Number,
  types: [String],
  address: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

Place = mongoose.model('Place', placeSchema);
Category = mongoose.model('Category', categorySchema);

class Database {
  constructor(config) {
    console.log('config');
  }
  addPlace(place) {

    let categoryTypes = place.types;
    for (let i of categoryTypes) {
      Category.findOne({ name: i }, (err, category) => {
        console.log(category);
        if (err) console.log(err);
        if (!category) {
          new Category({
            _id: new mongoose.Types.ObjectId(),
            name: i,
            $push: {places: place}
          }).save(err => {
            // if (err) return handleError(err);
            if (err) {
              console.error(err);
            }

            new Place({
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
            }).save(err => {
              // if (err) return handleError(err);
              if (err) {
                console.error(err);
              }
            });
            // console.log('category and place saved');
          });
        } else {

          var newPlace = new Place({
            _id: new mongoose.Types.ObjectId(),
            googleId: place.id,
            name: place.name,
            location: {
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng
            },
            icon: place.icon,
            //parametr do zapytania google photo api
            // photoReference: place.photos[0].photo_reference,
            rating: place.rating,
            types: place.types,
            address: place.vicinity
          });

          newPlace.save(err => {
            // if (err) return handleError(err);
            if (err) {
              console.error(err);
            }
            // thats it!
            // console.log('place saved');
          });
        }
      });
    }
  }
}


module.exports = Database;
