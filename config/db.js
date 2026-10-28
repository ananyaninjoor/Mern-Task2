// config/db.js
// This file handles connecting to MongoDB using Mongoose.

const mongoose = require("mongoose");

async function connectDB() {
  try {
  const mongoUri = "mongodb+srv://Ananya123:Ananya123@cluster0.hcry3c3.mongodb.net/mernTask2?retryWrites=true&w=majority";

    await mongoose.connect(mongoUri);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error("Make sure MongoDB is running and MONGO_URI in .env is correct.");
    process.exit(1); // stop the server if the database is not connected
  }
}

module.exports = connectDB;
