'use strict';
const neeoapi = require('neeo-sdk');
const controller = require('./lib/braviaController');
const adapterName = 'Bravia TV IP-Controller';
const driverVersion = 1;
console.log('Initialize Neeo Adapter: ' + adapterName + '(Version: ' + driverVersion + ')');
console.log('-------------------------------------------------');

let braviaDevice = neeoapi.buildDevice(adapterName);
braviaDevice.setDriverVersion(driverVersion)
braviaDevice.setManufacturer('Sony')
             .addAdditionalSearchToken('Bravia REST-API')
             .setType('TV');
console.log('- initialize buttons');
for (let [key, value] of controller.tvButtonMappings) {
    //console.debug('add button with key: \'' + key + '\' and label: \'' + value.label + '\'');
    braviaDevice.addButton({name: key, label: value.label });
}
braviaDevice.addButtonHander(controller.braviaButtonPressed);

braviaDevice.registerDeviceSubscriptionHandler (
    {
        deviceAdded: (deviceId) => console.debug('device added', deviceId),
        deviceRemoved: (deviceId) => console.debug('device removed', deviceId),
        initializeDeviceList: (deviceIds) => console.debug('existing devices', deviceIds),
    }
);
braviaDevice.enableDiscovery(
    {
        headerText: 'HELLO HEADER',
        description: 'ADD SOME ADDITIONAL INFORMATION HOW TO PREPARE YOUR DEVICE',
        enableDynamicDeviceBuilder: false,
    },
    function(optionalDeviceId) {
        Promise.all([controller.discoveredDevices()]).then(function(values) {
            return values;
        });
    }
);
module.exports = braviaDevice;