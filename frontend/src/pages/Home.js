import { useState } from "react";

// Home receives setPage so clicking buttons can navigate
function Home({ setPage }) {

  const [search, setSearch] = useState("");

  // When user searches, take them to Jobs page
  function handleSearch(e) {
    e.preventDefault();
    setPage("Jobs");
  }

  return (
    <div>

      {/* ── HERO SECTION ── */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Find Your <span style={styles.orange}>Dream Job</span><br />
          Or Hire Top Talent
        </h1>
        <p style={styles.heroSub}>
          JobSpark connects skilled professionals with the best companies.
          Your next opportunity is just one click away.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={styles.searchBox}>
          <input
            style={styles.searchInput}
            placeholder="Search job title, skill, or company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" style={styles.searchBtn}>
            Search
          </button>
        </form>
      </div>

      {/* ── STATS SECTION ── */}
      <div style={styles.statsRow}>
        {[
          ["10,000+", "Active Jobs"],
          ["5,000+", "Companies"],
          ["50,000+", "Job Seekers"],
          ["8,000+", "Hires Made"],
        ].map(([num, label]) => (
          <div key={label} style={styles.statItem}>
            <div style={styles.statNum}>{num}</div>
            <div style={styles.statLabel}>{label}</div>
          </div>
        ))}
      </div>

      {/* ── FEATURES SECTION ── */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Why Choose JobSpark?</h2>
        <p style={styles.sectionSub}>
          Everything you need to find a job or build your dream team
        </p>

        <div style={styles.featureGrid}>
          {[
            { icon: "⚡", title: "Instant Matching", desc: "Smart algorithm matches you with the most relevant jobs in seconds." },
            { icon: "🔒", title: "Verified Listings", desc: "Every job posting is verified to ensure quality and legitimacy." },
            { icon: "💬", title: "Direct Messaging", desc: "Connect directly with hirers without any middlemen." },
            { icon: "📊", title: "Track Applications", desc: "Keep track of all your applications in one clean dashboard." },
          ].map(f => (
            <div key={f.title} style={styles.featureCard}>
              <div style={styles.featureIcon}>{f.icon}</div>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* ── CTA BUTTONS ── */}
        <div style={styles.ctaRow}>
          <button onClick={() => setPage("Jobs")} style={styles.ctaDark}>
            Browse Jobs →
          </button>
          <button onClick={() => setPage("Hire")} style={styles.ctaOrange}>
            Post a Job →
          </button>
        </div>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────
const styles = {
  // Hero
  hero: {
    padding: "80px 40px 60px",
    textAlign: "center",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    color: "#ffffff",
  },
  heroTitle: {
    fontSize: "52px",
    fontWeight: 900,
    lineHeight: 1.15,
    marginBottom: "16px",
    letterSpacing: "-1px",
  },
  orange: {
    color: "#f97316",
  },
  heroSub: {
    fontSize: "18px",
    color: "#94a3b8",
    maxWidth: "520px",
    margin: "0 auto 36px",
  },

  // Search
  searchBox: {
    display: "flex",
    maxWidth: "560px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  },
  searchInput: {
    flex: 1,
    padding: "16px 20px",
    border: "none",
    fontSize: "15px",
    outline: "none",
    color: "#1a1a2e",
  },
  searchBtn: {
    padding: "16px 28px",
    background: "#f97316",
    color: "#ffffff",
    border: "none",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
  },

  // Stats
  statsRow: {
    display: "flex",
    justifyContent: "center",
    gap: "60px",
    padding: "40px",
    background: "#ffffff",
    borderBottom: "1px solid #e8e4de",
  },
  statItem: {
    textAlign: "center",
  },
  statNum: {
    fontSize: "32px",
    fontWeight: 900,
    color: "#f97316",
  },
  statLabel: {
    fontSize: "14px",
    color: "#888888",
    marginTop: "4px",
  },

  // Section
  section: {
    padding: "60px 40px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  sectionTitle: {
    fontSize: "32px",
    fontWeight: 800,
    marginBottom: "8px",
    letterSpacing: "-0.5px",
    color: "#1a1a2e",
  },
  sectionSub: {
    color: "#888888",
    marginBottom: "36px",
    fontSize: "16px",
  },

  // Features
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "20px",
  },
  featureCard: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "28px",
    border: "1px solid #e8e4de",
  },
  featureIcon: {
    fontSize: "36px",
    marginBottom: "12px",
  },
  featureTitle: {
    fontWeight: 700,
    fontSize: "17px",
    marginBottom: "8px",
    color: "#1a1a2e",
  },
  featureDesc: {
    color: "#888888",
    fontSize: "14px",
    lineHeight: 1.6,
    margin: 0,
  },

  // CTA
  ctaRow: {
    textAlign: "center",
    marginTop: "48px",
    display: "flex",
    gap: "16px",
    justifyContent: "center",
  },
  ctaDark: {
    padding: "14px 32px",
    background: "#1a1a2e",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
  },
  ctaOrange: {
    padding: "14px 32px",
    background: "#f97316",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Home;