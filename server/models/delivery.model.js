const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  shippingMethod: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
});

const deliveryModel = mongoose.model("delivery", deliverySchema);

module.exports = deliveryModel;
