const mongoose = require("mongoose");
const ProductModel = require("./product.model")

const orderSchema = new mongoose.Schema({
  shipping: { type: String, required: true },
  price: { type: Number, required: true },
  products: { type: [ProductModel.schema], required: true },
}, {
  timestamps: true
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;


