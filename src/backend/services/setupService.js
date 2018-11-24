import feathersMongo from 'feathers-mongodb';

export default function setupService(db, url, collection, beforeHook = {}, afterHook = {}) {
  return function createPlugin() {
    const app = this;
    app.use(url, feathersMongo({ Model: db.collection(collection) }));
    app.service(url).hooks({ before: beforeHook, after: afterHook });
  };
}

