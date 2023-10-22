const Product = require("../models/product");
const Cart = require("../models/cart.js");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fields]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.id;
  console.log(productId);
  Product.findById(productId)
    .then(([product, fields]) => {
      res.render("shop/product-detail", {
        path: "/products",
        pageTitle: "product details",
        product: product[0],
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fields]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
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
