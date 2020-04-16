'use strict';

const neeoapi = require('neeo-sdk');
const controller = require('./controller');
const adapterName = 'Bravia TV IP-Controller';
console.log('Initialize Neeo Adapter: ' + adapterName);
console.log('------------------------------------------------');

const braviatv = neeoapi.buildDevice(adapterName)
    .setManufacturer('Sony')
    .addAdditionalSearchToken('Bravia REST-API')
    .setType('TV')
    .addButton({ name: 'POWER ON', label: 'Power On' }, controller.button)
    .addButton({ name: 'POWER OFF', label: 'Power Off' }, controller.button)
    .addButton({ name: 'CURSOR LEFT', label: 'Left' }, controller.button)
    .addButton({ name: 'CURSOR RIGHT', label: 'Right' }, controller.button)
    .addButton({ name: 'CURSOR UP', label: 'Up'} , controller.button)
    .addButton({ name: 'CURSOR DOWN', label: 'Down' }, controller.button)
    .addButton({ name: 'INPUT HDMI 1', label: 'HDMI 1' }, controller.button)
    .addButton({ name: 'INPUT HDMI 2', label: 'HDMI 2' }, controller.button)
    .addButton({ name: 'INPUT HDMI 3', label: 'HDMI 3' }, controller.button)
    .addButton({ name: 'INPUT HDMI 4', label: 'HDMI 4' }, controller.button)
    .addButton({ name: 'HOME', label: 'Home' }, controller.button)
    .addButton({ name: 'MUTE TOGGLE', label: 'Mute' }, controller.button)
    .addButton({ name: 'VOLUME UP', label: 'Volume Up' }, controller.button)
    .addButton({ name: 'VOLUME DOWN', label: 'Volume Down' }, controller.button)
    .addButton({ name: 'BACK', label: 'Back' }, controller.button)
    .addButton({ name: 'STOP', label: 'Stop' }, controller.button)
    .addButton({ name: 'ENTER', label: 'Enter' }, controller.button)
    .addButton({ name: 'PLAY', label: 'Play' }, controller.button)
    .addButton({ name: 'PAUSE', label: 'Pause' }, controller.button)
    .addButton({ name: 'RECORD', label: 'Rec' }, controller.button)
    .addButton({ name: 'SKIP BACKWARD', label: 'Skip Backward' }, controller.button)
    .addButton({ name: 'SKIP FORWARD', label: 'Skip Forward' }, controller.button)
    .addButton({ name: 'FORWARD', label: 'Forward' }, controller.button)
    .addButton({ name: 'REVERSE', label: 'Reverse' }, controller.button)
    .addButton({ name: 'MENU', label: 'Menu' }, controller.button)
    .addButton({ name: 'CHANNEL UP', label: 'Channel Up' }, controller.button)
    .addButton({ name: 'CHANNEL DOWN', label: 'Channel Down' }, controller.button)
    .addButton({ name: 'FUNCTION RED', label: 'Red' }, controller.button)
    .addButton({ name: 'FUNCTION GREEN', label: 'Green' }, controller.button)
    .addButton({ name: 'FUNCTION YELLOW', label: 'Yellow' }, controller.button)
    .addButton({ name: 'FUNCTION BLUE', label: 'Blue' }, controller.button)
    .addButton({ name: 'DIGIT 0', label: '0' }, controller.button)
    .addButton({ name: 'DIGIT 1', label: '2' }, controller.button)
    .addButton({ name: 'DIGIT 2', label: '3' }, controller.button)
    .addButton({ name: 'DIGIT 3', label: '4' }, controller.button)
    .addButton({ name: 'DIGIT 4', label: '5' }, controller.button)
    .addButton({ name: 'DIGIT 5', label: '5' }, controller.button)
    .addButton({ name: 'DIGIT 6', label: '6' }, controller.button)
    .addButton({ name: 'DIGIT 7', label: '7' }, controller.button)
    .addButton({ name: 'DIGIT 8', label: '8' }, controller.button)
    .addButton({ name: 'DIGIT 9', label: '9' }, controller.button)
    .addButton({ name: 'INPUT TV', label: 'TV' }, controller.button)
    .addButton({ name: 'RADIO', label: 'RADIO' }, controller.button)
    .addButton({ name: 'GUIDE', label: 'Guide' }, controller.button)
    .addButton({ name: 'INPUT', label: 'Input' }, controller.button)
    .addButton({ name: 'NETFLIX', label: 'Netflix' }, controller.button)
    .addButtonHander(controller.braviaButtonPressed);

function startSdkExample(brain) {
  console.log('- Start server');
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

const brainIp = process.env.BRAINIP;
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