const express = require("express");

const adminController = require("../controllers/admin");

const store = require("../util/multer");

const router = express.Router();

router.post(
  "/add-product",
  store.array("images", 12),
  adminController.postAddProduct
);

router.post("/products", adminController.getProducts);

router.post("/order", adminController.postOrderData);

module.exports = router;
