// models/User.js
// This defines the shape of a "User" document stored in MongoDB.

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,   // no two users can sign up with the same email
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true   // this will store the HASHED password, never plain text
    }
  },
  {
    timestamps: true // automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", userSchema);
