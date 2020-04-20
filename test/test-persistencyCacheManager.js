'use strict';
const expect  = require('chai').expect;
const PersistencyCacheManager = require('../lib/persistencyCacheManager');

const device1 = {id: 123, name: 'device1'};
const device2 = {id: 124, name: 'device2'};

it('PersistencyCacheManager test init', function(done) {
    PersistencyCacheManager.init().then(
        function () {
            done();
        },
        function (err) {
            done(err);
        });
});

it('PersistencyCacheManager test clear', function(done) {
    PersistencyCacheManager.clearRegisteredStorage().then(
        function () {
            done();
        },
        function (err) {
            done(err);
        });
});

it('PersistencyCacheManager test DeviceStorageAndCache (DiscoveredDevices)', function(done) {
    PersistencyCacheManager.addDiscoveredDevice(device1.id.toString(), device1);
    PersistencyCacheManager.addDiscoveredDevice(device2.id.toString(), device2);
    const cacheSize = PersistencyCacheManager.getDiscoveredCacheSize();
    expect(cacheSize).to.equal(2);

    const expected1 = PersistencyCacheManager.getDiscoveredDevice(device1.id.toString());
    const expected2 = PersistencyCacheManager.getDiscoveredDevice(device2.id.toString());
    expect(expected1.id).to.equal(device1.id);
    expect(expected2.id).to.equal(device2.id);
    done();
});

it('PersistencyCacheManager test DeviceStorageAndCache (RegisteredDevices)', function(done) {
    PersistencyCacheManager.addRegisteredDevice(device1.id.toString(), device1);
    PersistencyCacheManager.addRegisteredDevice(device2.id.toString(), device2);
    const cacheSize = PersistencyCacheManager.getRegisteredCacheSize();
    expect(cacheSize).to.equal(2);

    const expected1 = PersistencyCacheManager.getRegisteredDevice(device1.id.toString());
    const expected2 = PersistencyCacheManager.getRegisteredDevice(device2.id.toString());
    expect(expected1.id).to.equal(device1.id);
    expect(expected2.id).to.equal(device2.id);
    done();
});

it('PersistencyCacheManager test AddingDevice (DiscoveredDevices)', function(done) {
    PersistencyCacheManager.addDiscoveredDevice(device1.id.toString(), device1);
    PersistencyCacheManager.addDiscoveredDevice(device2.id.toString(), device2);
    const stats = PersistencyCacheManager.DiscoveredCache.stats();
    expect(stats.count).to.equal(2);

    const expected1 = PersistencyCacheManager.getDiscoveredDevice(device1.id.toString());
    const expected2 = PersistencyCacheManager.getDiscoveredDevice(device2.id.toString());
    expect(expected1.id).to.equal(device1.id);
    expect(expected2.id).to.equal(device2.id);
    done();
});

it('PersistencyCacheManager test AddingDevice (RegisteredDevices)', function(done) {
    PersistencyCacheManager.addRegisteredDevice(device1.id.toString(), device1);
    PersistencyCacheManager.addRegisteredDevice(device2.id.toString(), device2);
    const cacheSize = PersistencyCacheManager.getRegisteredCacheSize();
    expect(cacheSize).to.equal(2);

    const expected1 = PersistencyCacheManager.getRegisteredDevice(device1.id.toString());
    const expected2 = PersistencyCacheManager.getRegisteredDevice(device2.id.toString());
    expect(expected1.id).to.equal(device1.id);
    expect(expected2.id).to.equal(device2.id);
    done();
});

it('PersistencyCacheManager test removeDevice (RegisteredDevices)', function (done) {
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