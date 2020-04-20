'use strict';
const NanoCache = require('nano-cache');
const DiscoveredCache = new NanoCache();
const RegisteredCache = new NanoCache();
const Storage = require('node-persist');
const DiscoveredStorage = Storage.create();
const RegisteredStorage = Storage.create();

function init() {
    DiscoveredCache.on('clear', function () { console.debug('cleared DiscoveredCache'); });
    RegisteredCache.on('clear', function () { console.debug('cleared RegisteredCache'); });
    DiscoveredCache.clear();
    RegisteredCache.clear();

    const initDiscovered = new Promise(((resolve, reject) => {
        DiscoveredStorage.init().then(
            DiscoveredStorage.forEach(function(entry) {
                DiscoveredCache.set(entry.key, entry.value);
            }).then(resolve('DiscoveredCacheManager')).catch(reject)
        );
    }));
    const initRegistered = new Promise((resolve, reject) => {
        RegisteredStorage.init().then(
            RegisteredStorage.forEach(function(entry) {
                RegisteredCache.set(entry.key, entry.value);
            }).then(resolve('RegisteredCacheManager')).catch(reject)
        );
    });
    return Promise.all([initDiscovered, initRegistered]);
}

function deleteStorage() {
    const destroyDiscovered = new Promise(((resolve, reject) => {
        DiscoveredStorage.clear().then(resolve('DiscoveredCacheManager')).catch(reject);
    }));
    const destroyRegistered = new Promise(((resolve, reject) => {
        RegisteredStorage.clear().then(resolve('RegisteredCacheManager')).catch(reject);
    }));
    return Promise.all([destroyDiscovered, destroyRegistered]);
}

module.exports.DiscoveredCache = DiscoveredCache;
module.exports.DiscoveredStorage = DiscoveredStorage;
module.exports.RegisteredCache = RegisteredCache;
module.exports.RegisteredStorage = RegisteredStorage;

module.exports.init = function () {
    return init().then((outcome) => console.debug('initialized CacheManagers: ' + outcome));
};

module.exports.deleteStorage = function () {
    return deleteStorage().then((outcome) => console.debug('deleted Storages: ' + outcome));
};

module.exports.addDiscoveredDevice = function (deviceId, device) {
    DiscoveredCache.set(deviceId, device);
    DiscoveredStorage.set(deviceId, device);
};

module.exports.addRegisteredDevice = function (deviceId, device) {
    RegisteredCache.set(deviceId, device);
    RegisteredStorage.set(deviceId, device);
};

module.exports.removeDiscoveredDevice = function (deviceId) {
    return DiscoveredStorage.removeItem(deviceId).then(() => {
        DiscoveredCache.del(deviceId);
    });
};

module.exports.removeRegisteredDevice = function (deviceId) {
    return RegisteredStorage.removeItem(deviceId).then(() => {
        RegisteredCache.del(deviceId);
    });
};

module.exports.getDiscoveredDevice = function (deviceId) {
    return DiscoveredCache.get(deviceId);
};

module.exports.getRegisteredDevice = function (deviceId) {
    return RegisteredCache.get(deviceId);
};

module.exports.getDiscoveredDevices = function () {
    let discovered = [];
    DiscoveredStorage.forEach(function(key, value) {
        discovered.push({id: key, device: value});
    });
    return discovered;
};