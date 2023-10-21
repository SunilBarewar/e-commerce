const fs = require("fs");
const path = require("path");
const { readFile, writeFile } = require("../util/file");

const p = path.join(path.dirname(require.main.filename), "data", "carts.json");

module.exports = class Cart {
  static addProduct(userId, prodId, productPrice) {
    // fetch the previous cart
    console.log(userId, prodId);
    readFile(p, (fileContent) => {
      let carts = fileContent;

      // find cart of the particular user
      const cartIndex = carts.findIndex((cart) => cart.userId == userId);
      let cart;
      if (cartIndex === -1) {
        cart = { userId, products: [], totalPrice: 0 };
      } else {
        cart = carts[cartIndex];
      }
      // console.log(cart);

      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === prodId
      );
      let existingProduct = null;
      console.log(existingProductIndex);
      if (existingProductIndex !== -1) {
        existingProduct = cart.products[existingProductIndex];
      }

      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products[existingProductIndex] = { ...updatedProduct };
      } else {
        updatedProduct = { id: prodId, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice + +productPrice;

      if (cartIndex === -1) {
        carts.push({ ...cart });
      } else {
        carts[cartIndex] = { ...cart };
      }

      writeFile(p, JSON.stringify(carts), () => {
        console.log(`[${p}] : updated successfully`);
      });
    });
  }
};
