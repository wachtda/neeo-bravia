'use strict';
const expect  = require('chai').expect;
const PersistencyCacheManager = require('../lib/persistencyCacheManager');

const device1 = {id: 123, name: 'device1'};
const device2 = {id: 124, name: 'device2'};

it('clear', function(done) {
    PersistencyCacheManager.init().then(() => {
        PersistencyCacheManager.clearRegisteredStorage().then(
        function () {
            done();
        },
        function (err) {
            done(err);
        });
    })
});

it('test init', function(done) {
    const promise1 = PersistencyCacheManager.addRegisteredDevice(device1.id.toString(), device1);
    const promise2 = PersistencyCacheManager.addRegisteredDevice(device2.id.toString(), device2);
    Promise.all([promise1, promise2]).then(() => {
        PersistencyCacheManager.init().then(() => {
            const cacheSize = PersistencyCacheManager.getRegisteredCacheSize();
            expect(cacheSize).to.equal(2);
            done();
        })
    })
});

it('test discovered devices cache', function(done) {
    PersistencyCacheManager.addDiscoveredDevice(device1.id.toString(), device1);
    PersistencyCacheManager.addDiscoveredDevice(device2.id.toString(), device2);
    const cacheSize = PersistencyCacheManager.getDiscoveredCacheSize();
    expect(cacheSize).to.equal(2);

    const devicesSize = PersistencyCacheManager.getDiscoveredDevices().size;
    expect(devicesSize).to.equal(2);

    let expected1;
    let expected2;
    const promise1 = PersistencyCacheManager.getDiscoveredDevice(device1.id.toString()).then((device) => { expected1 = device });
    const promise2 = PersistencyCacheManager.getDiscoveredDevice(device2.id.toString()).then((device) => { expected2 = device });
    Promise.all([promise1, promise2]).then(() => {
        expect(expected1.id).to.equal(device1.id);
        expect(expected2.id).to.equal(device2.id);
        done();
    });
});

it('test registered devices cache and storage', () => {
    const promiseReg1 = PersistencyCacheManager.addRegisteredDevice(device1.id.toString(), device1);
    const promiseReg2 = PersistencyCacheManager.addRegisteredDevice(device2.id.toString(), device2);
    const promise0 = Promise.all([promiseReg1, promiseReg2]).then(() => {
        const cacheSize = PersistencyCacheManager.getRegisteredCacheSize();
        expect(cacheSize).to.equal(2);
    });

    let expected1;
    let expected2;
    const promise1 = PersistencyCacheManager.getRegisteredDevice(device1.id.toString()).then((device) => { expected1 = device });
    const promise2 = PersistencyCacheManager.getRegisteredDevice(device2.id.toString()).then((device) => { expected2 = device });
    return Promise.all([promise0, promise1, promise2]).then(() => {
        expect(expected1.id).to.equal(device1.id);
        expect(expected2.id).to.equal(device2.id);
    });
});

it('test registered devices cache and storage failure', function(done) {
    const promiseReg1 = PersistencyCacheManager.addRegisteredDevice(device1.id.toString(), device1);
    const promiseReg2 = PersistencyCacheManager.addRegisteredDevice(device2.id.toString() + '_null', null);
    Promise.all([promiseReg1, promiseReg2]).then(() => {
        const cacheSize = PersistencyCacheManager.getRegisteredCacheSize();
        expect(cacheSize).to.equal(1);
    }).catch((error) => { expect(error).to.equal('registered device cannot be null') });

    let expected1;
    let expected2;
    const promise1 = PersistencyCacheManager.getRegisteredDevice(device1.id.toString()).then((device) => { expected1 = device });
    const promise2 = PersistencyCacheManager.getRegisteredDevice(device2.id.toString()).then((device) => { expected2 = device });
    Promise.all([promise1, promise2]).then(() => {
        expect(expected1.id).to.equal(device1.id);
    }).catch(() => {
        expect(expected2).to.equal(null);
    }).finally(done());
});

it('test registered devices storage only', () => {
    const promiseReg1 = PersistencyCacheManager.addRegisteredDevice(device1.id.toString(), device1);
    const promiseReg2 = PersistencyCacheManager.addRegisteredDevice(device2.id.toString(), device2);
    const promise0 = Promise.all([promiseReg1, promiseReg2]).then(() => {
        const cacheSize = PersistencyCacheManager.getRegisteredCacheSize();
        expect(cacheSize).to.equal(2);

        PersistencyCacheManager.getRegisteredDevices().clear();
        const cacheSizeAfter = PersistencyCacheManager.getRegisteredCacheSize();
        expect(cacheSizeAfter).to.equal(0);
    })

    let expected1;
    let expected2;
    const promise1 = PersistencyCacheManager.getRegisteredDevice(device1.id.toString()).then((device) => { expected1 = device });
    const promise2 = PersistencyCacheManager.getRegisteredDevice(device2.id.toString()).then((device) => { expected2 = device });
    return Promise.all([promise0, promise1, promise2]).then(() => {
        expect(expected1.id).to.equal(device1.id);
        expect(expected2.id).to.equal(device2.id);
    });
});

it('test removing of registered device', function (done) {
    const expectedCacheSizeBefore = PersistencyCacheManager.getRegisteredCacheSize();
    let expectedCacheSizeAfter;
    let expectedStorageBefore;
    let expectedStorageAfter;
    PersistencyCacheManager.RegisteredStorage.length()
        .then((before) => {
            expectedStorageBefore = before;
        })
        .then(() => {
            PersistencyCacheManager.removeRegisteredDevice(device1.id.toString())
                .then(() => {
                    PersistencyCacheManager.RegisteredStorage.length().then((after) => {
                        expectedStorageAfter = after;
                        expectedCacheSizeAfter = PersistencyCacheManager.getRegisteredCacheSize();
                    }).then(() => {
                        expect(expectedStorageBefore).to.equal(2);
                        expect(expectedCacheSizeBefore).to.equal(2);
                        expect(expectedStorageAfter).to.equal(1);
                        expect(expectedCacheSizeAfter).to.equal(1);
                        done();
                    }).catch((error) => done(error));
                });
        });
});