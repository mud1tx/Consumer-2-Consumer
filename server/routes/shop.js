const express = require("express");

const shopController = require("../controllers/shop");
// const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", shopController.getProducts);

module.exports = router;