const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pin_code: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    resetToken: String,
    resetTokenExpiration: Date,
    cart: {
      items: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
        },
      ],
    },
    lend: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        expire: {
          type: Number,
        },
      },
    ],
    borrow: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        expire: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    return "Product is already present in the cart";
  } else {
    updatedCartItems.push({
      productId: product._id,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  this.save();
  return "";
};

userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
