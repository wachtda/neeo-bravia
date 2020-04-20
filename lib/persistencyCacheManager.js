'use strict';
const Storage = require('node-persist');
const RegisteredStorage = Storage.create();

const discoveredMap = new Map();
const registeredMap = new Map();

function init() {
    discoveredMap.clear();
    registeredMap.clear();

    return new Promise((resolve, reject) => {
        RegisteredStorage.init().then(RegisteredStorage.forEach(function (entry) { registeredMap.set(entry.key, entry.value); }).then(resolve).catch(reject))});
}

function clearRegisteredStorage() {
    return new Promise((resolve, reject) => {
        RegisteredStorage.clear().then(() => { registeredMap.clear() }).then(resolve).catch(reject)});
}

module.exports.getDiscoveredCacheSize = function () {
    return discoveredMap.size;
}
module.exports.getRegisteredCacheSize = function () {
    return registeredMap.size;
}

module.exports.RegisteredStorage = RegisteredStorage;

module.exports.init = function () {
    return init().then(() => console.debug('initialized CacheManager'));
};

module.exports.clearRegisteredStorage = function () {
    return clearRegisteredStorage().then(() => console.debug('cleared storage for registered devices'));
};

module.exports.addDiscoveredDevice = function (deviceId, device) {
    discoveredMap.set(deviceId, device);
};

module.exports.removeDiscoveredDevice = function (deviceId) {
    discoveredMap.delete(deviceId);
};

module.exports.addRegisteredDevice = function (deviceId, device) {
    registeredMap.set(deviceId, device);
    RegisteredStorage.set(deviceId, device);
};

module.exports.removeRegisteredDevice = function (deviceId) {
    return RegisteredStorage.removeItem(deviceId).then(() => {
        registeredMap.delete(deviceId);
    });
};

module.exports.getDiscoveredDevice = function (deviceId) {
    return discoveredMap.get(deviceId);
};

module.exports.getRegisteredDevice = function (deviceId) {
    return registeredMap.get(deviceId);
};

module.exports.getDiscoveredDevices = function () {
    return discoveredMap;
};

module.exports.getRegisteredDevices = function () {
    return registeredMap;
};