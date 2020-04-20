'use strict';
const ConstantsNeeo = require('./constantsNeeo');
const ConstantsBravia = require('./constantsBravia');
const BraviaRemote = require('./braviaRemote');
const PersistencyCacheManager = require('./persistencyCacheManager');
const Bravia = require('bravia');
let deviceCode;

function tvButtonMappings() {
    let buttons = new Map();
    // NEEO BUTTONS
    buttons.set(ConstantsNeeo.BTN_NEEO_POWER_ON, { label: 'Power On', braviaFunc: ConstantsBravia.FUNC_POWER_ON });
    buttons.set(ConstantsNeeo.BTN_NEEO_POWER_OFF, { label: 'Power Off', braviaFunc: ConstantsBravia.FUNC_POWER_OFF });
    buttons.set(ConstantsNeeo.BTN_NEEO_CURSOR_LEFT, { label: 'Left', braviaFunc: ConstantsBravia.FUNC_LEFT });
    buttons.set(ConstantsNeeo.BTN_NEEO_CURSOR_RIGHT, { label: 'Right', braviaFunc: ConstantsBravia.FUNC_RIGHT });
    buttons.set(ConstantsNeeo.BTN_NEEO_CURSOR_DOWN, { label: 'Down', braviaFunc: ConstantsBravia.FUNC_DOWN });
    buttons.set(ConstantsNeeo.BTN_NEEO_CURSOR_UP, { label: 'Up', braviaFunc: ConstantsBravia.FUNC_UP });
    buttons.set(ConstantsNeeo.BTN_NEEO_CURSOR_ENTER, { label: 'Enter', braviaFunc: ConstantsBravia.FUNC_ENTER });
    buttons.set(ConstantsNeeo.BTN_NEEO_MUTE, { label: 'Mute', braviaFunc: ConstantsBravia.FUNC_MUTE });
    buttons.set(ConstantsNeeo.BTN_NEEO_VOLUME_UP, { label: 'Volume Up', braviaFunc: ConstantsBravia.FUNC_VOLUME_UP });
    buttons.set(ConstantsNeeo.BTN_NEEO_VOLUME_DOWN, { label: 'Volume Down', braviaFunc: ConstantsBravia.FUNC_VOLUME_DOWN });
    buttons.set(ConstantsNeeo.BTN_NEEO_CHANNEL_UP, { label: 'Channel Up', braviaFunc: ConstantsBravia.FUNC_CHANNEL_UP });
    buttons.set(ConstantsNeeo.BTN_NEEO_CHANNEL_DOWN, { label: 'Channel Down', braviaFunc: ConstantsBravia.FUNC_CHANNEL_DOWN });
    buttons.set(ConstantsNeeo.BTN_NEEO_MENU, { label: 'Menu', braviaFunc: ConstantsBravia.FUNC_HOME });
    buttons.set(ConstantsNeeo.BTN_NEEO_GUIDE, { label: 'Guide', braviaFunc: ConstantsBravia.FUNC_GUIDE });
    buttons.set(ConstantsNeeo.BTN_NEEO_BACK, { label: 'Back', braviaFunc: ConstantsBravia.FUNC_RETURN });
    buttons.set(ConstantsNeeo.BTN_NEEO_EXIT, { label: 'Exit', braviaFunc: ConstantsBravia.FUNC_HOME });
    buttons.set(ConstantsNeeo.BTN_NEEO_FUNCTION_RED, { label: 'Red', braviaFunc: ConstantsBravia.FUNC_RED });
    buttons.set(ConstantsNeeo.BTN_NEEO_FUNCTION_GREEN, { label: 'Green', braviaFunc: ConstantsBravia.FUNC_GREEN });
    buttons.set(ConstantsNeeo.BTN_NEEO_FUNCTION_YELLOW, { label: 'Yellow', braviaFunc: ConstantsBravia.FUNC_YELLOW });
    buttons.set(ConstantsNeeo.BTN_NEEO_FUNCTION_BLUE, { label: 'Blue', braviaFunc: ConstantsBravia.FUNC_BLUE });
    buttons.set(ConstantsNeeo.BTN_NEEO_DIGIT_0, { label: '0', braviaFunc: ConstantsBravia.FUNC_DIGIT_0 });
    buttons.set(ConstantsNeeo.BTN_NEEO_DIGIT_1, { label: '1', braviaFunc: ConstantsBravia.FUNC_DIGIT_1 });
    buttons.set(ConstantsNeeo.BTN_NEEO_DIGIT_2, { label: '2', braviaFunc: ConstantsBravia.FUNC_DIGIT_2 });
    buttons.set(ConstantsNeeo.BTN_NEEO_DIGIT_3, { label: '3', braviaFunc: ConstantsBravia.FUNC_DIGIT_3 });
    buttons.set(ConstantsNeeo.BTN_NEEO_DIGIT_4, { label: '4', braviaFunc: ConstantsBravia.FUNC_DIGIT_4 });
    buttons.set(ConstantsNeeo.BTN_NEEO_DIGIT_5, { label: '5', braviaFunc: ConstantsBravia.FUNC_DIGIT_5 });
    buttons.set(ConstantsNeeo.BTN_NEEO_DIGIT_6, { label: '6', braviaFunc: ConstantsBravia.FUNC_DIGIT_6 });
    buttons.set(ConstantsNeeo.BTN_NEEO_DIGIT_7, { label: '7', braviaFunc: ConstantsBravia.FUNC_DIGIT_7 });
    buttons.set(ConstantsNeeo.BTN_NEEO_DIGIT_8, { label: '8', braviaFunc: ConstantsBravia.FUNC_DIGIT_8 });
    buttons.set(ConstantsNeeo.BTN_NEEO_DIGIT_9, { label: '9', braviaFunc: ConstantsBravia.FUNC_DIGIT_9 });
    // BRAVIA BUTTTONS
    buttons.set(ConstantsNeeo.BTN_BRAVIA_INPUT_TV, { label: 'TV', braviaFunc: ConstantsBravia.FUNC_INPUT_TV });
    buttons.set(ConstantsNeeo.BTN_BRAVIA_INPUT_RADIO, { label: 'Radio', braviaFunc: ConstantsBravia.FUNC_INPUT_RADIO });
    buttons.set(ConstantsNeeo.BTN_BRAVIA_INPUT, { label: 'Input', braviaFunc: ConstantsBravia.FUNC_INPUT });
    buttons.set(ConstantsNeeo.BTN_BRAVIA_INPUT_HDMI1, { label: 'HDMI 1', braviaFunc: ConstantsBravia.FUNC_INPUT_HDMI1 });
    buttons.set(ConstantsNeeo.BTN_BRAVIA_INPUT_HDMI2, { label: 'HDMI 2', braviaFunc: ConstantsBravia.FUNC_INPUT_HDMI2 });
    buttons.set(ConstantsNeeo.BTN_BRAVIA_INPUT_HDMI3, { label: 'HDMI 3', braviaFunc: ConstantsBravia.FUNC_INPUT_HDMI3 });
    buttons.set(ConstantsNeeo.BTN_BRAVIA_INPUT_HDMI4, { label: 'HDMI 4', braviaFunc: ConstantsBravia.FUNC_INPUT_HDMI4 });
    buttons.set(ConstantsNeeo.BTN_BRAVIA_STOP, { label: 'Stop', braviaFunc: ConstantsBravia.FUNC_STOP });
    buttons.set(ConstantsNeeo.BTN_BRAVIA_ENTER, { label: 'Enter', braviaFunc: ConstantsBravia.FUNC_ENTER });
    buttons.set(ConstantsNeeo.BTN_BRAVIA_PLAY, { label: 'Play', braviaFunc: ConstantsBravia.FUNC_PLAY });
    buttons.set(ConstantsNeeo.BTN_BRAVIA_PAUSE, { label: 'Pause', braviaFunc: ConstantsBravia.FUNC_PAUSE });
    buttons.set(ConstantsNeeo.BTN_BRAVIA_RECORD, { label: 'Rec', braviaFunc: ConstantsBravia.FUNC_REC });
    buttons.set(ConstantsNeeo.BTN_BRAVIA_SKIP_BACKWARD, { label: 'Skip Back', braviaFunc: ConstantsBravia.FUNC_SKIP_BACKWARD });
    buttons.set(ConstantsNeeo.BTN_BRAVIA_SKIP_FORWARD, { label: 'Skip Forward', braviaFunc: ConstantsBravia.FUNC_SKIP_FORWARD });
    buttons.set(ConstantsNeeo.BTN_BRAVIA_FORWARD, { label: 'Forward', braviaFunc: ConstantsBravia.FUNC_FORWARD });
    buttons.set(ConstantsNeeo.BTN_BRAVIA_REVERSE, { label: 'Reverse', braviaFunc: ConstantsBravia.FUNC_REVERSE });
    buttons.set(ConstantsNeeo.BTN_BRAVIA_NETFLIX, { label: 'Netflix', braviaFunc: ConstantsBravia.FUNC_NETFLIX });
    buttons.set(ConstantsNeeo.BTN_BRAVIA_GOOGLE_PLAY, { label: 'Goole Play', irccCode: 'AAAAAgAAAMQAAABGAw==' });
    buttons.set(ConstantsNeeo.BTN_BRAVIA_DISNEY, { label: 'Disney+', launchApp: 'com.sony.dtv.com.disney.disneyplus.com.bamtechmedia.dominguez.main.MainActivity' });

    return buttons;
}

