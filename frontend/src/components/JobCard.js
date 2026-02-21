import { useState } from "react";

function JobCard({ job }) {
  const [saved, setSaved]       = useState(false);
  const [hovered, setHovered]   = useState(false);
  const [applied, setApplied]   = useState(false);

  function getBadgeStyle(type) {
    if (type === "Full-time")  return { bg: "#dcfce7", color: "#16a34a" };
    if (type === "Contract")   return { bg: "#fef3c7", color: "#d97706" };
    if (type === "Part-time")  return { bg: "#dbeafe", color: "#2563eb" };
    if (type === "Internship") return { bg: "#fce7f3", color: "#db2777" };
    return { bg: "#f1f5f9", color: "#475569" };
  }

  const badge = getBadgeStyle(job.type);

  return (
    <div
      style={{
        ...styles.card,
        boxShadow: hovered
          ? "0 16px 40px rgba(0,0,0,0.1)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-5px)" : "none",
        border: hovered
          ? "1px solid #f97316"
          : "1px solid #e2e8f0",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* TOP — title, company, badge */}
      <div style={styles.top}>
        <div style={styles.companyLogoBox}>
          {job.company?.charAt(0).toUpperCase()}
        </div>
        <div style={styles.topRight}>
          <span style={{ ...styles.badge, background: badge.bg, color: badge.color }}>
            {job.type}
          </span>
        </div>
      </div>

      <h3 style={styles.jobTitle}>{job.title}</h3>
      <div style={styles.company}>{job.company}</div>

      {/* META */}
      <div style={styles.meta}>
        <span style={styles.metaItem}>📍 {job.location}</span>
        <span style={styles.metaDot}>·</span>
        <span style={styles.metaItem}>🕒 {job.posted || "Recently"}</span>
      </div>

      {/* TAGS */}
      <div style={styles.tags}>
        {job.tags?.slice(0, 3).map(tag => (
          <span key={tag} style={styles.tag}>{tag}</span>
        ))}
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <div style={styles.salary}>
          <span style={styles.salaryLabel}>Salary</span>
          <span style={styles.salaryValue}>{job.salary || "Negotiable"}</span>
        </div>
        <div style={styles.btnGroup}>
          <button
            onClick={(e) => { e.stopPropagation(); setSaved(s => !s); }}
            style={styles.saveBtn(saved)}
            title={saved ? "Unsave" : "Save job"}
          >
            {saved ? "★" : "☆"}
          </button>
          <button
            onClick={() => setApplied(true)}
            style={styles.applyBtn(applied)}
            disabled={applied}
          >
            {applied ? "✓ Applied" : "Apply Now"}
          </button>
        </div>
      </div>

    </div>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "24px",
    transition: "all 0.25s ease",
    cursor: "pointer",
    height: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "14px",
  },
  companyLogoBox: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: "18px",
  },
  topRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  badge: {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.3px",
  },
  jobTitle: {
    fontSize: "17px",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: "4px",
    lineHeight: 1.3,
  },
  company: {
    color: "#f97316",
    fontWeight: 600,
    fontSize: "14px",
    marginBottom: "12px",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "14px",
    flexWrap: "wrap",
  },
  metaItem: {
    fontSize: "13px",
    color: "#64748b",
  },
  metaDot: {
    color: "#cbd5e1",
    fontSize: "13px",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginBottom: "18px",
    flex: 1,
  },
  tag: {
    padding: "4px 10px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 600,
    color: "#475569",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "16px",
    borderTop: "1px solid #f1f5f9",
    marginTop: "auto",
  },
  salary: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  salaryLabel: {
    fontSize: "11px",
    color: "#94a3b8",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  salaryValue: {
    fontSize: "15px",
    fontWeight: 800,
    color: "#0f172a",
  },
  btnGroup: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  saveBtn: (saved) => ({
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    border: `1px solid ${saved ? "#f97316" : "#e2e8f0"}`,
    background: saved ? "#fff7ed" : "#ffffff",
    color: saved ? "#f97316" : "#94a3b8",
    cursor: "pointer",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
    fontFamily: "Poppins, sans-serif",
  }),
  applyBtn: (applied) => ({
    padding: "9px 18px",
    background: applied
      ? "#f0fdf4"
      : "linear-gradient(135deg, #f97316, #ea580c)",
    color: applied ? "#16a34a" : "#ffffff",
    border: applied ? "1px solid #bbf7d0" : "none",
    borderRadius: "10px",
    fontWeight: 700,
    fontSize: "13px",
    cursor: applied ? "default" : "pointer",
    fontFamily: "Poppins, sans-serif",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  }),
};

export default JobCard;