'use strict';
const neeoAPI = require('neeo-sdk');
const braviaController = require('../lib/braviaController');
const adapterName = 'Bravia TV IP-Controller';
const driverVersion = 1;

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
            deviceRemoved: (deviceId) => braviaController.deRegisterDevice(deviceId),
            initializeDeviceList: (deviceIds) => console.debug('existing devices', deviceIds),
        }
    );
    device.enableRegistration(
        {
            type: 'SECURITY_CODE',
            headerText: 'DEVICE REGISTRATION',
            description: 'Please enter the pairing code of your device',
        },
        {
            register: (securityCode) => {
                console.log ('Code', securityCode);
                braviaController.addDeviceCode(securityCode)},
            isRegistered: () => {console.log('isRegistered')},
        }
    );
    device.enableDiscovery(
        {
            headerText: 'Sony Bravia IP-Controller integration',
            description: 'Compatible Sony Bravia TVs are auto discovered in your local network. Press Next when ready, to select your device. ',
            enableDynamicDeviceBuilder: false,
        },
        function(optionalDeviceId) {
            console.log('optionalDeviceId: ' + optionalDeviceId);
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