function asDeviceName(device) {
    return device.modelName + ' (' + device.friendlyName + ')';
}

function discoverDevices() {
    let timeout = 3000;
    Bravia.discover(timeout)
        .then(devices => {
            for (let device in devices) {
                const deviceId = devices[device].UDN;
                let registeredDevice = PersistencyCacheManager.getRegisteredDevice(deviceId);
                if(registeredDevice != null && registeredDevice.host != devices[device].host) {
                    registeredDevice.host = devices[device].host;
                    PersistencyCacheManager.addRegisteredDevice(deviceId, registeredDevice)
                }
                PersistencyCacheManager.addDiscoveredDevice(deviceId, devices[device])
            }
        })
        .catch(error => console.error(error));
}

module.exports.init = function() {
    const staticDevices = false;
    PersistencyCacheManager.init().then(() => {
        discoverDevices();
        if(staticDevices === false) {
            setInterval(discoverDevices, 30000);
        }
    })
};

module.exports.tvButtonMappings = tvButtonMappings();
module.exports.braviaButtonPressed = function braviaButtonPressed(name, deviceid) {
    const button = tvButtonMappings().get(name);
    const braviaDevice = PersistencyCacheManager.getRegisteredDevice(deviceid);
    if(button.braviaFunc != null) {
        BraviaRemote.sendCommand(braviaDevice, button.braviaFunc);
    } else if(button.irccCode != null) {
        BraviaRemote.sendIRCCSignal(braviaDevice, button.irccCode);
    } else if(button.launchApp != null) {
        BraviaRemote.launchApp(braviaDevice, button.launchApp);
    }
    console.debug('Key, NEEO(' + name + ')');
};

module.exports.discoveredDevices = function() {
    let discovered = [];
    PersistencyCacheManager.getDiscoveredDevices().forEach(function(key, device) {
        discovered.push({id: key, name: asDeviceName(device), reachable: true});
    });
    return discovered;
};

module.exports.addDeviceCode = function(credentials) {
    deviceCode = credentials.securityCode;
};

module.exports.registerDevice = function (deviceId) {
    // only one device can be registered
    // await registeredDevices.clear();
    let device = PersistencyCacheManager.getDiscoveredDevice(deviceId);
    device.code = deviceCode;
    PersistencyCacheManager.addRegisteredDevice(deviceId, device);
    deviceCode = null;
};

module.exports.deRegisterDevice = function (deviceId) {
    PersistencyCacheManager.removeRegisteredDevice(deviceId);
};

module.exports.getDiscoveredDevice = function(deviceId) {
    return PersistencyCacheManager.getDiscoveredDevice(deviceId);
};

module.exports.getRegisteredDevice = function(deviceId) {
    return PersistencyCacheManager.getRegisteredDevice(deviceId);
};
