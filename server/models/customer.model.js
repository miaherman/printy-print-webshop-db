const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  role: { type: "String", required: true },
  customername: { type: "String", required: true },
  password: { type: "String", required: true },
});

const customerModel = mongoose.model("customer", customerSchema);

module.exports = customerModel;
