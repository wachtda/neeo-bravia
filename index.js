'use strict';
const neeoapi = require('neeo-sdk');
const controller = require('./controller');
const adapterName = 'Bravia TV IP-Controller';
console.log('Initialize Neeo Adapter: ' + adapterName);
console.log('-------------------------------------------------');

let deviceBuilder = neeoapi.buildDevice(adapterName)
    .setManufacturer('Sony')
    .addAdditionalSearchToken('Bravia REST-API')
    .setType('TV');
console.log('- initialize buttons');
for (let [key, value] of controller.tvButtonMappings) {
    console.debug('add button with key: \'' + key + '\' and label: \'' + value.label + '\'');
    deviceBuilder.addButton({name: key, label: value.label });
}
const braviatv = deviceBuilder.addButtonHander(controller.braviaButtonPressed);

function startSdkExample(brain) {
  console.log('- start server');
  neeoapi.startServer({
    brain,
    port: 6336,
    name: 'simple-adapter-one',
    devices: [braviatv]
    //if you have more than one device they are defined as per below
    //devices: [braviatv, braviatv2]
  })
      .then(() => {
        console.log('# READY! use the NEEO app to search for "Sony Bravia".');
      })
      .catch((error) => {
        //if there was any error, print message out to console
        console.error('ERROR!', error.message);
        process.exit(1);
      });
}

const brainIp = process.env.NEEO_BRAIN_IP;
if (brainIp) {
  console.log('- use NEEO Brain IP from env variable', brainIp);
  startSdkExample(brainIp);
} else {
  console.log('- discover one NEEO Brain...');
  neeoapi.discoverOneBrain(true)
      .then((brain) => {
        console.log('- Brain discovered:', brain.name);
        startSdkExample(brain);
      });
}