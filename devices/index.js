'use strict';
const neeoAPI = require('neeo-sdk');
const braviaController = require('../lib/braviaController');
const adapterName = 'Bravia TV IP-Controller';
const driverVersion = 1;

const registrationInstructions = {
    headerText: 'Enter Preshared pairing key',
    description: 'To establish a connection to the Sony Bravia, you need to create a preshared pairing key on your Bravia TV. '
};

const discoveryInstructions = {
    headerText: 'Sony Bravia IP-Controller integration',
    description: 'Compatible Sony Bravia TVs are auto discovered in your local network. Press Next when ready, to select your device.'
};

console.log('Initialize Neeo Adapter: ' + adapterName + '(Version: ' + driverVersion + ')');
console.log('-------------------------------------------------');

function buildDevice() {
    let device = neeoAPI.buildDevice(adapterName);
    device.setDriverVersion(driverVersion)
    device.setManufacturer('Sony')
        .addAdditionalSearchToken('Bravia REST-API')
        .setType('TV');
    console.log('- initialize buttons');
    for (let [key, value] of braviaController.tvButtonMappings) {
        console.debug('add button with key: \'' + key + '\' and label: \'' + value.label + '\'');
        device.addButton({name: key, label: value.label });
    }
    device.addButtonHander(braviaController.braviaButtonPressed);
    device.registerInitialiseFunction(braviaController.init);
    device.registerDeviceSubscriptionHandler (
        {
            deviceAdded: (deviceId) => braviaController.registerDevice(deviceId),
            deviceRemoved: (deviceId) => braviaController.deRegisterDevice(deviceId)
        }
    );
    device.enableRegistration(
        {
            type: 'SECURITY_CODE',
            headerText: registrationInstructions.headerText,
            description: registrationInstructions.description,
        },
        {
            register: (securityCode) => {
                console.debug ('Preshared auth key:', securityCode);
                braviaController.addDeviceCode(securityCode)},
            isRegistered: () => { console.debug('isRegistered') },
        }
    );
    device.enableDiscovery(
        {
            headerText: discoveryInstructions.headerText,
            description: discoveryInstructions.description ,
            enableDynamicDeviceBuilder: false,
        },
        function(optionalDeviceId) {
            return braviaController.discoveredDevices();
        }
    );
    return device;
}
module.exports = {
    devices: [
        buildDevice(),
    ],
};