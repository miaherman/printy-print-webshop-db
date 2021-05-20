const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: { type: "String", required: true },
  username: { type: "String", required: true },
  password: { type: "String", required: true },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;


