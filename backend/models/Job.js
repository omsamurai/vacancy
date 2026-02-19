// ─────────────────────────────────────────
// models/Job.js
// Defines the shape of a Job document
// that gets saved in MongoDB
// ─────────────────────────────────────────

const mongoose = require("mongoose");

// Schema = blueprint for how job data looks in DB
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Cannot save a job without a title
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "Remote", // If no location given, default to Remote
    },
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      default: "Full-time",
    },
    salary: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    tags: [String], // Array of strings e.g. ["React", "Node"]
  },
  {
    timestamps: true, // Auto adds createdAt and updatedAt fields
  }
);

// Create the model from schema
// "Job" becomes the "jobs" collection in MongoDB
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;