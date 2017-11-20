export function putStartTimeForTimer(dbPromise, storeName, mode, timerId, timer) {
    dbPromise.run(storeName, mode,
        (db, storeName, mode) => {
            const tx = db.transaction(storeName, mode);
            const store = tx.objectStore(storeName);
            store.put({
                id: timerId,
                timer: timer,
                start: new Date(),
            });
            return tx;
        });
}

export function putEndTimeForTimer(dbPromise, storeName, mode, timerId, timer) {
    dbPromise.run(storeName, mode,
        (db, storeName, mode) => {
            const tx = db.transaction(storeName, mode);
            const store = tx.objectStore(storeName);
            store.put({
                id: timerId,
                timer: timer,
                end: new Date()
            });
            return tx;
        });
}

export function putTimer(dbPromise, storeName, mode, timerId, timer) {
    dbPromise.run(storeName, mode,
        (db, storeName, mode) => {
            const tx = db.transaction(storeName, mode);
            const store = tx.objectStore(storeName);
            store.put({
                id: timerId,
                timer: timer,
                start: null,
                end: null
            });
            return tx;
        });
}

