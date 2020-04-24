'use strict';
const logger = require('./logger');
const constantsNeeo = require('./constantsNeeo');
const constantsBravia = require('./constantsBravia');
const braviaRemote = require('./braviaRemote');
const cacheManager = require('./persistencyCacheManager');
const buttonConfig = require('./buttonConfig');
const Bravia = require('bravia'); // class Bravia
let deviceCode;

function discoverDevices() {
    let timeout = 3000;
    return Bravia.discover(timeout)
        .then(devices => {
            for (let d in devices) {
                const device = devices[d];
                const deviceId = device.UDN;
                cacheManager.getRegisteredDevice(deviceId).then((registeredDevice) => {
                    if(registeredDevice != null && registeredDevice.host !== device.host) {
                        registeredDevice.host = device.host;
                        cacheManager.addRegisteredDevice(deviceId, registeredDevice)
                    }
                }).catch((msg) => { console.debug(msg) });
                cacheManager.addDiscoveredDevice(deviceId, device);
            }
        })
        .catch((error) => logger.error(error));
}

function asDeviceName(device) {
    return device.modelName + ' (' + device.friendlyName + ')';
}

function buttonPressed(name, deviceId) {

}
module.exports.init = function() {
    const staticDevices = false;
    cacheManager.init().then(() => {
        discoverDevices().then(() => {
            if(staticDevices === false) {
                setInterval(discoverDevices, 10000);
            }
        })
    }).catch((error) => logger.error(error));
};

module.exports.braviaButtonPressed = function braviaButtonPressed(name, deviceId) {
    const button = buttonConfig.tvButtonsMapping.get(name);
    cacheManager.getRegisteredDevice(deviceId).then((braviaDevice) => {
        if(button.braviaFunc != null) {
            braviaRemote.sendCommand(braviaDevice, button.braviaFunc);
        } else if(button.irccCode != null) {
            braviaRemote.sendIRCCSignal(braviaDevice, button.irccCode);
        } else if(button.launchApp != null) {
            braviaRemote.launchApp(braviaDevice, button.launchApp);
        }
        logger.debug('Key, NEEO(' + name + ')');
    }).catch((msg) => console.error(msg));
};

module.exports.discoveredDevices = function() {
    let discovered = [];
    for (const [id, device] of cacheManager.getDiscoveredDevices().entries()) {
        const deviceName = asDeviceName(device);
        logger.info('discovered device: ' + deviceName);
        discovered.push({id: id, name: asDeviceName(device), reachable: true});
    }
    return discovered;
};

module.exports.addDeviceCode = function(credentials) {
    deviceCode = credentials.securityCode;
};

module.exports.registerDevice = function (deviceId) {
    cacheManager.getDiscoveredDevice(deviceId).then((device) => {
        device.code = deviceCode;
        cacheManager.addRegisteredDevice(deviceId, device).then(() => {
            logger.info('registered device with id', deviceId);
            deviceCode = null;
        });
    }).catch((error) => logger.error(error));
};

module.exports.deRegisterDevice = function (deviceId) {
    cacheManager.removeRegisteredDevice(deviceId).then(() => {
        logger.debug('removed registered device with id:', deviceId);
    }).catch((error) => logger.error(error));
};

module.exports.getDiscoveredDevice = function(deviceId) {
    return cacheManager.getDiscoveredDevice(deviceId);
};

module.exports.getRegisteredDevice = function(deviceId) {
    return cacheManager.getRegisteredDevice(deviceId);
};
