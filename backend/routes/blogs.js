// ─────────────────────────────────────────
// routes/blogs.js
// Defines URL endpoints for blogs
// ─────────────────────────────────────────

const express = require("express");
const router = express.Router();

const {
  getBlogs,
  getBlogById,
  createBlog,
  deleteBlog,
} = require("../controllers/blogController");

// GET    /api/blogs      → get all blogs
router.get("/", getBlogs);

// GET    /api/blogs/:id  → get one blog
router.get("/:id", getBlogById);

// POST   /api/blogs      → create a blog
router.post("/", createBlog);

// DELETE /api/blogs/:id  → delete a blog
router.delete("/:id", deleteBlog);

module.exports = router;