'use strict';
const logger = require('./logger');
const storage = require('node-persist');
const registeredStorage = storage.create();

const discoveredCache = new Map();
const registeredCache = new Map();

function init() {
    logger.info('init CacheManager')
    discoveredCache.clear();
    registeredCache.clear();
    return new Promise((resolve, reject) => {
        registeredStorage.init().then(() => {
            registeredStorage.forEach(function (entry) {
                registeredCache.set(entry.key, entry.value);
            }).then(resolve).catch(reject);
        });
    });
}

function clearRegisteredStorage() {
    logger.info('clear ALL registered devices from storage')
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
    return init().then(() => logger.info('initialized CacheManager'));
};

module.exports.clearRegisteredStorage = function () {
    return clearRegisteredStorage().then(() => logger.info('cleared storage for registered devices'));
};

module.exports.addDiscoveredDevice = function (deviceId, device) {
    logger.info('adding device to discovered cache', deviceId, device);
    discoveredCache.set(deviceId, device);
};

module.exports.addRegisteredDevice = function (deviceId, device) {
    logger.info('adding device to registered storage', deviceId, device);
    return new Promise(function(resolve, reject) {
        if(device == null) {
            logger.info('device to be registered is null, reject');
            reject('registered device cannot be null');
        }
        resolve();
    }).then(() => {
        registeredStorage.set(deviceId, device).then(() => {
            logger.info('add device to registered cache', deviceId, device);
            registeredCache.set(deviceId, device);
        });
    });
};

module.exports.removeRegisteredDevice = function (deviceId) {
    logger.info('remove device from registered storage', deviceId);
    return registeredStorage.removeItem(deviceId).then(() => {
        logger.debug('remove device from registered cache', deviceId);
        registeredCache.delete(deviceId);
    });
};

module.exports.getDiscoveredDevice = function (deviceId) {
    logger.info('getting discovered device from cache', deviceId);
    return new Promise(function(resolve, reject) {
        const device = discoveredCache.get(deviceId);
        if(device != null) {
            logger.debug('found discovered device from cache', device);
            resolve(device)
        } else {
            reject('no device found for deviceId' + deviceId);
        }
    });
};

module.exports.getRegisteredDevice = async function (deviceId) {
    logger.debug('getting registered device from cache/storage', deviceId);
    return new Promise(function(resolve, reject) {
        let device;
        if(registeredCache.has(deviceId)) {
            const device = registeredCache.get(deviceId);
            logger.debug('found registered device from cache', device);
            resolve(device);
        } else {
            registeredStorage.get(deviceId).then((d) => {
                if(d != null) {
                    logger.debug('found registered device from storage, adding to cache now', d);
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