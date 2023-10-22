const Product = require("../models/product");
const Cart = require("../models/cart.js");
const db = require("../util/database");
exports.getProducts = (req, res, next) => {
  db.query("select * from account;")
    .then((res) => console.log(res[0]))
    .catch((err) => console.log(err));
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.id;
  console.log(productId);
  Product.findById(productId, (product) => {
    res.render("shop/product-detail", {
      path: "/products",
      pageTitle: "product details",
      product,
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  const prodPrice = req.body.productPrice;
  const userId = req.params.userId;
  console.log(prodId, userId);
  Cart.addProduct(userId, prodId, prodPrice);
  res.redirect("/cart");
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
