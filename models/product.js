const db = require("../util/database.js");

module.exports = class Product {
  constructor(title, imageUrl, description, price, id = null) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  save() {
    return db.execute(
      "INSERT INTO product (title, price,description,imageUrl) VALUES(?,?,?,?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }
  update(id) {
    const updateQuery =
      "UPDATE product SET title = ?, description = ?, price = ?, imageUrl = ? WHERE id = ?";
    const values = [
      this.title,
      this.description,
      this.price,
      this.imageUrl,
      this.id,
    ];
    return db.execute(updateQuery, values);
  }
  static fetchAll() {
    return db.execute("SELECT * FROM Product;");
  }

  static deleteProduct(id) {
    const deleteQuery = `DELETE FROM Product WHERE id = ${id}`;

    return db.execute(deleteQuery);
  }
  static findById(id) {
    return db.execute(`SELECT * FROM product WHERE id=${id}`);
  }
};
