const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.post("/", shopController.getProducts);

router.get("/:productId", shopController.getProduct);

router.post("/delete", shopController.postDeleteProduct);

router.post("/cart", shopController.postCart);

// router.get("/checkout", shopController.getCheckout);

router.post("/cart/products", shopController.getCartProducts);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

module.exports = router;
