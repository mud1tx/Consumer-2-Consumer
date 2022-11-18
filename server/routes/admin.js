const express = require("express");

const adminController = require("../controllers/admin");

const store = require("../util/multer");

const isAuth = require("../middleware/is_auth");

const router = express.Router();

// router.get("/add-product", adminController.getAddProduct);

router.post(
  "/add-product",
  store.array("images", 12),
  isAuth,
  adminController.postAddProduct
);

module.exports = router;
