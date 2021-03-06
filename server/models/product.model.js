const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  path: { type: String, required: true },
  categories: { type: [String], required: true },
  stock: { type: Number },
  quantity: { type: Number }
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;
