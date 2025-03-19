const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Email validation
  },
  password: { 
    type: String, 
    required: true // ✅ Removed maxlength to store hashed passwords
  },
  location: { type: String, required: true }
});

module.exports = mongoose.model("User", UserSchema);
