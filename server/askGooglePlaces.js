const fs = require('fs');
const fetch = require("node-fetch");
const _googlePlacesKey = fs.readFileSync('../resources/keys/google-web-places-key.txt', 'utf8').split('\n')[0];

//calculate radius of the circle from given area
function getRadius(area) {
  return Math.sqrt(area/Math.PI).toString();
}

//create request url for the google web places api with given parameters
function createUrl(parameters, nextPage) {
  let url = parameters['baseUrl'];
  //if type field in parameters object is not empty, add type field to the request url
  if (parameters['type']!='') {
    url += (parameters['type'] + '?');
  }
  //same goes for location...
  if (!nextPage && parameters['location']!='') {
    url += ('&location=' + parameters['location']);
  }
  //and radius...
  if (!nextPage && parameters['radius']!='') {
    url += ('&radius=' + parameters['radius']);
  }
  //add google web places api
  url += ('&key=' + _googlePlacesKey);

  //google web places api can only handle 20 places at a time.
  //if there was more than that in the area we specified, the response will include a token to the next page.
  //using that token in a request will give next places that couldn't make it to the previous list.
  //In total, we can only get 3 pages (including the first one without a token), which is 60 places max.
  if (nextPage) {
    url += ('&pagetoken=' + decodeURIComponent(nextPage));
  }
  return url;
};

async function askGooglePlaces(cityLocations, nextPageToken = '') {
  const parameters = {
    'baseUrl': 'https://maps.googleapis.com/maps/api/place/nearbysearch/',
    'type': 'json',
    'location': cityLocations['position']['latitude'] + ',' + cityLocations['position']['longitude'],
    'radius': getRadius(261850000)
  };

  const newData = await fetch(createUrl(parameters, nextPageToken))
   .then( data => data.json() )
   .then( data => data );

  return { results: newData.results, nextPageToken: newData.next_page_token };
};

module.exports = askGooglePlaces;
