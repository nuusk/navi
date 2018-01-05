const placeExplorer = require('./placeSearch');
const createDivisions = require('./createDivisions');

const explorer = async (cityLocations) => {
  let nextPageToken = '';// 'CpQCDwEAAFU2N6yKN638gFVL0AFDWFCvrmKW3lPfFTf843_-eQebRX_1xliYhNbcFJPK4jEVLWzEzsZH7QhpIS__vy-eZTa-NJE6qsGv6W7LeFVu-ENRD_hCFgTy-YxXEcHIX7CnfV3qgSMRZJ1mTlmC2Wt4yoOT2N6IHLZPAoGIXAsPUfc3sFVkrL_KWgyO92BcPSklmXXFXVMEsb2NhlIn9MeaMTe92CEKKvodk7T8_nr6Ue6hmmSS_AgKVLOEqRgLC5DbIuMk36_dTT-n8QhBO24pZvosHr1sNuAXAUzyfitcgAGWoVVPzn8qsfhSXRUN-X4-QWNOfI7Xq9yA5RKILiWOhV6Xd3p7nOrPInxD9SmuuoozEhDQOQqMECC7s-iGB4CfOCamGhSNmpGOk_vYvomsJ1tYZSP_Tszk0w';
  let cs = 0;
  do {

    const data = await placeExplorer(cityLocations, nextPageToken);

    const results = data.results;
    if(results.length==0) {
      console.log(data);
    }
    nextPageToken = data.nextPageToken;

    results.forEach( (e) => {
      console.log(e);
      for(let i =0; i < 10000000000/20; i++){}; // Wait for Google Api
      // db.insert(`places/${e.id}`, e);

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

  } while( cs++ < 2 );
};

let i = 0;

createDivisions.divisionsCenter(52.40692, 16.92993, 20, 20, 7000)
  .forEach( (array) => {
    array.forEach( (position) => {
      if(i>=0 && i < 3){
        console.log(position);
        explorer(position);
      }
      i++;
    });
  });
