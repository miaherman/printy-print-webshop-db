const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "customer", required: true },
  shipping: { type: "String", required: true },
  price: { type: "String", required: true },
  products: { type: "Array", required: true },
}, {
  timestamps: true
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;


