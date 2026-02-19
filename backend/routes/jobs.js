// ─────────────────────────────────────────
// routes/jobs.js
// Defines the URL endpoints for jobs
// and connects them to controller functions
// ─────────────────────────────────────────

const express = require("express");
const router = express.Router();

const {
  getJobs,
  getJobById,
  createJob,
  deleteJob,
} = require("../controllers/jobController");

// GET  /api/jobs        → get all jobs (with optional filters)
router.get("/", getJobs);

// GET  /api/jobs/:id    → get one job by id
router.get("/:id", getJobById);

// POST /api/jobs        → create a new job
router.post("/", createJob);

// DELETE /api/jobs/:id  → delete a job
router.delete("/:id", deleteJob);

module.exports = router;