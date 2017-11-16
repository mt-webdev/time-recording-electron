const idb = require('idb');

export var dbMode = (() => ({
    readwrite: 'readwrite',
    read: 'read'
}))();

export default class IdbStorage {
    dbPromise$;
    dbName;
    storeName;

    constructor({ dbName = 'timer-db', storeName = 'timers' } = {}) {
        this.dbName = dbName;
        this.storeName = storeName;

        this.dbPromise$ = idb.open(this.dbName, 1, upgradeDb => {
            upgradeDb.createObjectStore(this.storeName, { keyPath: 'id' });
        });
    }

    run(store, mode, callback) {
        this.dbPromise$.then(db => {
            if (!db)
                return;

            callback(db, storeName, mode);
        });
    }
}