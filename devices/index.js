'use strict';
const logger = require('../lib/logger');
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

logger.info('Initialize Neeo Adapter: ' + adapterName + '(Version: ' + driverVersion + ')');
logger.info('-------------------------------------------------');

function buildDevice() {
    let device = neeoAPI.buildDevice(adapterName);
    device.setDriverVersion(driverVersion)
    device.setManufacturer('Sony')
        .addAdditionalSearchToken('Bravia REST-API')
        .setType('TV');
    logger.info('- initialize buttons');
    for (let [key, value] of braviaController.tvButtonMappings) {
        logger.debug('add button with key: \'' + key + '\' and label: \'' + value.label + '\'');
        device.addButton({name: key, label: value.label });
    }
    device.addButtonHandler(braviaController.braviaButtonPressed);
    device.registerDeviceSubscriptionHandler (
        {
            deviceAdded: (deviceId) => braviaController.registerDevice(deviceId),
            deviceRemoved: (deviceId) => braviaController.deRegisterDevice(deviceId),
            initializeDeviceList: (deviceIds) => logger.debug('existing devices', deviceIds),
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
                logger.debug ('Preshared auth key:', securityCode);
                braviaController.addDeviceCode(securityCode)},
            isRegistered: () => { logger.debug('isRegistered') },
        }
    );
    device.enableDiscovery(
        {
            headerText: discoveryInstructions.headerText,
            description: discoveryInstructions.description ,
            enableDynamicDeviceBuilder: false,
        },
        function(optionalDeviceId) {
            const devices = braviaController.discoveredDevices();
            logger.debug('loaded devices for discovery');
            return devices;
        }
    );
    device.registerInitialiseFunction(braviaController.init);
    //braviaController.init();
    return device;
}
module.exports = {
    devices: [
        buildDevice(),
    ],
};