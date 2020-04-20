'use strict';
const PersistencyCacheManager = require('./lib/persistencyCacheManager');

PersistencyCacheManager.deleteStorage().then(() => PersistencyCacheManager.init());