import { useState, useEffect } from "react";
import JobCard from "../components/JobCard";

function Jobs() {
  const [jobs, setJobs]       = useState([]);
  const [filter, setFilter]   = useState("All");
  const [search, setSearch]   = useState("");
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [sortBy, setSortBy]   = useState("newest");

  const filterTypes = ["All", "Full-time", "Contract", "Part-time", "Internship"];

  useEffect(() => {
    fetchJobs();
    setTimeout(() => setVisible(true), 100);
  }, []);

  async function fetchJobs() {
    try {
      setLoading(true);
      const res  = await fetch("http://localhost:5000/api/jobs");
      const data = await res.json();
      setJobs(data.jobs);
    } catch (error) {
      console.log("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }

  // Filter + search + sort logic
  const filteredJobs = jobs
    .filter(job => {
      const matchType = filter === "All" || job.type === filter;
      const matchSearch =
        job.title.toLowerCase().includes(search.toLowerCase())   ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchType && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  return (
    <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}>

      {/* ── PAGE HEADER ── */}
      <div style={styles.pageHeader}>
        <div style={styles.pageHeaderInner}>
          <div>
            <h1 style={styles.pageTitle}>Browse Jobs</h1>
            <p style={styles.pageSub}>
              Explore <strong style={{ color: "#f97316" }}>{jobs.length} open positions</strong> across various industries
            </p>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.sortBox}>
              <label style={styles.sortLabel}>Sort by:</label>
              <select
                style={styles.sortSelect}
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.layout}>

        {/* ── SIDEBAR FILTERS ── */}
        <div style={styles.sidebar}>
          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>🔍 Search</h3>
            <input
              style={styles.searchInput}
              placeholder="Title, company, skill..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>💼 Job Type</h3>
            <div style={styles.filterList}>
              {filterTypes.map(type => (
                <button
                  key={type}
                  style={styles.filterItem(filter === type)}
                  onClick={() => setFilter(type)}
                >
                  <span style={styles.filterDot(filter === type)} />
                  {type}
                  {filter === type && (
                    <span style={styles.filterCheck}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quick stats */}
          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>📊 Quick Stats</h3>
            {[
              { label: "Full-time",  count: jobs.filter(j => j.type === "Full-time").length,  color: "#dcfce7" },
              { label: "Contract",   count: jobs.filter(j => j.type === "Contract").length,   color: "#fef3c7" },
              { label: "Part-time",  count: jobs.filter(j => j.type === "Part-time").length,  color: "#dbeafe" },
              { label: "Internship", count: jobs.filter(j => j.type === "Internship").length, color: "#fce7f3" },
            ].map(s => (
              <div key={s.label} style={styles.statRow}>
                <span style={styles.statRowLabel}>{s.label}</span>
                <span style={{ ...styles.statRowCount, background: s.color }}>
                  {s.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── JOB LISTINGS ── */}
        <div style={styles.listings}>

          {/* Active filters display */}
          {(filter !== "All" || search) && (
            <div style={styles.activeFilters}>
              <span style={styles.activeFilterLabel}>Active filters:</span>
              {filter !== "All" && (
                <span style={styles.activeFilterTag}>
                  {filter}
                  <button
                    onClick={() => setFilter("All")}
                    style={styles.removeFilter}
                  >✕</button>
                </span>
              )}
              {search && (
                <span style={styles.activeFilterTag}>
                  "{search}"
                  <button
                    onClick={() => setSearch("")}
                    style={styles.removeFilter}
                  >✕</button>
                </span>
              )}
              <button
                onClick={() => { setFilter("All"); setSearch(""); }}
                style={styles.clearAll}
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results count */}
          <div style={styles.resultsBar}>
            <span style={styles.resultsCount}>
              Showing <strong>{filteredJobs.length}</strong> of <strong>{jobs.length}</strong> jobs
            </span>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div style={styles.grid}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} style={styles.skeleton}>
                  <div style={styles.skeletonLine(60, 18)} />
                  <div style={styles.skeletonLine(40, 14)} />
                  <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                    <div style={styles.skeletonLine(25, 12)} />
                    <div style={styles.skeletonLine(25, 12)} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Job cards */}
          {!loading && filteredJobs.length === 0 && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🔍</div>
              <h3 style={styles.emptyTitle}>No jobs found</h3>
              <p style={styles.emptySub}>
                Try adjusting your search or filters to find what you're looking for
              </p>
              <button
                onClick={() => { setFilter("All"); setSearch(""); }}
                style={styles.emptyBtn}
              >
                Clear filters
              </button>
            </div>
          )}

          {!loading && filteredJobs.length > 0 && (
            <div style={styles.grid}>
              {filteredJobs.map((job, i) => (
                <div
                  key={job._id}
                  style={{
                    animation: `fadeInUp 0.4s ease forwards`,
                    animationDelay: `${i * 0.05}s`,
                    opacity: 0,
                  }}
                >
                  <JobCard job={job} />
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
    padding: "48px 40px 40px",
    color: "#ffffff",
  },
  pageHeaderInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: "16px",
  },
  pageTitle: {
    fontSize: "36px",
    fontWeight: 900,
    letterSpacing: "-1px",
    marginBottom: "8px",
  },
  pageSub: {
    color: "#94a3b8",
    fontSize: "16px",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  sortBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  sortLabel: {
    fontSize: "13px",
    color: "#94a3b8",
    fontWeight: 600,
  },
  sortSelect: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "#ffffff",
    fontSize: "13px",
    fontFamily: "Poppins, sans-serif",
    cursor: "pointer",
    outline: "none",
  },

  // Layout
  layout: {
    display: "flex",
    gap: "28px",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 40px 64px",
    alignItems: "flex-start",
  },

  // Sidebar
  sidebar: {
    width: "260px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    position: "sticky",
    top: "88px",
  },
  sidebarCard: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "20px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  sidebarTitle: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: "14px",
  },
  searchInput: {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "13px",
    outline: "none",
    fontFamily: "Poppins, sans-serif",
    color: "#0f172a",
    boxSizing: "border-box",
    transition: "border 0.2s",
  },
  filterList: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  filterItem: (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "none",
    background: isActive ? "#fff7ed" : "transparent",
    color: isActive ? "#f97316" : "#475569",
    fontWeight: isActive ? 700 : 500,
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    textAlign: "left",
    transition: "all 0.2s",
    width: "100%",
  }),
  filterDot: (isActive) => ({
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: isActive ? "#f97316" : "#cbd5e1",
    flexShrink: 0,
    transition: "background 0.2s",
  }),
  filterCheck: {
    marginLeft: "auto",
    fontSize: "12px",
    color: "#f97316",
  },

  // Quick stats
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #f1f5f9",
  },
  statRowLabel: {
    fontSize: "13px",
    color: "#64748b",
  },
  statRowCount: {
    fontSize: "12px",
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: "20px",
    color: "#0f172a",
  },

  // Listings
  listings: {
    flex: 1,
    minWidth: 0,
  },

  // Active filters
  activeFilters: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
    flexWrap: "wrap",
  },
  activeFilterLabel: {
    fontSize: "13px",
    color: "#64748b",
    fontWeight: 600,
  },
  activeFilterTag: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 10px",
    background: "#fff7ed",
    border: "1px solid #fed7aa",
    borderRadius: "20px",
    fontSize: "13px",
    color: "#f97316",
    fontWeight: 600,
  },
  removeFilter: {
    background: "none",
    border: "none",
    color: "#f97316",
    cursor: "pointer",
    fontSize: "12px",
    padding: 0,
    lineHeight: 1,
  },
  clearAll: {
    background: "none",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: "13px",
    fontFamily: "Poppins, sans-serif",
    textDecoration: "underline",
    padding: 0,
  },

  // Results bar
  resultsBar: {
    marginBottom: "20px",
  },
  resultsCount: {
    fontSize: "14px",
    color: "#64748b",
  },

  // Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },

  // Skeleton loader
  skeleton: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid #e2e8f0",
  },
  skeletonLine: (width, height) => ({
    background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
    borderRadius: "6px",
    height: `${height}px`,
    width: `${width}%`,
    marginBottom: "8px",
  }),

  // Empty state
  emptyState: {
    textAlign: "center",
    padding: "80px 40px",
    background: "#ffffff",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
  },
  emptyIcon: {
    fontSize: "52px",
    marginBottom: "16px",
  },
  emptyTitle: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: "8px",
  },
  emptySub: {
    color: "#64748b",
    fontSize: "15px",
    marginBottom: "24px",
  },
  emptyBtn: {
    padding: "12px 28px",
    background: "#f97316",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
  },
};

export default Jobs;