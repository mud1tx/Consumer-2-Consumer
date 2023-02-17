// const express = require("express");
// const Product = require("../models/products");
// const Order = require("../models/order");
// const User = require("../models/user");
// const stripe = require("stripe")(process.env.STRIPE_KEY_SERVER);

// const router = express.Router();

// router.post("/create-checkout-session", async (req, res) => {
//   const days = req.body.days;
//   const prodData = req.body.prodData;
//   const userId = req.body.userId;
//   console.log(typeof userId, days, prodData, userId);
//   const customer = await stripe.customers.create({
//     metadata: {
//       userId: JSON.stringify(userId),
//       prodData: JSON.stringify(prodData),
//       days: JSON.stringify(days),
//     },
//   });
//   const session = await stripe.checkout.sessions.create({
//     shipping_address_collection: { allowed_countries: ["IN"] },
//     shipping_options: [
//       {
//         shipping_rate_data: {
//           type: "fixed_amount",
//           fixed_amount: { amount: 3000, currency: "inr" },
//           display_name: "Next day air,",
//         },
//       },
//     ],
//     customer: customer.id,
//     line_items: [
//       {
//         price_data: {
//           currency: "inr",
//           product_data: {
//             name: prodData.title,
//             description: prodData.category,
//             metadata: {
//               id: prodData.id,
//             },
//           },
//           unit_amount: prodData.price * 100,
//         },
//         quantity: days,
//       },
//     ],
//     mode: "payment",
//     success_url: `https://customer-2-customer.netlify.app/orders`,
//     cancel_url: `https://customer-2-customer.netlify.app/`,
//   });

//   res.send({ url: session.url });
// });

// // create order

// const createOrder = async (customer, data) => {
//   const prodData = JSON.parse(customer.metadata.prodData);
//   const userId = JSON.parse(customer.metadata.userId);
//   const days = Number(JSON.parse(customer.metadata.days));
//   const currentTime = Date.now();
//   const prodId = prodData._id;
//   Order.findOne({ userId: userId }).then((user) => {
//     if (!user) {
//       const prodArray = [];
//       prodArray.push({
//         productId: prodData._id,
//         expire: currentTime + days * 24 * 60 * 60 * 1000,
//         customerId: data.customer,
//         paymentIntentId: data.payment_intent,
//         total: data.amount_total,
//         payment_status: data.payment_status,
//       });
//       const order = new Order({
//         products: prodArray,
//         userId: userId,
//       });
//       order.save();
//       Product.findOne({ _id: prodId })
//         .then((prod) => {
//           prod.borrowed = true;
//           return prod.save();
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//       const borrowArray = [];
//       const lendArray = [];
//       borrowArray.push({
//         productId: prodData._id,
//         expire: currentTime + days * 24 * 60 * 60 * 1000,
//       });
//       lendArray.push({
//         productId: prodData._id,
//         expire: currentTime + days * 24 * 60 * 60 * 1000,
//       });
//       User.findOne({ _id: userId })
//         .then((user) => {
//           user.borrow = borrowArray;
//           return user.save();
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//       const productOwnerId = prodData.userId;
//       User.findOne({ _id: productOwnerId })
//         .then((user) => {
//           user.lend = lendArray;
//           return user.save();
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//       return;
//     } else {
//       user.products.push({
//         productId: prodData._id,
//         expire: currentTime + days * 24 * 60 * 60 * 1000,
//         customerId: data.customer,
//         paymentIntentId: data.payment_intent,
//         total: data.amount_total,
//         payment_status: data.payment_status,
//       });
//       user.save();
//       Product.findOne({ _id: prodId })
//         .then((prod) => {
//           prod.borrowed = true;
//           return prod.save();
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//       User.findOne({ _id: userId })
//         .then((user) => {
//           user.borrow.push({
//             productId: prodData._id,
//             expire: currentTime + days * 24 * 60 * 60 * 1000,
//           });
//           return user.save();
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//       const productOwnerId = prodData.userId;
//       User.findOne({ _id: productOwnerId })
//         .then((user) => {
//           user.lend.push({
//             productId: prodData._id,
//             expire: currentTime + days * 24 * 60 * 60 * 1000,
//           });
//           return user.save();
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//       return;
//     }
//   });
// };

// // webhook

// // This is your Stripe CLI webhook secret for testing your endpoint locally.
// let endpointSecret;

// endpointSecret =
//   "whsec_519e093acf69486ba06f52d444eb4ea2048ac60a86f7341ed0601084742e416f";

// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   (req, res) => {
//     const sig = req.headers["stripe-signature"];
//     let data;
//     let eventType;
//     if (endpointSecret) {
//       let event;
//       try {
//         event = stripe.webhooks.constructEvent(
//           req.rawBody,
//           sig,
//           endpointSecret
//         );
//         console.log(`Webhook Verified.`);
//       } catch (err) {
//         console.log(`Webhook Error: ${errmessage}`);
//         res.status(400).send(`Webhook Error: ${err.message}`);
//         return;
//       }
//       data = event.data.object;
//       eventType = event.type;
//     } else {
//       data = req.body.data.object;
//       eventType = req.body.type;
//     }

//     // Handle the event
//     if (eventType === "checkout.session.completed") {
//       stripe.customers
//         .retrieve(data.customer)
//         .then((customer) => {
//           createOrder(customer, data);
//         })
//         .catch((err) => console.log(err));
//     }
//     res.send();
//   }
// );

// module.exports = router;
