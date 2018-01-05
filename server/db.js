var mongoose = require('mongoose');
mongoose.connect('mongodb://maciejkrol:password@ds135817.mlab.com:35817/kruche_krolestwo');
var Schema = mongoose.Schema;

class Database {
  categorySchema = Schema({
    _id: String,
    name: String,
    location: {
      lat: Number,
      lng: Number
    },
    icon: String,
    //parametr do zapytania google photo api
    photoReference: String,
    rating: Number,
    types: String[],
    address: String,
    places: [{ type: Schema.Types.ObjectId, ref: 'Place' }]
  });
  
  placeSchema = Schema({
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    name: String,
    fans: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
  });
  
  Place = mongoose.model('Place', placeSchema);
  Category = mongoose.model('Category', categorySchema);
  
  addPlace() {
    Category.findOne({name: 'burdele'}, (err, category) => {
      if (err) console.log(err);
      if (!category) {
        new Category({
          _id: new mongoose.Types.ObjectId(),
          name: 'burdele',
          age: 50
        }).save(function (err) {
          if (err) return handleError(err);
          
          new Place({
            name: 'superBurdel69',
            category: category._id    // assign the _id from the person
          }).save(function (err) {
            if (err) return handleError(err);
            // thats it!
            
          });
          console.log('category and place saved');
        });
      } else {
        var place = new Place({
          name: 'lize jaja',
          category: category._id    // assign the _id from the person
        });
        
        place.save(function (err) {
          if (err) return handleError(err);
          // thats it!
          console.log('place saved');
        });
      }
    });
  }
}

module.export = Database;






