const request = require("request")
const fetch = require("node-fetch")

//area in meters
const getRadius = (area) => {
  return Math.sqrt(area/Math.PI).toString();
}

const createUrl = (parameters, nextPage) => {
  let url = parameters['baseUrl'];
  if (parameters['type']!='') {
    url += (parameters['type'] + '?');
  }
  if (!nextPage && parameters['location']!='') {
    url += ('&location=' + parameters['location']);
  }
  if (!nextPage && parameters['radius']!='') {
    url += ('&radius=' + parameters['radius']);
  }
  if (parameters['key']!='') {
    url += ('&key=' + parameters['key']);
  }
  if (nextPage) {
    url += ('&pagetoken=' + decodeURIComponent(nextPage) );
  }
  return url;
};


const collect = async (cityLocations, nextPageToken = '') => {
  const parameters = {
    'baseUrl': 'https://maps.googleapis.com/maps/api/place/nearbysearch/',
    'type': 'json',
    'location': cityLocations['position']['latitude'] + ',' + cityLocations['position']['longitude'],
    'radius': getRadius(261850000),
    'key': 'AIzaSyB0H_yqojwEFW99CxmdHYNkROoGAs2qrz4'
  };

  const newData = await fetch(createUrl(parameters, nextPageToken))
   .then( data => data.json() )
   .then( (data) => {
     return data;
   });

  return { results: newData.results, nextPageToken: newData.next_page_token };
};

module.exports = collect;
