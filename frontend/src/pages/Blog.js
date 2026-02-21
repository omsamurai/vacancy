import { useState, useEffect } from "react";

const CATEGORY_EMOJI = {
  "Career Tips": "💡",
  "Remote Work": "🏡",
  "Skills":      "🚀",
};

const CATEGORY_COLORS = {
  "Career Tips": { bg: "#fff7ed", border: "#fed7aa", color: "#ea580c" },
  "Remote Work": { bg: "#f0fdf4", border: "#bbf7d0", color: "#16a34a" },
  "Skills":      { bg: "#eff6ff", border: "#bfdbfe", color: "#2563eb" },
};

function Blog() {
  const [blogs, setBlogs]       = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [visible, setVisible]   = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchBlogs();
    setTimeout(() => setVisible(true), 100);
  }, []);

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

  // Get unique categories from blogs
  const categories = ["All", ...new Set(blogs.map(b => b.category))];

  // Filter by active category
  const filteredBlogs = activeCategory === "All"
    ? blogs
    : blogs.filter(b => b.category === activeCategory);

  // ── FULL ARTICLE VIEW ──
  if (selected) {
    return (
      <ArticleView
        blog={selected}
        onBack={() => setSelected(null)}
        allBlogs={blogs}
        onSelect={setSelected}
      />
    );
  }

  // ── BLOG LIST VIEW ──
  return (
    <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}>

      {/* Page Header */}
      <div style={styles.pageHeader}>
        <div style={styles.pageHeaderInner}>
          <div style={styles.headerBadge}>📰 Career Resources</div>
          <h1 style={styles.pageTitle}>Career Blog</h1>
          <p style={styles.pageSub}>
            Tips, insights, and guides to help you land your dream job
          </p>
        </div>
      </div>

      <div style={styles.section}>

        {/* Category filters */}
        <div style={styles.categoryRow}>
          {categories.map(cat => {
            const c = CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  ...styles.categoryBtn,
                  background: activeCategory === cat
                    ? (c ? c.bg : "#f1f5f9")
                    : "#ffffff",
                  color: activeCategory === cat
                    ? (c ? c.color : "#0f172a")
                    : "#64748b",
                  border: activeCategory === cat
                    ? `2px solid ${c ? c.border : "#e2e8f0"}`
                    : "2px solid #e2e8f0",
                  fontWeight: activeCategory === cat ? 700 : 500,
                }}
              >
                {CATEGORY_EMOJI[cat] || "📚"} {cat}
              </button>
            );
          })}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div style={styles.grid}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={styles.skeletonCard}>
                <div style={styles.skeletonBanner} />
                <div style={{ padding: "20px" }}>
                  <div style={styles.skeletonLine(30, 11)} />
                  <div style={styles.skeletonLine(90, 16)} />
                  <div style={styles.skeletonLine(70, 16)} />
                  <div style={styles.skeletonLine(100, 13)} />
                  <div style={styles.skeletonLine(100, 13)} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results count */}
        {!loading && (
          <p style={styles.resultsCount}>
            Showing <strong>{filteredBlogs.length}</strong> article{filteredBlogs.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </p>
        )}

        {/* Blog grid */}
        {!loading && (
          <div style={styles.grid}>
            {filteredBlogs.map((blog, i) => (
              <div
                key={blog._id}
                style={{
                  animation: "fadeInUp 0.4s ease forwards",
                  animationDelay: `${i * 0.08}s`,
                  opacity: 0,
                }}
              >
                <BlogCard
                  blog={blog}
                  onClick={() => setSelected(blog)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredBlogs.length === 0 && (
          <div style={styles.emptyState}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
            <h3 style={styles.emptyTitle}>No articles yet</h3>
            <p style={styles.emptySub}>Check back soon for new content!</p>
          </div>
        )}

      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// BLOG CARD COMPONENT
// ─────────────────────────────────────────
function BlogCard({ blog, onClick }) {
  const [hovered, setHovered] = useState(false);
  const c = CATEGORY_COLORS[blog.category] || { bg: "#f1f5f9", border: "#e2e8f0", color: "#475569" };

  return (
    <div
      style={{
        ...styles.card,
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered
          ? "0 20px 48px rgba(0,0,0,0.12)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        border: hovered ? "1px solid #f97316" : "1px solid #e2e8f0",
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Banner */}
      <div style={styles.banner}>
        <span style={styles.bannerEmoji}>
          {CATEGORY_EMOJI[blog.category] || "📝"}
        </span>
        {/* Read time badge */}
        <div style={styles.readTimeBadge}>
          ⏱ {blog.readTime} read
        </div>
      </div>

      <div style={styles.cardBody}>
        {/* Category pill */}
        <span style={{ ...styles.categoryPill, background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
          {blog.category}
        </span>

        <h3 style={styles.cardTitle}>{blog.title}</h3>
        <p style={styles.excerpt}>{blog.excerpt}</p>

        {/* Footer */}
        <div style={styles.cardFooter}>
          <div style={styles.authorRow}>
            <div style={styles.authorAvatar}>
              {blog.author?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={styles.authorName}>{blog.author}</div>
              <div style={styles.authorDate}>{blog.date || "Recently"}</div>
            </div>
          </div>
          <span style={{
            ...styles.readMoreBtn,
            color: hovered ? "#ea580c" : "#f97316",
          }}>
            Read →
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// ARTICLE VIEW COMPONENT
// ─────────────────────────────────────────
function ArticleView({ blog, onBack, allBlogs, onSelect }) {
  const [visible, setVisible] = useState(false);
  const c = CATEGORY_COLORS[blog.category] || { bg: "#f1f5f9", border: "#e2e8f0", color: "#475569" };

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [blog]);

  // Related blogs — same category, excluding current
  const related = allBlogs
    .filter(b => b._id !== blog._id && b.category === blog.category)
    .slice(0, 2);

  return (
    <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}>

      {/* Article Header */}
      <div style={styles.articleHeader}>
        <div style={styles.articleHeaderInner}>
          <button onClick={onBack} style={styles.backBtn}>
            ← Back to Blog
          </button>
          <span style={{ ...styles.categoryPill, background: c.bg, color: c.color, border: `1px solid ${c.border}`, marginTop: "20px", display: "inline-block" }}>
            {CATEGORY_EMOJI[blog.category]} {blog.category}
          </span>
          <h1 style={styles.articleTitle}>{blog.title}</h1>
          <div style={styles.articleMeta}>
            <div style={styles.articleAuthorRow}>
              <div style={styles.articleAvatar}>
                {blog.author?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={styles.articleAuthorName}>{blog.author}</div>
                <div style={styles.articleDate}>
                  {blog.date || "Recently"} · {blog.readTime} read
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div style={styles.articleLayout}>
        <div style={styles.articleBody}>

          {/* Excerpt highlight */}
          <div style={styles.excerptBox}>
            <p style={styles.excerptText}>{blog.excerpt}</p>
          </div>

          {/* Content */}
          <div style={styles.articleContent}>
            {blog.content.split(". ").map((sentence, i) => (
              sentence.trim() && (
                <p key={i} style={styles.contentParagraph}>
                  {sentence.trim()}{sentence.endsWith(".") ? "" : "."}
                </p>
              )
            ))}
          </div>

          {/* Tags */}
          <div style={styles.articleTags}>
            <span style={styles.tagsLabel}>Topics:</span>
            {[blog.category, "Career", "Tips"].map(tag => (
              <span key={tag} style={styles.articleTag}>{tag}</span>
            ))}
          </div>

        </div>

        {/* Sidebar */}
        <div style={styles.articleSidebar}>

          {/* Author card */}
          <div style={styles.authorCard}>
            <h4 style={styles.authorCardTitle}>About the Author</h4>
            <div style={styles.authorCardRow}>
              <div style={{ ...styles.articleAvatar, width: "52px", height: "52px", fontSize: "22px" }}>
                {blog.author?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "15px" }}>{blog.author}</div>
                <div style={{ color: "#94a3b8", fontSize: "13px" }}>Career Writer</div>
              </div>
            </div>
            <p style={styles.authorBio}>
              Passionate about helping professionals navigate their careers and land their dream jobs.
            </p>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div style={styles.relatedCard}>
              <h4 style={styles.authorCardTitle}>Related Articles</h4>
              {related.map(b => (
                <div
                  key={b._id}
                  style={styles.relatedItem}
                  onClick={() => onSelect(b)}
                >
                  <span style={styles.relatedEmoji}>
                    {CATEGORY_EMOJI[b.category] || "📝"}
                  </span>
                  <span style={styles.relatedTitle}>{b.title}</span>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────
const styles = {
  // Page header
  pageHeader: {
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    padding: "64px 40px 56px",
    textAlign: "center",
    color: "#ffffff",
  },
  pageHeaderInner: {
    maxWidth: "700px",
    margin: "0 auto",
  },
  headerBadge: {
    display: "inline-block",
    background: "rgba(249,115,22,0.15)",
    border: "1px solid rgba(249,115,22,0.3)",
    borderRadius: "20px",
    padding: "5px 16px",
    fontSize: "13px",
    color: "#fdba74",
    fontWeight: 600,
    marginBottom: "16px",
  },
  pageTitle: {
    fontSize: "42px",
    fontWeight: 900,
    letterSpacing: "-1px",
    marginBottom: "12px",
  },
  pageSub: {
    color: "#94a3b8",
    fontSize: "16px",
    lineHeight: 1.6,
  },

  // Section
  section: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "48px 40px 80px",
  },

  // Category filter
  categoryRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "32px",
    flexWrap: "wrap",
  },
  categoryBtn: {
    padding: "9px 18px",
    borderRadius: "24px",
    cursor: "pointer",
    fontSize: "14px",
    fontFamily: "Poppins, sans-serif",
    transition: "all 0.2s",
  },

  // Results count
  resultsCount: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "24px",
  },

  // Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
  },

  // Blog card
  card: {
    background: "#ffffff",
    borderRadius: "20px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.25s ease",
    display: "flex",
    flexDirection: "column",
  },
  banner: {
    height: "180px",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0c4a6e 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  bannerEmoji: {
    fontSize: "60px",
  },
  readTimeBadge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "20px",
    padding: "4px 10px",
    fontSize: "11px",
    color: "#ffffff",
    fontWeight: 600,
  },
  cardBody: {
    padding: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1,
  },
  categoryPill: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.3px",
    alignSelf: "flex-start",
  },
  cardTitle: {
    fontSize: "17px",
    fontWeight: 700,
    color: "#0f172a",
    lineHeight: 1.35,
  },
  excerpt: {
    fontSize: "13px",
    color: "#64748b",
    lineHeight: 1.65,
    flex: 1,
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "14px",
    borderTop: "1px solid #f1f5f9",
    marginTop: "auto",
  },
  authorRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  authorAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f97316, #ea580c)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "14px",
    flexShrink: 0,
  },
  authorName: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#0f172a",
  },
  authorDate: {
    fontSize: "11px",
    color: "#94a3b8",
  },
  readMoreBtn: {
    fontSize: "13px",
    fontWeight: 700,
    transition: "color 0.2s",
  },

  // Skeleton
  skeletonCard: {
    background: "#ffffff",
    borderRadius: "20px",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
  },
  skeletonBanner: {
    height: "180px",
    background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
  },
  skeletonLine: (width, height) => ({
    background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
    borderRadius: "6px",
    height: `${height}px`,
    width: `${width}%`,
    marginBottom: "10px",
  }),

  // Empty state
  emptyState: {
    textAlign: "center",
    padding: "80px 40px",
  },
  emptyTitle: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: "8px",
  },
  emptySub: {
    color: "#64748b",
    fontSize: "14px",
  },

  // Article header
  articleHeader: {
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    padding: "48px 40px 56px",
    color: "#ffffff",
  },
  articleHeaderInner: {
    maxWidth: "820px",
    margin: "0 auto",
  },
  backBtn: {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#ffffff",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
    fontFamily: "Poppins, sans-serif",
    transition: "all 0.2s",
  },
  articleTitle: {
    fontSize: "clamp(24px, 4vw, 40px)",
    fontWeight: 900,
    lineHeight: 1.15,
    marginTop: "16px",
    marginBottom: "20px",
    letterSpacing: "-0.5px",
  },
  articleMeta: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  articleAuthorRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  articleAvatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f97316, #ea580c)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "18px",
    flexShrink: 0,
  },
  articleAuthorName: {
    fontWeight: 700,
    color: "#ffffff",
    fontSize: "15px",
  },
  articleDate: {
    color: "#94a3b8",
    fontSize: "13px",
  },

  // Article layout
  articleLayout: {
    display: "flex",
    gap: "32px",
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "48px 40px 80px",
    alignItems: "flex-start",
  },
  articleBody: {
    flex: 1,
    minWidth: 0,
  },
  excerptBox: {
    background: "#fff7ed",
    border: "1px solid #fed7aa",
    borderLeft: "4px solid #f97316",
    borderRadius: "12px",
    padding: "20px 24px",
    marginBottom: "32px",
  },
  excerptText: {
    fontSize: "16px",
    color: "#9a3412",
    lineHeight: 1.7,
    fontStyle: "italic",
    margin: 0,
  },
  articleContent: {
    marginBottom: "32px",
  },
  contentParagraph: {
    fontSize: "16px",
    lineHeight: 1.85,
    color: "#334155",
    marginBottom: "18px",
  },
  articleTags: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
    paddingTop: "24px",
    borderTop: "1px solid #e2e8f0",
  },
  tagsLabel: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#64748b",
  },
  articleTag: {
    padding: "4px 12px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
    color: "#475569",
  },

  // Sidebar
  articleSidebar: {
    width: "280px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    position: "sticky",
    top: "88px",
  },
  authorCard: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  authorCardTitle: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: "16px",
  },
  authorCardRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  authorBio: {
    fontSize: "13px",
    color: "#64748b",
    lineHeight: 1.6,
    margin: 0,
  },
  relatedCard: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  relatedItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    padding: "12px 0",
    borderBottom: "1px solid #f1f5f9",
    cursor: "pointer",
  },
  relatedEmoji: {
    fontSize: "18px",
    flexShrink: 0,
  },
  relatedTitle: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#0f172a",
    lineHeight: 1.4,
    transition: "color 0.2s",
  },
};

export default Blog;