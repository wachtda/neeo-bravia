'use strict';
const Storage = require('node-persist');
const RegisteredStorage = Storage.create();

const NodeCache = require( "node-cache" );
const discoveredCache = new NodeCache();
const registeredCache = new NodeCache();

function init() {
    discoveredCache.flushAll();
    registeredCache.flushAll();

    return new Promise((resolve, reject) => {
        RegisteredStorage.init().then(RegisteredStorage.forEach(function (entry) { registeredCache.set(entry.key, entry.value); }).then(resolve).catch(reject))});
}

function clearRegisteredStorage() {
    return new Promise((resolve, reject) => {
        RegisteredStorage.clear().then(() => { registeredCache.flushAll() }).then(resolve).catch(reject)});
}

module.exports.getDiscoveredCacheSize = function () {
    return discoveredCache.keys().length;
}
module.exports.getRegisteredCacheSize = function () {
    return registeredCache.keys().length;
}

module.exports.RegisteredStorage = RegisteredStorage;

module.exports.init = function () {
    return init().then(() => console.debug('initialized CacheManager'));
};

module.exports.clearRegisteredStorage = function () {
    return clearRegisteredStorage().then(() => console.debug('cleared storage for registered devices'));
};

module.exports.addDiscoveredDevice = function (deviceId, device) {
    discoveredCache.set(deviceId, device);
};

module.exports.removeDiscoveredDevice = function (deviceId) {
    discoveredCache.del(deviceId);
};

module.exports.addRegisteredDevice = function (deviceId, device) {
    registeredCache.set(deviceId, device);
    RegisteredStorage.set(deviceId, device);
};

module.exports.removeRegisteredDevice = function (deviceId) {
    return RegisteredStorage.removeItem(deviceId).then(() => {
        registeredCache.del(deviceId);
    });
};

module.exports.getDiscoveredDevice = function (deviceId) {
    return discoveredCache.get(deviceId);
};

module.exports.getRegisteredDevice = function (deviceId) {
    if(registeredCache.has(deviceId)) {
        return registeredCache.get(deviceId);
    } else {
        return RegisteredStorage.get(deviceId).then((device) => {
            registeredCache.set(deviceId, device);
        });
    }
};

module.exports.getDiscoveredDevices = function () {
    return discoveredCache;
};

module.exports.getRegisteredDevices = function () {
    return registeredCache;
};