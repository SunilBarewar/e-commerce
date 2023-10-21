const fs = require("fs");
const path = require("path");

const { readFile, writeFile } = require("../util/file.js");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  readFile(p, cb);
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Date.now();
    getProductsFromFile((products) => {
      products.push(this);
      writeFile(p, JSON.stringify(products), () =>
        console.log(`[${p}] : updated successfully`)
      );
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id == id);

      cb(product);
    });
  }
};
