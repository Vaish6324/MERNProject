const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicUrl: { type: String }, // Field for Cloudinary image URL
});

const User = mongoose.model("User", userSchema);
module.exports = User;
