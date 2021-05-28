const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  shippingMethod: { type: String, required: true },
  time: { type: Number, required: true },
  price: { type: Number, required: true },
});

const DeliveryModel = mongoose.model("delivery", deliverySchema);

module.exports = DeliveryModel;
