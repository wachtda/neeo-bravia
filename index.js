'use strict';
const neeoApi = require('neeo-sdk');

const braviaSettings = {
  ip: '192.168.1.2',
  port: 80,
  token: '1111'
};

const BraviaRemoteControl  = require('sony-bravia-tv-remote');
const braviaRemote = new BraviaRemoteControl(braviaSettings.ip, braviaSettings.port, braviaSettings.token);

let braviaDevice;
braviaDevice = neeoApi.buildDevice('Sony Bravia IP-Controller');
braviaDevice.setType('TV');
braviaDevice.setManufacturer('Sony');
braviaDevice.addAdditionalSearchToken('Bravia REST-API');
braviaDevice.addButton({ name: 'launch-netflix', label: 'Netflix' });

braviaDevice.addButtonHandler((buttonName, deviceId) => {
  console.log(`[CONTROLLER] ${buttonName} button pressed`);
  if (buttonName == 'launch-netflix') {
      braviaRemote.sendAction('Netflix');
  }
});

const neeoSettings = {
  brain: '10.2.1.64',
  port: 1104,
  name: 'neeo-bravia-driver',
  devices: [braviaDevice]
};

console.log('initialize neeo driver: ' + braviaDevice.devicename);
console.log('try to connect to brain with settings: ' + neeoSettings.brain + ':' + neeoSettings.port);
// use neeo CLI instead of startServer!
neeoApi.startServer(neeoSettings)
  .then(() => {
    console.log('# READY! use the NEEO app to search for: ' + braviaDevice.devicename);
  })
  .catch(err => {
    console.error('ERROR!', err);
    process.exit(1);
  });