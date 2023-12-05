const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;

exports.mongoConnect = async (callback) => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://sunilb:sunilb@cluster0.zfn62gz.mongodb.net/shop?retryWrites=true&w=majority"
    );
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
