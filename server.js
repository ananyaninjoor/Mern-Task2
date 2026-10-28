// server.js
// This is the main entry point of the backend.
// It sets up Express, connects to MongoDB, and loads the auth routes.

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());           // allow the React app (different port) to call this API
app.use(express.json());   // allow the server to read JSON from the request body

// Routes
// Every route in authRoutes.js is prefixed with /api/auth
// e.g. POST /api/auth/signup , POST /api/auth/login
app.use("/api/auth", authRoutes);

// Simple test route to check the server is alive
app.get("/", (req, res) => {
  res.send("Signup API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
