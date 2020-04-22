'use strict';
const logger = require('./logger');
const constantsNeeo = require('./constantsNeeo');
const constantsBravia = require('./constantsBravia');
const braviaRemote = require('./braviaRemote');
const cacheManager = require('./persistencyCacheManager');
const Bravia = require('bravia'); // class Bravia
let deviceCode;

function tvButtonMappings() {
    let buttons = new Map();
    // NEEO BUTTONS
    buttons.set(constantsNeeo.BTN_NEEO_POWER_ON, { label: 'Power On', braviaFunc: constantsBravia.FUNC_POWER_ON });
    buttons.set(constantsNeeo.BTN_NEEO_POWER_OFF, { label: 'Power Off', braviaFunc: constantsBravia.FUNC_POWER_OFF });
    buttons.set(constantsNeeo.BTN_NEEO_CURSOR_LEFT, { label: 'Left', braviaFunc: constantsBravia.FUNC_LEFT });
    buttons.set(constantsNeeo.BTN_NEEO_CURSOR_RIGHT, { label: 'Right', braviaFunc: constantsBravia.FUNC_RIGHT });
    buttons.set(constantsNeeo.BTN_NEEO_CURSOR_DOWN, { label: 'Down', braviaFunc: constantsBravia.FUNC_DOWN });
    buttons.set(constantsNeeo.BTN_NEEO_CURSOR_UP, { label: 'Up', braviaFunc: constantsBravia.FUNC_UP });
    buttons.set(constantsNeeo.BTN_NEEO_CURSOR_ENTER, { label: 'Enter', braviaFunc: constantsBravia.FUNC_ENTER });
    buttons.set(constantsNeeo.BTN_NEEO_MUTE, { label: 'Mute', braviaFunc: constantsBravia.FUNC_MUTE });
    buttons.set(constantsNeeo.BTN_NEEO_VOLUME_UP, { label: 'Volume Up', braviaFunc: constantsBravia.FUNC_VOLUME_UP });
    buttons.set(constantsNeeo.BTN_NEEO_VOLUME_DOWN, { label: 'Volume Down', braviaFunc: constantsBravia.FUNC_VOLUME_DOWN });
    buttons.set(constantsNeeo.BTN_NEEO_CHANNEL_UP, { label: 'Channel Up', braviaFunc: constantsBravia.FUNC_CHANNEL_UP });
    buttons.set(constantsNeeo.BTN_NEEO_CHANNEL_DOWN, { label: 'Channel Down', braviaFunc: constantsBravia.FUNC_CHANNEL_DOWN });
    buttons.set(constantsNeeo.BTN_NEEO_MENU, { label: 'Menu', braviaFunc: constantsBravia.FUNC_HOME });
    buttons.set(constantsNeeo.BTN_NEEO_GUIDE, { label: 'Guide', braviaFunc: constantsBravia.FUNC_GUIDE });
    buttons.set(constantsNeeo.BTN_NEEO_BACK, { label: 'Back', braviaFunc: constantsBravia.FUNC_RETURN });
    buttons.set(constantsNeeo.BTN_NEEO_EXIT, { label: 'Exit', braviaFunc: constantsBravia.FUNC_HOME });
    buttons.set(constantsNeeo.BTN_NEEO_FUNCTION_RED, { label: 'Red', braviaFunc: constantsBravia.FUNC_RED });
    buttons.set(constantsNeeo.BTN_NEEO_FUNCTION_GREEN, { label: 'Green', braviaFunc: constantsBravia.FUNC_GREEN });
    buttons.set(constantsNeeo.BTN_NEEO_FUNCTION_YELLOW, { label: 'Yellow', braviaFunc: constantsBravia.FUNC_YELLOW });
    buttons.set(constantsNeeo.BTN_NEEO_FUNCTION_BLUE, { label: 'Blue', braviaFunc: constantsBravia.FUNC_BLUE });
    buttons.set(constantsNeeo.BTN_NEEO_DIGIT_0, { label: '0', braviaFunc: constantsBravia.FUNC_DIGIT_0 });
    buttons.set(constantsNeeo.BTN_NEEO_DIGIT_1, { label: '1', braviaFunc: constantsBravia.FUNC_DIGIT_1 });
    buttons.set(constantsNeeo.BTN_NEEO_DIGIT_2, { label: '2', braviaFunc: constantsBravia.FUNC_DIGIT_2 });
    buttons.set(constantsNeeo.BTN_NEEO_DIGIT_3, { label: '3', braviaFunc: constantsBravia.FUNC_DIGIT_3 });
    buttons.set(constantsNeeo.BTN_NEEO_DIGIT_4, { label: '4', braviaFunc: constantsBravia.FUNC_DIGIT_4 });
    buttons.set(constantsNeeo.BTN_NEEO_DIGIT_5, { label: '5', braviaFunc: constantsBravia.FUNC_DIGIT_5 });
    buttons.set(constantsNeeo.BTN_NEEO_DIGIT_6, { label: '6', braviaFunc: constantsBravia.FUNC_DIGIT_6 });
    buttons.set(constantsNeeo.BTN_NEEO_DIGIT_7, { label: '7', braviaFunc: constantsBravia.FUNC_DIGIT_7 });
    buttons.set(constantsNeeo.BTN_NEEO_DIGIT_8, { label: '8', braviaFunc: constantsBravia.FUNC_DIGIT_8 });
    buttons.set(constantsNeeo.BTN_NEEO_DIGIT_9, { label: '9', braviaFunc: constantsBravia.FUNC_DIGIT_9 });
    // BRAVIA BUTTTONS
    buttons.set(constantsNeeo.BTN_BRAVIA_INPUT_TV, { label: 'TV', braviaFunc: constantsBravia.FUNC_INPUT_TV });
    buttons.set(constantsNeeo.BTN_BRAVIA_INPUT_RADIO, { label: 'Radio', braviaFunc: constantsBravia.FUNC_INPUT_RADIO });
    buttons.set(constantsNeeo.BTN_BRAVIA_INPUT, { label: 'Input', braviaFunc: constantsBravia.FUNC_INPUT });
    buttons.set(constantsNeeo.BTN_BRAVIA_INPUT_HDMI1, { label: 'HDMI 1', braviaFunc: constantsBravia.FUNC_INPUT_HDMI1 });
    buttons.set(constantsNeeo.BTN_BRAVIA_INPUT_HDMI2, { label: 'HDMI 2', braviaFunc: constantsBravia.FUNC_INPUT_HDMI2 });
    buttons.set(constantsNeeo.BTN_BRAVIA_INPUT_HDMI3, { label: 'HDMI 3', braviaFunc: constantsBravia.FUNC_INPUT_HDMI3 });
    buttons.set(constantsNeeo.BTN_BRAVIA_INPUT_HDMI4, { label: 'HDMI 4', braviaFunc: constantsBravia.FUNC_INPUT_HDMI4 });
    buttons.set(constantsNeeo.BTN_BRAVIA_STOP, { label: 'Stop', braviaFunc: constantsBravia.FUNC_STOP });
    buttons.set(constantsNeeo.BTN_BRAVIA_ENTER, { label: 'Enter', braviaFunc: constantsBravia.FUNC_ENTER });
    buttons.set(constantsNeeo.BTN_BRAVIA_PLAY, { label: 'Play', braviaFunc: constantsBravia.FUNC_PLAY });
    buttons.set(constantsNeeo.BTN_BRAVIA_PAUSE, { label: 'Pause', braviaFunc: constantsBravia.FUNC_PAUSE });
    buttons.set(constantsNeeo.BTN_BRAVIA_RECORD, { label: 'Rec', braviaFunc: constantsBravia.FUNC_REC });
    buttons.set(constantsNeeo.BTN_BRAVIA_SKIP_BACKWARD, { label: 'Skip Back', braviaFunc: constantsBravia.FUNC_SKIP_BACKWARD });
    buttons.set(constantsNeeo.BTN_BRAVIA_SKIP_FORWARD, { label: 'Skip Forward', braviaFunc: constantsBravia.FUNC_SKIP_FORWARD });
    buttons.set(constantsNeeo.BTN_BRAVIA_FORWARD, { label: 'Forward', braviaFunc: constantsBravia.FUNC_FORWARD });
    buttons.set(constantsNeeo.BTN_BRAVIA_REVERSE, { label: 'Reverse', braviaFunc: constantsBravia.FUNC_REVERSE });
    buttons.set(constantsNeeo.BTN_BRAVIA_NETFLIX, { label: 'Netflix', braviaFunc: constantsBravia.FUNC_NETFLIX });
    buttons.set(constantsNeeo.BTN_BRAVIA_GOOGLE_PLAY, { label: 'Goole Play', irccCode: 'AAAAAgAAAMQAAABGAw==' });
    buttons.set(constantsNeeo.BTN_BRAVIA_DISNEY, { label: 'Disney+', launchApp: 'com.sony.dtv.com.disney.disneyplus.com.bamtechmedia.dominguez.main.MainActivity' });

    return buttons;
}

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

module.exports.tvButtonMappings = tvButtonMappings();
module.exports.braviaButtonPressed = function braviaButtonPressed(name, deviceId) {
    const button = tvButtonMappings().get(name);
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
