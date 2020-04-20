'use strict';
const expect  = require('chai').expect;
const PersistencyCacheManager = require('../lib/persistencyCacheManager');

const device1 = {id: 123, name: 'device1'};
const device2 = {id: 124, name: 'device2'};

it('PersistencyCacheManager init', function(done) {
    PersistencyCacheManager.deleteStorage().then(() => PersistencyCacheManager.init().then(
        function () {
            done();
        },
        function (err) {
            done(err);
        }
    ));
});

it('PersistencyCacheManager addingDiscoveredDevice', function(done) {
    PersistencyCacheManager.addDiscoveredDevice(device1.id.toString(), device1);
    PersistencyCacheManager.addDiscoveredDevice(device2.id.toString(), device2);
    const stats = PersistencyCacheManager.DiscoveredCache.stats();
    expect(stats.count).to.equal(2);

    let expected1;
    let expected2;
    const test1 = PersistencyCacheManager.DiscoveredStorage.get(device1.id.toString()).then((entry) => expected1 = entry);
    const test2 = PersistencyCacheManager.DiscoveredStorage.get(device2.id.toString()).then((entry) => expected2 = entry);
    Promise.all([test1, test2]).then(() => {
        expect(expected1.id).to.equal(device1.id);
        expect(expected2.id).to.equal(device2.id);
        done();
    }).catch((error) => done(error));
});

it('PersistencyCacheManager addingRegisteredDevice', function(done) {
    PersistencyCacheManager.addRegisteredDevice(device1.id.toString(), device1);
    PersistencyCacheManager.addRegisteredDevice(device2.id.toString(), device2);
    const stats = PersistencyCacheManager.RegisteredCache.stats();
    expect(stats.count).to.equal(2);

    let expected1;
    let expected2;
    const test1 = PersistencyCacheManager.RegisteredStorage.get(device1.id.toString()).then((entry) => expected1 = entry);
    const test2 = PersistencyCacheManager.RegisteredStorage.get(device2.id.toString()).then((entry) => expected2 = entry);
    Promise.all([test1, test2]).then(() => {
        expect(expected1.id).to.equal(device1.id);
        expect(expected2.id).to.equal(device2.id);
        done();
    }).catch((error) => done(error));
});

it('PersistencyCacheManager removeRegisteredDevice', function (done) {
    const expectedCacheBefore = PersistencyCacheManager.RegisteredCache.stats().count;
    let expectedCacheAfter;
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
                        expectedCacheAfter = PersistencyCacheManager.RegisteredCache.stats().count;
                    }).then(() => {
                        expect(expectedStorageBefore).to.equal(2);
                        expect(expectedCacheBefore).to.equal(2);
                        expect(expectedStorageAfter).to.equal(1);
                        expect(expectedCacheAfter).to.equal(1);
                        done();
                    }).catch((error) => done(error));
                });
        });
});