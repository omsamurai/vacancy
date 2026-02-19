// ─────────────────────────────────────────
// models/Blog.js
// Defines the shape of a Blog document
// that gets saved in MongoDB
// ─────────────────────────────────────────

const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String, // Short preview text shown on card
      required: true,
    },
    content: {
      type: String, // Full article content
      required: true,
    },
    readTime: {
      type: String, // e.g. "5 min"
      default: "3 min",
    },
  },
  {
    timestamps: true, // Auto adds createdAt and updatedAt
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;