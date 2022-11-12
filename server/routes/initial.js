const express = require("express");
const fetchProducts = require("../controllers/fetchProduct");
const store = require("../util/multer");

const router = express.Router();

router.get("/", fetchProducts.home);
// router.post("/uploadmultiple", store.array("images", 12), fetchProducts.uploads);
module.exports = router;
