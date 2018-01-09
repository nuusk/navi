const askGooglePlaces = require('./askGooglePlaces');
const createDivisions = require('./createDivisions');
const Database = require('./db');
const db = new Database();

const fillDatabase = async (cityLocations) => {
  //next page token will determine whether we have to process the next page with a given token to see more of the results from the same request
  let nextPageToken = '';
  //we can only fetch 3 pages of one request (each page has 20 places)
  let pageCounter = 0;
  do {
    const data = await askGooglePlaces(cityLocations, nextPageToken);
    if (data) {
    const results = data.results;
    if (results.length == null) {
      console.log('DATA:' + data);
      console.log('DATA:' + data.json());
    }
    if(results.length==0) {
      console.log(data);
    }
    nextPageToken = data.nextPageToken;
    for(let i =0; i < 10000000000/5; i++){}; //wait for Google Api
    results.forEach( (place) => {
      console.log(place);


      //insert data into mongo
      db.addPlace(place);///(`places/${e.id}`, e);

      // const address = e.vicinity.split(',');
      // const city = address[address.length - 1].trim();
      //
      // if (e.name.toLowerCase().includes('hostel')) {
      //   e.types.length = 0;
      //   e.types.push('hostel');
      // }
      // if (e.name.toLowerCase().includes('hotel')) {
      //   e.types.length = 0;
      //   e.types.push('hotel');
      // }
      // if (e.name.toLowerCase().includes('pizza')) {
      //   e.types.length = 0;
      //   e.types.push('pizzeria');
      // }
      //
      // e.types.forEach( (category) => {
      //   db.insert(`cities/${city}/categories/${category}/${e.id}`, e.name);
      // })
    });
}
  } while( pageCounter++ < 2 );
  // db.store();
};

// let fillingCounter = 0;
let fillerIteration = 0;
// let tmpFill = 0;
createDivisions.getCenterOfDivisions(52.40692, 16.92993, 20, 20, 50)
  .forEach( (array) => {
    array.forEach( (position) => {
      // for(let i = 0; i < 10000000000/10; i++) {}; //wait for Google Api
      if(fillerIteration >= 0 && fillerIteration < 3) {
        console.log(position);
        fillDatabase(position);
      }
      fillerIteration++;
      // tmpFill++;
      // if (tmpFill === 3) {
      //   tmpFill = 0;
      //   fillingCounter += 3;
      // }
    });
  });
