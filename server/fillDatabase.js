const askGooglePlaces = require('./askGooglePlaces');
const createDivisions = require('./createDivisions');

const fillDatabase = async (cityLocations) => {
  //next page token will determine whether we have to process the next page with a given token to see more of the results from the same request
  let nextPageToken = '';
  //we can only fetch 3 pages of one request (each page has 20 places)
  let pageCounter = 0;
  do {
    const data = await askGooglePlaces(cityLocations, nextPageToken);
    const results = data.results;
    if(results.length==0) {
      console.log(data);
    }
    nextPageToken = data.nextPageToken;

    results.forEach( (e) => {
      console.log(e);
      for(let i =0; i < 10000000000/20; i++){}; //wait for Google Api

      //insert data into mongo
    });

  } while( pageCounter++ < 2 );
};

let fillingCounter = 0;
let fillerIteration = 0;
let tmpFill = 0;
createDivisions.getCenterOfDivisions(52.40692, 16.92993, 20, 20, 7000)
  .forEach( (array) => {
    array.forEach( (position) => {
      // for(let i = 0; i < 10000000000/10; i++) {}; //wait for Google Api
      if(fillerIteration >= fillingCounter && fillerIteration < fillingCounter+3) {
        console.log(position);
        fillDatabase(position);
      }
      fillerIteration++;
      tmpFill++;
      if (tmpFill === 3) {
        tmpFill = 0;
        fillingCounter += 3;
      }
    });
  });
