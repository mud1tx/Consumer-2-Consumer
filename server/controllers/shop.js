const Product = require("../models/products");

exports.getProducts = async (req, res, next) => {
  const allAddedProducts = await Product.find();
  res.send(allAddedProducts);
};
