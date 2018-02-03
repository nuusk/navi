// import bibliotek fs i node-fetch
// import klucza z google places api
const fs = require('fs');
const fetch = require("node-fetch");
const _googlePlacesKey = fs.readFileSync('../resources/keys/google-web-places-key.txt', 'utf8').split('\n')[0];

// oblicza promięn okręgu danej powierzchnii
function getRadius(area) {
  return Math.sqrt(area/Math.PI).toString();
}

// stwórz url wraz z parametrami, 
// który będzie zapytaniem do google places api
function createUrl(parameters, nextPage) {
  let url = parameters['baseUrl'];
  // jeśli pole typ w parametrach nie jest puste,
  // dodaj takie pole
  if (parameters['type']!='') {
    url += (parameters['type'] + '?');
  }
  // analogicznie dla lokalizacji
  if (!nextPage && parameters['location']!='') {
    url += ('&location=' + parameters['location']);
  }
  // i promień
  if (!nextPage && parameters['radius']!='') {
    url += ('&radius=' + parameters['radius']);
  }
  // dodaj klucz google places api
  url += ('&key=' + _googlePlacesKey);


  // google places api jest w stanie obłużyć 20 miejsc na raz
  // jeśli będzie więcej wyników na określonej przestrzeni, 
  // odpowiedź będzie zawierać token do następnej strony
  // możemy otrzymać 3 maksymalnie 3 strony, czyli 60 miejsc max
  if (nextPage) {
    url += ('&pagetoken=' + decodeURIComponent(nextPage));
  }
  return url;
};
// funkcja asynchroniczna, jako parametr przyjmuje 
// koordynaty i wyżej wspomniany token
async function askGooglePlaces(cityLocations, nextPageToken = '') {
  const parameters = {
    'baseUrl': 'https://maps.googleapis.com/maps/api/place/nearbysearch/',
    'type': 'json',
    'location': cityLocations['position']['latitude'] + ',' + cityLocations['position']['longitude'],
    'radius': getRadius(261850000)
  };

  const newData = await fetch(createUrl(parameters, nextPageToken))
   .then( data => data.json() )
   .then( data => data )
   .catch( err => {
     return err;
   });
  return { results: newData.results, nextPageToken: newData.next_page_token };
};

module.exports = askGooglePlaces;
