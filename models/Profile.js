const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: String,
  email: String,
  location: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Profile", ProfileSchema);
