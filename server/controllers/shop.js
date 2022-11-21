const Product = require("../models/products");

exports.getProducts = async (req, res, next) => {
//   console.log("lpo",req.session);
  const allAddedProducts = await Product.find();
  res.send(allAddedProducts);
};
