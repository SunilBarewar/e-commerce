const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;

exports.mongoConnect = async (callback) => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    _db = client.db();
    console.log("connected to db");
    callback();
  } catch (error) {
    throw error;
  }
};

exports.getDb = () => {
  if (_db) return _db;

  throw new Error("DB not connected!");
};
