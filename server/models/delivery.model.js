const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  deliveryOption: { type: String, required: true },
});

const deliveryModel = mongoose.model("delivery", deliverySchema);

module.exports = deliveryModel;
