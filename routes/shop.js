const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:id", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.post("/cart/:userId", shopController.postCart);

router.post("/cart/delete/:prodId", shopController.postCartDeleteProduct);

router.get("/orders", shopController.getOrders);

router.post("/order", shopController.postOrder);

// router.get("/checkout", shopController.getCheckout);

module.exports = router;
