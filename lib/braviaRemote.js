'use strict';
const braviaRemoteControl = require('sony-bravia-tv-remote');
const braviaEndpointAppControl = '/sony/appControl';

function getRemote(device) {
    return new braviaRemoteControl(device.host, device.port, device.code);
}

module.exports.sendCommand = function(device, command) {
    getRemote(device).sendAction(command);
};

module.exports.sendIRCCSignal = function(device, irccSignal) {
    getRemote(device).sendIRCCSignal(irccSignal);
};

module.exports.launchApp = function(device, app) {
    getRemote(device).sendHTTPRequest(this.getRequestOptions(braviaEndpointAppControl), JSON.stringify(getLaunchAppBody(app)));
};

function getRequestOptions(endpoint) {
    return {
        hostname: this.host,
        port: this.port,
        path: endpoint,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-psk': this.code
        }
    }
}

function getLaunchAppBody(app) {
    return {
        method: 'setActiveApp',
        id: 99,
        params: [{
            uri: app
        }],
        version: '1.0'
    }
}