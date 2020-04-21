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
    return discoveredCache.get(deviceId);
};

module.exports.getRegisteredDevice = function (deviceId) {
    return new Promise(function(resolve) {
        let device;
        if(registeredCache.has(deviceId)) {
            const device = registeredCache.get(deviceId);
            resolve(device);
        } else {
            registeredStorage.get(deviceId).then((d) => {
                registeredCache.set(deviceId, d);
                resolve(d);
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