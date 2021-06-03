const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
  role: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  zipCode: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, required: true },
  phoneNr: { type: String, required: true },
  password: { type: String, select: false },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;