const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getProducts);

router.get("/:productId", shopController.getProduct);

router.post("/cart", shopController.postCart);

router.post("/cart/products", shopController.getCartProducts);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

module.exports = router;
