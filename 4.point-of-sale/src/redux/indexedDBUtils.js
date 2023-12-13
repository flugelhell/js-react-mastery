import { openDB } from "idb";

export const saveStateToIndexedDB = async (reduxAction, state) => {
  try {
    const db = await openDB("ReactDB", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("reduxState")) {
          db.createObjectStore("reduxState", { keyPath: "key" });
        }
      },
    });

    const tx = db.transaction("reduxState", "readwrite");
    const store = tx.objectStore("reduxState");
    await store.put({ key: reduxAction, state });
    await tx.done;
  } catch (e) {
    console.log(e);
  }
};

export const loadStateFromIndexedDB = async (reduxAction) => {
  try {
    const db = await openDB("ReactDB", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("reduxState")) {
          db.createObjectStore("reduxState", { keyPath: "key" });
        }
      },
    });
    const tx = db.transaction("reduxState");
    const store = tx.objectStore("reduxState");
    const state = await store.get(reduxAction);
    await tx.done;

    return state ? state.state : undefined;
  } catch (e) {
    console.log(e);
  }
};
