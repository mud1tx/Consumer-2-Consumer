const Product = require("../models/products");
const fs = require("fs");
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

exports.postAddProduct = async (req, res, next) => {
  // console.log("loloolook", req.session);
  const title = req.body.title;
  const category = req.body.category;
  const images = req.files;
  const price = req.body.price;
  const description = req.body.description;
  if (!images) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }
  // convert images into base64 encoding
  let imgArray = images.map((file) => {
    let img = fs.readFileSync(file.path);
    return (en = img.toString("base64"));
  });
  const imageArray = [];
  const imageTypeArray = [];
  const imageNameArray = [];
  imgArray.map((src, index) => {
    imageNameArray.push(images[index].originalname);
    imageTypeArray.push(images[index].mimetype);
    imageArray.push(src);
  });
  const product = new Product({
    title: title,
    category: category,
    imageName: imageNameArray,
    imageType: imageTypeArray,
    image: imageArray,
    price: price,
    description: description,
    userId:req.user._id
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
  // res.json(product);
};