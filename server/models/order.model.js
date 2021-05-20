const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shipping: { type: "String", required: true },
  price: { type: "String", required: true },
  createdAt: { type: "String", required: true },
  products: { type: "Array", required: true },
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;


