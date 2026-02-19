import { useState, useEffect } from "react";

const CATEGORY_EMOJI = {
  "Career Tips": "💡",
  "Remote Work": "🏡",
  "Skills":      "🚀",
};

function Blog() {
  const [blogs, setBlogs]     = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from backend when page loads
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res  = await fetch("http://localhost:5000/api/blogs");
        const data = await res.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.log("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  // ── FULL ARTICLE VIEW ──
  if (selected) {
    return (
      <div style={styles.articleSection}>

        <button
          onClick={() => setSelected(null)}
          style={styles.backBtn}
        >
          ← Back to Blog
        </button>

        <span style={styles.category}>{selected.category}</span>

        <h1 style={styles.articleTitle}>{selected.title}</h1>

        <div style={styles.articleMeta}>
          ✍️ {selected.author} &nbsp;·&nbsp;
          ⏱ {selected.readTime} read
        </div>

        <p style={styles.articleContent}>{selected.content}</p>

      </div>
    );
  }

  // ── BLOG LIST VIEW ──
  return (
    <div style={styles.section}>

      <h2 style={styles.title}>Career Blog</h2>
      <p style={styles.sub}>
        Tips, insights, and guides for job seekers and employers
      </p>

      {loading && (
        <p style={{ color: "#888" }}>Loading blogs...</p>
      )}

      {!loading && (
        <div style={styles.grid}>
          {blogs.map(blog => (
            <BlogCard
              key={blog._id}
              blog={blog}
              onClick={() => setSelected(blog)}
            />
          ))}
        </div>
      )}

    </div>
  );
}

// ─────────────────────────────────────────
// BLOG CARD COMPONENT
// ─────────────────────────────────────────
function BlogCard({ blog, onClick }) {
  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.banner}>
        <span style={styles.bannerEmoji}>
          {CATEGORY_EMOJI[blog.category] || "📝"}
        </span>
      </div>
      <div style={styles.cardBody}>
        <span style={styles.category}>{blog.category}</span>
        <h3 style={styles.cardTitle}>{blog.title}</h3>
        <p style={styles.excerpt}>{blog.excerpt}</p>
        <div style={styles.cardMeta}>
          <span>✍️ {blog.author}</span>
          <span>⏱ {blog.readTime} read</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  section: {
    padding: "60px 40px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  title: {
    fontSize: "32px",
    fontWeight: 800,
    marginBottom: "8px",
    color: "#1a1a2e",
    letterSpacing: "-0.5px",
  },
  sub: {
    color: "#888888",
    marginBottom: "36px",
    fontSize: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid #e8e4de",
    cursor: "pointer",
  },
  banner: {
    height: "160px",
    background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerEmoji: {
    fontSize: "56px",
  },
  cardBody: {
    padding: "20px",
  },
  category: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#f97316",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  cardTitle: {
    fontSize: "17px",
    fontWeight: 700,
    margin: "8px 0 10px",
    lineHeight: 1.3,
    color: "#1a1a2e",
  },
  excerpt: {
    fontSize: "13px",
    color: "#888888",
    lineHeight: 1.6,
    marginBottom: "16px",
  },
  cardMeta: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#aaaaaa",
  },
  articleSection: {
    padding: "60px 40px",
    maxWidth: "720px",
    margin: "0 auto",
  },
  backBtn: {
    border: "none",
    background: "none",
    color: "#f97316",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "15px",
    marginBottom: "24px",
    padding: 0,
  },
  articleTitle: {
    fontSize: "36px",
    fontWeight: 900,
    margin: "12px 0",
    letterSpacing: "-0.5px",
    color: "#1a1a2e",
    lineHeight: 1.2,
  },
  articleMeta: {
    color: "#888888",
    fontSize: "14px",
    marginBottom: "32px",
    paddingBottom: "24px",
    borderBottom: "1px solid #e8e4de",
  },
  articleContent: {
    fontSize: "16px",
    lineHeight: 1.9,
    color: "#444444",
  },
};

export default Blog;