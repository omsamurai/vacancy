// ─────────────────────────────────────────
// server.js — Entry point of our backend
// This file:
// 1. Creates the Express app
// 2. Connects to MongoDB
// 3. Registers all routes
// 4. Starts listening for requests
// ─────────────────────────────────────────

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // Loads variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────
// MIDDLEWARE
// These run on every single request
// before it reaches your routes
// ─────────────────────────────────────────

// Allow React (localhost:3000) to call this API
app.use(cors());

// Parse incoming JSON request bodies
// Without this, req.body would be undefined
app.use(express.json());

// ─────────────────────────────────────────
// DATABASE CONNECTION
// ─────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ─────────────────────────────────────────
// ROUTES
// Each route file handles a specific resource
// We will create these files in the next steps
// ─────────────────────────────────────────

const jobRoutes  = require("./routes/jobs");
//const blogRoutes = require("./routes/blogs");

app.use("/api/jobs",  jobRoutes);   // All job routes → /api/jobs
//app.use("/api/blogs", blogRoutes);  // All blog routes → /api/blogs

// ─────────────────────────────────────────
// ROOT ROUTE — just to test server is alive
// Visit http://localhost:5000 in browser
// ─────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "🔥 JobSpark API is running!" });
});

// ─────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});