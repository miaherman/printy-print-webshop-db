const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true)

const userSchema = new mongoose.Schema({
  role: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, select: false },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;


