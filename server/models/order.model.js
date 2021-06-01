const mongoose = require("mongoose");
const ProductModel = require("./product.model")
const UserModel = require("./user.model")
const DeliveryModel = require("./delivery.model")


const orderSchema = new mongoose.Schema({
  delivery: { type: DeliveryModel.schema, required: true },
  price: { type: Number, required: true },
  products: { type: [ProductModel.schema], required: true },
  customer: { type: UserModel.schema, required: true }
}, {
  timestamps: true
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;