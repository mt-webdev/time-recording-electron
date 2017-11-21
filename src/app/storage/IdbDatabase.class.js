import { coalesc } from '../shared/utils'
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

        this.openDatabase();
    }

    openDatabase(storeName = 'timers') {
        this.dbPromise$ = idb.open(this.dbName, 1, upgradeDb => {
            upgradeDb.createObjectStore(this.storeName, { keyPath: 'id' });
        });
    }

    putStartTime(timerId, timer) {
        this.dbPromise$.then(db => {
            let tx = db.transaction(this.storeName, dbMode.readwrite);
            let store = tx.objectStore(this.storeName);

            store.get(0)
                .then(data =>
                    store.put({
                        id: timerId,
                        timer: timer,
                        start: coalesc(data.start, new Date()),
                        end: data.end
                    }))
                .catch(err => console.log('err', err));

            return tx.complete;
        });
    }

    putEndTime(timerId, timer) {
        this.dbPromise$.then(db => {
            let tx = db.transaction(this.storeName, dbMode.readwrite);
            let store = tx.objectStore(this.storeName);

            store.get(0)
                .then(data =>
                    store.put({
                        id: timerId,
                        timer: timer,
                        start: data.start,
                        end: new Date()
                    }))
                .catch(err => console.log('err', err));

            return tx.complete;
        });
    }
}