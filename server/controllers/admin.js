const Product = require("../models/products");

exports.postAddProduct = (req, res, next) => {
  console.log(req.body.title);
  const title = req.body.title;
  const image = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    image: image,
    price: price,
    description: description,
  });
  product
    .save()
    .then((result) => {
      console.log("Created Product");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
