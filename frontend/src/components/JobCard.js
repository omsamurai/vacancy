import { useState } from "react";

// JobCard receives a single job object as a prop
// and displays it as a card
function JobCard({ job }) {

  // Track if this job is saved/bookmarked
  const [saved, setSaved] = useState(false);

  return (
    <div style={styles.card}>

      {/* TOP ROW — title, company, job type badge */}
      <div style={styles.topRow}>
        <div>
          <div style={styles.title}>{job.title}</div>
          <div style={styles.company}>{job.company}</div>
        </div>
        <span style={styles.badge(job.type)}>{job.type}</span>
      </div>

      {/* META — location and posted date */}
      <div style={styles.meta}>
        <span>📍 {job.location}</span>
        <span>🕒 {job.posted}</span>
      </div>

      {/* TAGS — skills required */}
      <div style={styles.tags}>
        {job.tags.map(tag => (
          <span key={tag} style={styles.tag}>{tag}</span>
        ))}
      </div>

      {/* FOOTER — salary and action buttons */}
      <div style={styles.footer}>
        <span style={styles.salary}>{job.salary}</span>
        <div style={styles.btnRow}>

          {/* Save button toggles between saved and unsaved */}
          <button
            onClick={() => setSaved(s => !s)}
            style={styles.saveBtn(saved)}
          >
            {saved ? "★ Saved" : "☆ Save"}
          </button>

          <button style={styles.applyBtn}>Apply</button>
        </div>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────
const styles = {
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid #e8e4de",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px",
  },
  title: {
    fontSize: "17px",
    fontWeight: 700,
    color: "#1a1a2e",
  },
  company: {
    color: "#f97316",
    fontWeight: 600,
    fontSize: "14px",
    marginTop: "2px",
  },

  // Badge color changes based on job type
  badge: (type) => ({
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
    background:
      type === "Full-time" ? "#dcfce7" :
      type === "Contract"  ? "#fef3c7" : "#dbeafe",
    color:
      type === "Full-time" ? "#16a34a" :
      type === "Contract"  ? "#d97706" : "#2563eb",
  }),

  meta: {
    display: "flex",
    gap: "16px",
    color: "#888888",
    fontSize: "13px",
    margin: "12px 0",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginTop: "12px",
  },
  tag: {
    padding: "4px 10px",
    background: "#f1f0ec",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 600,
    color: "#555555",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "16px",
    paddingTop: "16px",
    borderTop: "1px solid #f0ece6",
  },
  salary: {
    fontWeight: 700,
    color: "#1a1a2e",
    fontSize: "15px",
  },
  btnRow: {
    display: "flex",
    gap: "8px",
  },
  saveBtn: (saved) => ({
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "13px",
    background: saved ? "#f97316" : "#f1f0ec",
    color: saved ? "#ffffff" : "#555555",
  }),
  applyBtn: {
    padding: "8px 18px",
    background: "#1a1a2e",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "13px",
  },
};

export default JobCard;