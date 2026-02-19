// ─────────────────────────────────────────
// controllers/blogController.js
// Logic for each blog route
// ─────────────────────────────────────────

const Blog = require("../models/Blog");

// ── GET ALL BLOGS ──
// Called when: GET /api/blogs
const getBlogs = async (req, res) => {
  try {
    // Fetch all blogs, newest first
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ── GET SINGLE BLOG ──
// Called when: GET /api/blogs/:id
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ── CREATE BLOG ──
// Called when: POST /api/blogs
// Body: { title, author, category, excerpt, content, readTime }
const createBlog = async (req, res) => {
  try {
    const { title, author, category, excerpt, content, readTime } = req.body;

    // Basic validation
    if (!title || !author || !category || !excerpt || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const blog = await Blog.create({
      title,
      author,
      category,
      excerpt,
      content,
      readTime,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully!",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ── DELETE BLOG ──
// Called when: DELETE /api/blogs/:id
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getBlogs, getBlogById, createBlog, deleteBlog };