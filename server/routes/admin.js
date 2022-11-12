const express = require("express");

const adminController = require("../controllers/admin");

const store = require("../util/multer");

const router = express.Router();

// router.get("/add-product", adminController.getAddProduct);

router.post(
  "/add-product",
  store.array("images",12),
  adminController.postAddProduct
);

module.exports = router;
