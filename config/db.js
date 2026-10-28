// config/db.js
// This file handles connecting to MongoDB using Mongoose.

const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error("Make sure MongoDB is running and MONGO_URI in .env is correct.");
    process.exit(1); // stop the server if the database is not connected
  }
}

module.exports = connectDB;
