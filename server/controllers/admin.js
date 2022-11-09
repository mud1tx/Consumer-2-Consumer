const Product = require("../models/products");
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

exports.postAddProduct = async (req, res, next) => {
  // console.log(req.body.image.length);

  const title = req.body.title;
  const category = req.body.category;
  const image = req.body.image;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    category: category,
    image: image,
    price: price,
    description: description,
  });
  saveImage(product, image);
  try {
    const newProduct = await product.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
  // product
  //   .save()
  //   .then((result) => {
  //     console.log("Created Product");
  //     res.redirect("/");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

// function saveImage(product, imgEncoded) {
//   if (imgEncoded == null) {
//     return;
//   }
//   const img = JSON.parse(imgEncoded);
//   if (img != null && imageMimeTypes.includes(img.type)) {
//     product.image = new Buffer.from(img.data, "base64");
//     product.imageType = img.type;
//   }
// }

function saveImage(product, imgEncoded) {
  // const imageTypeArray = [];
  // const imageArray = [];
  if (imgEncoded == null) {
    return;
  }
  // console.log(imgEncoded);
  // console.log(imgEncoded);
  // console.log(ima);
  for (let i = 0; i < imgEncoded.length; i++) {
    // if(imgEncoded.length===1){

    // }
    const img = JSON.parse(imgEncoded[i]);
    console.log(img);
    if (img != null && imageMimeTypes.includes(img.type)) {
      product.image.push = new Buffer.from(img.data, "base64");
      product.imageType.push(img.type);
    }
    // console.log(JSON.parse(imgEncoded[i]));
  }
  // product.image = imageArray;
  // product.imageType = imageTypeArray;
  // console.log(image.length);
}
