'use strict';
const NeeoApi = require('neeo-sdk');
const BraviaController = require('./lib/braviaController');
const adapterName = 'Bravia TV IP-Controller';
const driverVersion = 1;
console.log('Initialize Neeo Adapter: ' + adapterName + '(Version: ' + driverVersion + ')');
console.log('-------------------------------------------------');

let braviaDevice = NeeoApi.buildDevice(adapterName);
braviaDevice.setDriverVersion(driverVersion)
braviaDevice.setManufacturer('Sony')
             .addAdditionalSearchToken('Bravia REST-API')
             .setType('TV');
console.log('- initialize buttons');
for (let [key, value] of BraviaController.tvButtonMappings) {
    //console.debug('add button with key: \'' + key + '\' and label: \'' + value.label + '\'');
    braviaDevice.addButton({name: key, label: value.label });
}
braviaDevice.addButtonHander(BraviaController.braviaButtonPressed);
braviaDevice.registerInitialiseFunction(BraviaController.initDeviceDiscovering);
braviaDevice.registerDeviceSubscriptionHandler (
    {
        deviceAdded: (deviceId) => BraviaController.registerDevice(deviceId),
        deviceRemoved: (deviceId) => BraviaController.deRegisterDevice(deviceId),
        initializeDeviceList: (deviceIds) => console.debug('existing devices', deviceIds),
    }
);
braviaDevice.enableRegistration(
    {
        type: 'SECURITY_CODE',
        headerText: 'DEVICE REGISTRATION',
        description: 'Please enter the pairing code of your device',
    },
    {
        register: (securityCode) => {
            console.log ('Code', securityCode);
            BraviaController.addDeviceCode(securityCode)},
        isRegistered: () => {console.log('isRegistered')},
    }
);
braviaDevice.enableDiscovery(
    {
        headerText: 'Sony Bravia IP-Controller integration',
        description: 'Compatible Sony Bravia TVs are auto discovered in your local network. Press Next when ready, to select your device. ',
        enableDynamicDeviceBuilder: false,
    },
    function(optionalDeviceId) {
        console.log('optionalDeviceId: ' + optionalDeviceId);
        return BraviaController.discoveredDevices();
    }
);
module.exports = braviaDevice;