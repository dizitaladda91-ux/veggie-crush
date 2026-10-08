const mongoose = require("mongoose");

const DEFAULT_MONGO_URI = "mongodb://127.0.0.1:27017/veggiecrush";
const cache = globalThis.__veggiecrushMongoose || {
  connection: null,
  promise: null,
};

globalThis.__veggiecrushMongoose = cache;

function getMongoUri() {
  const databaseUrl = process.env.DATABASE_URL;
  const configuredUri = process.env.MONGO_URI ||
    (databaseUrl && databaseUrl.startsWith("mongodb") ? databaseUrl : null);

  if (configuredUri) {
    return configuredUri;
  }

  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    throw new Error("MONGO_URI must be configured for production deployments.");
  }

  return DEFAULT_MONGO_URI;
}

async function connectMongoose() {
  if (cache.connection && mongoose.connection.readyState === 1) {
    return cache.connection;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(getMongoUri()).then((connection) => {
      cache.connection = connection;
      return connection;
    }).catch((error) => {
      cache.promise = null;
      throw error;
    });
  }

  return cache.promise;
}

module.exports = { connectMongoose, getMongoUri };
