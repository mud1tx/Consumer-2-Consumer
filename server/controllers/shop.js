const Product = require("../models/products");

exports.getProducts = async (req, res, next) => {
  const allAddedProducts = await Product.find();
  res.send(allAddedProducts);
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.json({ ok: true, product: product });
    })
    .catch((err) => {
      res.json({ ok: false, message: "Some error occur" });
    });
};
