const mongoose = require("mongoose");
const ProductModel = require("./product.model")
const CustomerModel = require("./customer.model")

const orderSchema = new mongoose.Schema({
  shipping: { type: String, required: true },
  price: { type: Number, required: true },
  products: { type: [ProductModel.schema], required: true },
  customer: { type: CustomerModel.schema, required: true }
}, {
  timestamps: true
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;


