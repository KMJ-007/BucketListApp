import PouchDB from "pouchdb-browser";
import pouchFind from "pouchdb-find";
PouchDB.plugin(pouchFind); //So we can use the find functionality everywhere.

const getMasterDB = async () => {
  try {
    const dbName = "bucketListDatabase";
    let localDB = new PouchDB(dbName, { auto_compaction: true });
    return localDB;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default getMasterDB;
