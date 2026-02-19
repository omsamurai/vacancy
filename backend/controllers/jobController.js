// ─────────────────────────────────────────
// controllers/jobController.js
// Contains the actual logic for each route
// Routes call these functions
// ─────────────────────────────────────────

const Job = require("../models/Job");

// ── GET ALL JOBS ──
// Called when: GET /api/jobs
// Supports optional filters: ?type=Full-time&search=react
const getJobs = async (req, res) => {
  try {
    const { type, search } = req.query;

    // Build filter object dynamically
    let filter = {};

    // Filter by job type if provided
    if (type && type !== "All") {
      filter.type = type;
    }

    // Search by title, company, or tags if provided
    if (search) {
      filter.$or = [
        { title:   { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { tags:    { $elemMatch: { $regex: search, $options: "i" } } },
      ];
    }

    // Fetch from DB, newest first
    const jobs = await Job.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ── GET SINGLE JOB ──
// Called when: GET /api/jobs/:id
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ── CREATE JOB ──
// Called when: POST /api/jobs
// Body: { title, company, location, type, salary, email, description, tags }
const createJob = async (req, res) => {
  try {
    const { title, company, location, type, salary, email, description, tags } = req.body;

    // Basic validation
    if (!title || !company || !email || !description) {
      return res.status(400).json({
        success: false,
        message: "Title, company, email and description are required",
      });
    }

    // Create and save new job to MongoDB
    const job = await Job.create({
      title,
      company,
      location,
      type,
      salary,
      email,
      description,
      tags,
    });

    res.status(201).json({
      success: true,
      message: "Job posted successfully!",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ── DELETE JOB ──
// Called when: DELETE /api/jobs/:id
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getJobs, getJobById, createJob, deleteJob };