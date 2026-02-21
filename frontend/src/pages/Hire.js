import { useState, useEffect } from "react";

function Hire() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salary: "",
    email: "",
    description: "",
    tags: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [visible, setVisible]     = useState(false);
  const [step, setStep]           = useState(1); // Multi-step form
  const [errors, setErrors]       = useState({});

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  }

  // Validate step 1 fields
  function validateStep1() {
    const newErrors = {};
    if (!form.title.trim())   newErrors.title   = "Job title is required";
    if (!form.company.trim()) newErrors.company = "Company name is required";
    if (!form.email.trim())   newErrors.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Validate step 2 fields
  function validateStep2() {
    const newErrors = {};
    if (!form.description.trim()) newErrors.description = "Job description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (validateStep1()) setStep(2);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoading(true);
    try {
      const payload = {
        ...form,
        // Convert comma-separated tags string to array
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      };

      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert("Something went wrong: " + data.message);
      }
    } catch (error) {
      alert("Could not connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  }

  // ── SUCCESS SCREEN ──
  if (submitted) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.successWrapper}>
          <div style={styles.successCard}>
            <div style={styles.successIconWrapper}>
              <div style={styles.successIcon}>✅</div>
            </div>
            <h2 style={styles.successTitle}>Job Posted Successfully!</h2>
            <p style={styles.successSub}>
              Your listing is now live and visible to thousands of job seekers.
            </p>

            {/* Summary */}
            <div style={styles.summaryBox}>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Position</span>
                <span style={styles.summaryValue}>{form.title}</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Company</span>
                <span style={styles.summaryValue}>{form.company}</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Type</span>
                <span style={styles.summaryValue}>{form.type}</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Location</span>
                <span style={styles.summaryValue}>{form.location || "Remote"}</span>
              </div>
            </div>

            <div style={styles.successBtns}>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setForm({ title: "", company: "", location: "", type: "Full-time", salary: "", email: "", description: "", tags: "" });
                }}
                style={styles.postAnotherBtn}
              >
                Post Another Job
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── FORM SCREEN ──
  return (
    <div style={{ ...styles.pageWrapper, opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}>

      {/* Page header */}
      <div style={styles.pageHeader}>
        <div style={styles.pageHeaderInner}>
          <h1 style={styles.pageTitle}>Post a Job</h1>
          <p style={styles.pageSub}>
            Reach thousands of qualified candidates in minutes
          </p>
        </div>
      </div>

      <div style={styles.formLayout}>

        {/* Left — tips panel */}
        <div style={styles.tipsPanel}>
          <h3 style={styles.tipsPanelTitle}>💡 Tips for a great listing</h3>
          {[
            { icon: "✍️", tip: "Write a clear, specific job title — avoid internal jargon" },
            { icon: "📋", tip: "Include key responsibilities and must-have skills" },
            { icon: "💰", tip: "Listings with salary ranges get 3x more applicants" },
            { icon: "📍", tip: "Mention if the role is remote, hybrid, or on-site" },
            { icon: "⚡", tip: "Keep descriptions concise — 200 to 400 words is ideal" },
          ].map((t, i) => (
            <div key={i} style={styles.tipItem}>
              <span style={styles.tipIcon}>{t.icon}</span>
              <span style={styles.tipText}>{t.tip}</span>
            </div>
          ))}

          {/* Stats */}
          <div style={styles.tipsStats}>
            <div style={styles.tipsStat}>
              <div style={styles.tipsStatNum}>10K+</div>
              <div style={styles.tipsStatLabel}>Active job seekers</div>
            </div>
            <div style={styles.tipsStat}>
              <div style={styles.tipsStatNum}>48h</div>
              <div style={styles.tipsStatLabel}>Avg. first applicant</div>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div style={styles.formCard}>

          {/* Step indicator */}
          <div style={styles.stepIndicator}>
            <div style={styles.stepItem(step >= 1)}>
              <div style={styles.stepCircle(step >= 1)}>
                {step > 1 ? "✓" : "1"}
              </div>
              <span style={styles.stepLabel(step >= 1)}>Basic Info</span>
            </div>
            <div style={styles.stepLine(step >= 2)} />
            <div style={styles.stepItem(step >= 2)}>
              <div style={styles.stepCircle(step >= 2)}>2</div>
              <span style={styles.stepLabel(step >= 2)}>Job Details</span>
            </div>
          </div>

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div>
              <h2 style={styles.formTitle}>Basic Information</h2>
              <p style={styles.formSub}>Tell us about the position and your company</p>

              <div style={styles.row}>
                <FormField
                  label="Job Title *"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior React Developer"
                  error={errors.title}
                />
                <FormField
                  label="Company Name *"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="e.g. TechCorp India"
                  error={errors.company}
                />
              </div>

              <div style={styles.row}>
                <FormField
                  label="Location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Remote / Mumbai"
                />
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Job Type</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    style={styles.input}
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>

              <div style={styles.row}>
                <FormField
                  label="Salary Range"
                  name="salary"
                  value={form.salary}
                  onChange={handleChange}
                  placeholder="e.g. ₹8L–₹12L or $60k–$80k"
                />
                <FormField
                  label="Contact Email *"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="hr@company.com"
                  error={errors.email}
                />
              </div>

              <button
                type="button"
                onClick={handleNext}
                style={styles.nextBtn}
                onMouseEnter={e => {
                  e.target.style.background = "#ea580c";
                  e.target.style.boxShadow = "0 8px 24px rgba(249,115,22,0.4)";
                }}
                onMouseLeave={e => {
                  e.target.style.background = "#f97316";
                  e.target.style.boxShadow = "0 4px 16px rgba(249,115,22,0.3)";
                }}
              >
                Continue to Job Details →
              </button>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <h2 style={styles.formTitle}>Job Details</h2>
              <p style={styles.formSub}>Describe the role and required skills</p>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Job Description *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe responsibilities, requirements, and what makes this role exciting..."
                  style={{
                    ...styles.textarea,
                    borderColor: errors.description ? "#f87171" : "#e2e8f0",
                  }}
                />
                {errors.description && (
                  <span style={styles.errorMsg}>{errors.description}</span>
                )}
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Skills / Tags</label>
                <input
                  style={styles.input}
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="e.g. React, Node.js, MongoDB (comma separated)"
                />
                <span style={styles.fieldHint}>
                  Separate skills with commas to help candidates find your job
                </span>
                {/* Tag preview */}
                {form.tags && (
                  <div style={styles.tagPreview}>
                    {form.tags.split(",").map(t => t.trim()).filter(Boolean).map(tag => (
                      <span key={tag} style={styles.tagPill}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>

              <div style={styles.stepBtns}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={styles.backBtn}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  style={styles.submitBtn(loading)}
                  disabled={loading}
                  onMouseEnter={e => {
                    if (!loading) {
                      e.target.style.background = "#ea580c";
                      e.target.style.boxShadow = "0 8px 24px rgba(249,115,22,0.4)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!loading) {
                      e.target.style.background = "#f97316";
                      e.target.style.boxShadow = "0 4px 16px rgba(249,115,22,0.3)";
                    }
                  }}
                >
                  {loading ? "Posting..." : "🚀 Post Job Now"}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// REUSABLE FORM FIELD COMPONENT
// ─────────────────────────────────────────
function FormField({ label, name, value, onChange, placeholder, type = "text", error }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={styles.fieldGroup}>
      <label style={styles.label}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...styles.input,
          borderColor: error ? "#f87171" : focused ? "#f97316" : "#e2e8f0",
          boxShadow: focused ? "0 0 0 3px rgba(249,115,22,0.1)" : "none",
        }}
      />
      {error && <span style={styles.errorMsg}>{error}</span>}
    </div>
  );
}

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────
const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background: "#f8fafc",
  },

  // Header
  pageHeader: {
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    padding: "52px 40px 44px",
    color: "#ffffff",
  },
  pageHeaderInner: {
    maxWidth: "1100px",
    margin: "0 auto",
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

  // Layout
  formLayout: {
    display: "flex",
    gap: "32px",
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "40px 40px 80px",
    alignItems: "flex-start",
  },

  // Tips panel
  tipsPanel: {
    width: "280px",
    flexShrink: 0,
    background: "#ffffff",
    borderRadius: "20px",
    padding: "28px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    position: "sticky",
    top: "88px",
  },
  tipsPanelTitle: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: "20px",
  },
  tipItem: {
    display: "flex",
    gap: "10px",
    marginBottom: "14px",
    alignItems: "flex-start",
  },
  tipIcon: {
    fontSize: "16px",
    flexShrink: 0,
    marginTop: "1px",
  },
  tipText: {
    fontSize: "13px",
    color: "#64748b",
    lineHeight: 1.5,
  },
  tipsStats: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginTop: "24px",
    paddingTop: "20px",
    borderTop: "1px solid #e2e8f0",
  },
  tipsStat: {
    textAlign: "center",
    background: "#f8fafc",
    borderRadius: "12px",
    padding: "14px 8px",
  },
  tipsStatNum: {
    fontSize: "20px",
    fontWeight: 900,
    color: "#f97316",
  },
  tipsStatLabel: {
    fontSize: "11px",
    color: "#94a3b8",
    marginTop: "4px",
  },

  // Form card
  formCard: {
    flex: 1,
    background: "#ffffff",
    borderRadius: "20px",
    padding: "36px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },

  // Step indicator
  stepIndicator: {
    display: "flex",
    alignItems: "center",
    marginBottom: "32px",
  },
  stepItem: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    opacity: active ? 1 : 0.4,
  }),
  stepCircle: (active) => ({
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: active
      ? "linear-gradient(135deg, #f97316, #ea580c)"
      : "#e2e8f0",
    color: active ? "#ffffff" : "#94a3b8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "14px",
    flexShrink: 0,
  }),
  stepLabel: (active) => ({
    fontSize: "14px",
    fontWeight: active ? 700 : 500,
    color: active ? "#0f172a" : "#94a3b8",
  }),
  stepLine: (active) => ({
    flex: 1,
    height: "2px",
    background: active ? "#f97316" : "#e2e8f0",
    margin: "0 16px",
    transition: "background 0.3s",
  }),

  // Form
  formTitle: {
    fontSize: "22px",
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: "6px",
  },
  formSub: {
    color: "#64748b",
    fontSize: "14px",
    marginBottom: "28px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "16px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: "8px",
  },
  label: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#374151",
  },
  input: {
    padding: "12px 16px",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
    fontFamily: "Poppins, sans-serif",
    color: "#0f172a",
    transition: "all 0.2s",
    background: "#ffffff",
  },
  textarea: {
    padding: "14px 16px",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
    minHeight: "160px",
    fontFamily: "Poppins, sans-serif",
    resize: "vertical",
    color: "#0f172a",
    lineHeight: 1.6,
    transition: "all 0.2s",
  },
  errorMsg: {
    fontSize: "12px",
    color: "#ef4444",
    fontWeight: 500,
  },
  fieldHint: {
    fontSize: "12px",
    color: "#94a3b8",
  },

  // Tag preview
  tagPreview: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginTop: "8px",
  },
  tagPill: {
    padding: "4px 12px",
    background: "#fff7ed",
    border: "1px solid #fed7aa",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
    color: "#f97316",
  },

  // Buttons
  nextBtn: {
    width: "100%",
    padding: "14px",
    background: "#f97316",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    marginTop: "8px",
    boxShadow: "0 4px 16px rgba(249,115,22,0.3)",
    transition: "all 0.2s",
  },
  stepBtns: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  backBtn: {
    padding: "14px 24px",
    background: "#f8fafc",
    color: "#64748b",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    transition: "all 0.2s",
  },
  submitBtn: (loading) => ({
    flex: 1,
    padding: "14px",
    background: loading ? "#fed7aa" : "#f97316",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontWeight: 700,
    fontSize: "15px",
    cursor: loading ? "not-allowed" : "pointer",
    fontFamily: "Poppins, sans-serif",
    boxShadow: "0 4px 16px rgba(249,115,22,0.3)",
    transition: "all 0.2s",
  }),

  // Success
  successWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    padding: "40px",
  },
  successCard: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "52px 48px",
    maxWidth: "520px",
    width: "100%",
    textAlign: "center",
    border: "1px solid #e2e8f0",
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  },
  successIconWrapper: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#f0fdf4",
    border: "2px solid #bbf7d0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    fontSize: "36px",
  },
  successIcon: {
    fontSize: "36px",
  },
  successTitle: {
    fontSize: "26px",
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: "10px",
  },
  successSub: {
    color: "#64748b",
    fontSize: "15px",
    marginBottom: "28px",
    lineHeight: 1.6,
  },
  summaryBox: {
    background: "#f8fafc",
    borderRadius: "14px",
    padding: "20px",
    marginBottom: "28px",
    textAlign: "left",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #e2e8f0",
  },
  summaryLabel: {
    fontSize: "13px",
    color: "#94a3b8",
    fontWeight: 600,
  },
  summaryValue: {
    fontSize: "13px",
    color: "#0f172a",
    fontWeight: 700,
  },
  successBtns: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
  },
  postAnotherBtn: {
    padding: "13px 28px",
    background: "#f97316",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
  },
};

export default Hire;