import { useState } from "react";
import { MOCK_JOBS } from "../data/mockData";
import JobCard from "../components/JobCard";

function Jobs() {

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filterTypes = ["All", "Full-time", "Contract", "Part-time"];

  // FILTER LOGIC
  // 1. Filter by job type (Full-time, Contract, Part-time)
  // 2. Filter by search text (title, company, or tags)
  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchType = filter === "All" || job.type === filter;
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchType && matchSearch;
  });

  return (
    <div style={styles.section}>

      <h2 style={styles.title}>Browse Jobs</h2>
      <p style={styles.sub}>
        Explore {MOCK_JOBS.length} open positions across various industries
      </p>

      {/* SEARCH INPUT */}
      <input
        style={styles.searchInput}
        placeholder="Search by title, company, or skill..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* FILTER BUTTONS */}
      <div style={styles.filterRow}>
        {filterTypes.map(type => (
          <button
            key={type}
            style={styles.filterBtn(filter === type)}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* JOB CARDS GRID */}
      <div style={styles.grid}>
        {filteredJobs.length === 0
          ? <p style={styles.noResults}>No jobs found. Try a different search.</p>
          : filteredJobs.map(job => <JobCard key={job.id} job={job} />)
        }
      </div>

    </div>
  );
}

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────
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
    marginBottom: "28px",
    fontSize: "16px",
  },
  searchInput: {
    width: "100%",
    maxWidth: "420px",
    padding: "12px 16px",
    border: "1px solid #e8e4de",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
    marginBottom: "16px",
    display: "block",
  },
  filterRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "28px",
    flexWrap: "wrap",
  },
  filterBtn: (isActive) => ({
    padding: "8px 18px",
    borderRadius: "8px",
    border: isActive ? "none" : "1px solid #e8e4de",
    background: isActive ? "#1a1a2e" : "#ffffff",
    color: isActive ? "#ffffff" : "#555555",
    fontWeight: isActive ? 700 : 500,
    cursor: "pointer",
    fontSize: "14px",
  }),
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px",
  },
  noResults: {
    color: "#888888",
    fontSize: "15px",
  },
};

export default Jobs;