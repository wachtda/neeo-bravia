'use strict';
const storage = require('node-persist');
const registeredStorage = storage.create();

const discoveredCache = new Map();
const registeredCache = new Map();

function init() {
    discoveredCache.clear();
    registeredCache.clear();
    return new Promise((resolve, reject) => {
        registeredStorage.init().then(registeredStorage.forEach(function (entry) { registeredCache.set(entry.key, entry.value); }).then(resolve).catch(reject))});
}

function clearRegisteredStorage() {
    return new Promise((resolve, reject) => {
        registeredStorage.clear().then(() => { registeredCache.clear() }).then(resolve).catch(reject)});
}

module.exports.getDiscoveredCacheSize = function () {
    return discoveredCache.size;
}
module.exports.getRegisteredCacheSize = function () {
    return registeredCache.size;
}

module.exports.RegisteredStorage = registeredStorage;

module.exports.init = function () {
    return init().then(() => console.debug('initialized CacheManager'));
};

module.exports.clearRegisteredStorage = function () {
    return clearRegisteredStorage().then(() => console.debug('cleared storage for registered devices'));
};

module.exports.addDiscoveredDevice = function (deviceId, device) {
    discoveredCache.set(deviceId, device);
};

module.exports.addRegisteredDevice = function (deviceId, device) {
    registeredCache.set(deviceId, device);
    return registeredStorage.set(deviceId, device);
};

module.exports.removeRegisteredDevice = function (deviceId) {
    return registeredStorage.removeItem(deviceId).then(() => {
        registeredCache.delete(deviceId);
    });
};

module.exports.getDiscoveredDevice = function (deviceId) {
    return new Promise(function(resolve, reject) {
        console.debug('get discovered device for id', deviceId);
        const device = discoveredCache.get(deviceId);
        if(device != null) {
            console.debug('found device', device);
            resolve(device)
        } else {
            reject('no device found for deviceId: ' + deviceId);
        }
    });
};

module.exports.getRegisteredDevice = async function (deviceId) {
    return new Promise(function(resolve, reject) {
        let device;
        if(registeredCache.has(deviceId)) {
            const device = registeredCache.get(deviceId);
            resolve(device);
        } else {
            registeredStorage.get(deviceId).then((d) => {
                if(d != null) {
                    registeredCache.set(deviceId, d);
                    resolve(d);
                } else {
                    reject('no device found for deviceId: ' + deviceId);
                }
            });
        }
    })
};

module.exports.getDiscoveredDevices = function () {
    return discoveredCache;
};

module.exports.getRegisteredDevices = function () {
    return registeredCache;
};