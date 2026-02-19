import { useState } from "react";

function Hire() {

  // All form fields stored in one state object
  // Each key matches the input's name attribute
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salary: "",
    email: "",
    description: "",
  });

  // Track if form was submitted successfully
  const [submitted, setSubmitted] = useState(false);

  // One function handles ALL input changes
  // e.target.name tells us which field changed
  // e.target.value is the new value
  function handleChange(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // Handle form submission
  // Right now just logs to console
  // Later we'll send this to: POST http://localhost:5000/api/jobs
  function handleSubmit(e) {
    e.preventDefault(); // Stop page from refreshing

    console.log("Job Posted:", form);
    // Future backend call will look like this:
    // fetch("http://localhost:5000/api/jobs", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });

    setSubmitted(true); // Show success screen
  }

  // ── SUCCESS SCREEN ──
  // Show this after form is submitted
  if (submitted) {
    return (
      <div style={styles.section}>
        <div style={styles.card}>
          <div style={styles.successBox}>
            <div style={styles.successIcon}>✅</div>
            <h2 style={styles.successTitle}>Job Posted Successfully!</h2>
            <p style={styles.successSub}>
              Your listing is now live. Candidates can start applying.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({ title: "", company: "", location: "", type: "Full-time", salary: "", email: "", description: "" });
              }}
              style={styles.submitBtn}
            >
              Post Another Job
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── FORM SCREEN ──
  return (
    <div style={styles.section}>
      <div style={styles.card}>

        <h2 style={styles.cardTitle}>Post a Job</h2>
        <p style={styles.cardSub}>
          Fill in the details below to attract the right candidates
        </p>

        <form onSubmit={handleSubmit}>

          {/* ROW 1 — Job Title + Company */}
          <div style={styles.row}>
            <div style={styles.group}>
              <label style={styles.label}>Job Title *</label>
              <input
                style={styles.input}
                name="title"
                required
                placeholder="e.g. React Developer"
                value={form.title}
                onChange={handleChange}
              />
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Company Name *</label>
              <input
                style={styles.input}
                name="company"
                required
                placeholder="e.g. TechCorp"
                value={form.company}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ROW 2 — Location + Job Type */}
          <div style={styles.row}>
            <div style={styles.group}>
              <label style={styles.label}>Location</label>
              <input
                style={styles.input}
                name="location"
                placeholder="e.g. Remote or Mumbai"
                value={form.location}
                onChange={handleChange}
              />
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Job Type</label>
              <select
                style={styles.input}
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
          </div>

          {/* ROW 3 — Salary + Email */}
          <div style={styles.row}>
            <div style={styles.group}>
              <label style={styles.label}>Salary Range</label>
              <input
                style={styles.input}
                name="salary"
                placeholder="e.g. $60k–$80k"
                value={form.salary}
                onChange={handleChange}
              />
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Contact Email *</label>
              <input
                style={styles.input}
                name="email"
                type="email"
                required
                placeholder="hr@company.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Job Description */}
          <div style={styles.group}>
            <label style={styles.label}>Job Description *</label>
            <textarea
              style={styles.textarea}
              name="description"
              required
              placeholder="Describe the role, responsibilities, and requirements..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <button type="submit" style={styles.submitBtn}>
            🚀 Post Job Now
          </button>

        </form>
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
    maxWidth: "720px",
    margin: "0 auto",
  },
  card: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "40px",
    border: "1px solid #e8e4de",
  },
  cardTitle: {
    fontSize: "26px",
    fontWeight: 800,
    marginBottom: "8px",
    color: "#1a1a2e",
  },
  cardSub: {
    color: "#888888",
    marginBottom: "28px",
    fontSize: "15px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "16px",
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: "4px",
  },
  label: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#555555",
  },
  input: {
    padding: "12px 16px",
    border: "1px solid #e8e4de",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
    color: "#1a1a2e",
  },
  textarea: {
    padding: "12px 16px",
    border: "1px solid #e8e4de",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
    minHeight: "120px",
    fontFamily: "inherit",
    resize: "vertical",
    color: "#1a1a2e",
  },
  submitBtn: {
    width: "100%",
    padding: "14px",
    background: "#f97316",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "8px",
  },

  // Success screen
  successBox: {
    textAlign: "center",
    padding: "20px 0",
  },
  successIcon: {
    fontSize: "64px",
    marginBottom: "16px",
  },
  successTitle: {
    fontSize: "24px",
    fontWeight: 800,
    color: "#1a1a2e",
    marginBottom: "10px",
  },
  successSub: {
    color: "#888888",
    marginBottom: "24px",
    fontSize: "15px",
  },
};

export default Hire;