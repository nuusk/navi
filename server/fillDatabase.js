// import bibliotek i funkcji zewnętrznych
const askGooglePlaces = require('./askGooglePlaces');
const createDivisions = require('./createDivisions');
const Database = require('./db');

// stworzenie instancji klasy bazy danych
const db = new Database();

// asynchroniczna funkcja do zapisu danych
// do bazy mongoDB
const fillDatabase = async (cityLocations) => {
  // token następnej strony określi czy 
  // potrzebujemy przetworzyć nast. stronę
  // aby zobaczyć więcej wyników tej odpowiedzi
  let nextPageToken = '';
  // max 3 strony na zapytanie
  let pageCounter = 0;
  do {
    // użycie funkcji askGooglePlaces
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
    for(let i =0; i < 10000000000/5; i++){};
    results.forEach( (place) => {
      db.addPlace(place);
    });
}
  } while( pageCounter++ < 2 );
};

let fillerIteration = 0;

// używam funkcji createDivisions opisanej wyżej
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
