const Product = require("../models/products");
const User = require("../models/user");

exports.getProducts = async (req, res, next) => {
  const userId = req.body.userData;
  if (userId === undefined) {
    const allAddedProducts = await Product.find({ borrowed: false });
    return res.json({ ok: true, data: allAddedProducts });
  } else {
    const allAddedProducts = await Product.find({
      borrowed: false,
      userId: { $ne: userId },
    });
    return res.json({ ok: true, data: allAddedProducts });
  }
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findOne({ _id: prodId })
    .then((product) => {
      product
        .populate("userId")
        .then((product) => {
          return res.json({
            ok: true,
            product: product,
          });
        })
        .catch((err) => {
          console.log(err);
          res.json({ ok: false, msg: err });
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({ ok: false, message: "Some error occur" });
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.prodId;
  const userId = req.body.userId;
  console.log(prodId);
  Product.deleteOne({
    _id: prodId,
    borrowed: false,
    userId: userId,
  })
    .then((response) => {
      console.log(response);
      if (response.deletedCount !== 1) {
        return res.json({
          ok: false,
          message: "Product can not be remove as someone borrowed it",
        });
      } else {
        return res.json({
          ok: true,
          message: "Product remove sucessfully",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ ok: false, message: "Some Error Occured!!" });
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.prodId;
  const userId = req.body.userId;
  Product.findById(prodId).then((product) => {
    return User.findById(userId)
      .then((user) => {
        let mes = user.addToCart(product);
        if (mes.length > 0) {
          return res.json({ ok: 200, message: mes });
        }
        user
          .populate("cart.items.productId")
          .then((user) => {
            const products = user.cart.items;
            return res.json({
              ok: true,
              products: products,
              message: "Product Added To Cart",
            });
          })
          .catch((err) => {
            console.log(err);
            res.json({ ok: false, message: "An error occured!!" });
          });
      })
      .catch((err) => {
        console.log(err);
        res.json({ ok: false, message: "An error occured!!" });
      });
  });
};

exports.getCartProducts = (req, res, next) => {
  const userId = req.body.userData;
  User.findById(userId)
    .then((user) => {
      user
        .populate("cart.items.productId")
        .then((user) => {
          let products = user.cart.items;
          const cartProducts = [];
          products = products.filter((prod) => {
            if (prod.productId.borrowed === false) {
              cartProducts.push({
                productId: prod.productId._id,
                _id: prod._id,
              });
              return prod;
            }
          });
          User.findOne({ _id: userId })
            .then((user) => {
              user.cart.items = cartProducts;
              return user.save();
            })
            .catch((err) => {
              console.log(err);
            });
          return res.json({
            ok: true,
            products: products,
          });
        })
        .catch((err) => {
          console.log(err);
          res.json({ ok: false, message: "An error occured!!" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({ ok: false, message: "An error occured!!" });
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const userId = req.body.userId;
  User.findById(userId)
    .then((user) => {
      user.removeFromCart(prodId);
      user.populate("cart.items.productId").then((user) => {
        const products = user.cart.items;
        return res.json({
          ok: true,
          products: products,
          message: "Product removed successfully",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({ ok: false, message: "An error occured!!" });
    });
};
