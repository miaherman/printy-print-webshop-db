const mongoose = require("mongoose");
const UserModel = require("./user.model")

const customerSchema = new mongoose.Schema({
  user: { type: UserModel.schema, required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  zipCode: { type: Number, required: true },
  city: { type: String, required: true },
  email: { type: String, required: true },
  phoneNr: { type: Number, required: true },
});

const customerModel = mongoose.model("customer", customerSchema);

module.exports = customerModel;
