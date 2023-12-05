const { getDb } = require("../util/database");
const { ObjectId } = require("mongodb");

class Product {
  constructor(title, price, description, imageUrl, id = null, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new ObjectId(id) : null;
    this.userId = userId;
  }

  async save() {
    const db = getDb();

    const product = await db.collection("products").insertOne(this);

    return product;
  }
  static async fetchAll() {
    const db = getDb();
    const products = await db.collection("products").find({}).toArray();
    // console.log(products);
    return products;
  }

  static async findById(prodId) {
    const db = getDb();
    return await db
      .collection("products")
      .find({ _id: new ObjectId(prodId) })
      .next();
  }

  static async deleteProduct(prodId) {
    const db = getDb();

    return await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(prodId) });
  }

  async update(prodId) {
    const db = getDb();

    await db.collection("products").updateOne(
      { _id: new ObjectId(prodId) },
      {
        $set: { ...this },
      }
    );
  }
}

module.exports = Product;
