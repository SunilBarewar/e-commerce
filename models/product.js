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
  constructor(title, imageUrl, description, price, id = null) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id == this.id
        );

        const updatedProducts = [...products];

        updatedProducts[existingProductIndex] = { ...this };

        writeFile(p, JSON.stringify(updatedProducts), () =>
          console.log(`[${p}] : updated successfully`)
        );

        return;
      }
      this.id = Date.now();
      products.push(this);
      writeFile(p, JSON.stringify(products), () =>
        console.log(`[${p}] : updated successfully`)
      );
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static deleteProduct(prodId) {
    getProductsFromFile((products) => {
      const updatedProducts = products.filter((prod) => prod.id != prodId);
      writeFile(p, JSON.stringify(updatedProducts), () => {
        console.log("deleted product successfully");
      });
    });
  }
  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id == id);

      cb(product);
    });
  }
  static editProduct(id) {}
};
