const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      expire: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      payment_status: {
        type: String,
        required: true,
      },
      customerId: {
        type: String,
      },
      paymentIntentId: {
        type: String,
      },
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Order", orderSchema);
