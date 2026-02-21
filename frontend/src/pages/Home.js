import { useState, useEffect } from "react";

function Home({ setPage }) {
  const [search, setSearch]     = useState("");
  const [visible, setVisible]   = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  // Trigger fade-in animation when page loads
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    setPage("Jobs");
  }

  const categories = [
    { icon: "💻", label: "Technology",  count: "1.2k jobs" },
    { icon: "🎨", label: "Design",      count: "430 jobs"  },
    { icon: "📊", label: "Marketing",   count: "820 jobs"  },
    { icon: "💰", label: "Finance",     count: "650 jobs"  },
    { icon: "🏥", label: "Healthcare",  count: "910 jobs"  },
    { icon: "📚", label: "Education",   count: "340 jobs"  },
  ];

  const features = [
    { icon: "⚡", title: "Instant Matching",    desc: "Our smart algorithm connects you with the most relevant jobs or candidates within seconds of posting.",    color: "#fff7ed", border: "#fed7aa" },
    { icon: "🔒", title: "Verified Listings",   desc: "Every job posting goes through our verification process to ensure quality, legitimacy and accuracy.",       color: "#f0fdf4", border: "#bbf7d0" },
    { icon: "💬", title: "Direct Messaging",    desc: "Cut out the middlemen. Connect directly with hirers or applicants and get responses faster.",               color: "#eff6ff", border: "#bfdbfe" },
    { icon: "📊", title: "Application Tracker", desc: "Track every application and hiring pipeline in one clean, organised dashboard built for clarity.",          color: "#fdf4ff", border: "#e9d5ff" },
  ];

  const testimonials = [
    { name: "Ananya Iyer",   role: "Frontend Dev at Google",   text: "Found my dream job in just 3 days. The matching algorithm is incredibly accurate!",          avatar: "👩‍💻", color: "#dbeafe" },
    { name: "Rohit Sharma",  role: "Hired 12 engineers",       text: "As a hiring manager JobSpark saved us weeks of screening. Quality candidates every time.",    avatar: "👨‍💼", color: "#dcfce7" },
    { name: "Priya Mehta",   role: "UI Designer at Swiggy",    text: "The process was so smooth. Applied on Monday got an interview Thursday offer by Friday!",    avatar: "👩‍🎨", color: "#fce7f3" },
  ];

  const stats = [
    { num: "10K+",  label: "Active Jobs",    icon: "💼" },
    { num: "5K+",   label: "Companies",      icon: "🏢" },
    { num: "50K+",  label: "Job Seekers",    icon: "👥" },
    { num: "8K+",   label: "Hires Made",     icon: "🤝" },
  ];

  return (
    <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}>

      {/* ── HERO ── */}
      <div style={styles.hero}>

        {/* Decorative background circles */}
        <div style={styles.circle1} />
        <div style={styles.circle2} />

        {/* Announcement badge */}
        <div style={{ ...styles.badge, animation: "fadeInUp 0.6s ease forwards" }}>
          🎉 Over 500 new jobs posted this week
        </div>

        {/* Hero title */}
        <h1 style={styles.heroTitle}>
          Find Your{" "}
          <span style={styles.heroHighlight}>Dream Job</span>
          <br />
          Or Hire Top Talent
        </h1>

        <p style={styles.heroSub}>
          JobSpark connects skilled professionals with the best companies.
          <br />
          Your next opportunity is just one click away.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} style={styles.searchWrapper}>
          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              style={styles.searchInput}
              placeholder="Job title, skill, or company..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button type="submit" style={styles.searchBtn}>
              Search Jobs
            </button>
          </div>
          <div style={styles.searchHints}>
            <span style={styles.hintLabel}>Popular:</span>
            {["React Developer", "UI Designer", "Product Manager"].map(hint => (
              <span
                key={hint}
                style={styles.hint}
                onClick={() => { setSearch(hint); setPage("Jobs"); }}
              >
                {hint}
              </span>
            ))}
          </div>
        </form>

      </div>

      {/* ── STATS ── */}
      <div style={styles.statsBar}>
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              ...styles.statItem,
              animationDelay: `${i * 0.1}s`,
              animation: "fadeInUp 0.6s ease forwards",
            }}
          >
            <div style={styles.statIcon}>{s.icon}</div>
            <div style={styles.statNum}>{s.num}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── JOB CATEGORIES ── */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>Browse by Category</h2>
            <p style={styles.sectionSub}>Find jobs in your field of expertise</p>
          </div>
          <button
            style={styles.seeAllBtn}
            onClick={() => setPage("Jobs")}
            onMouseEnter={e => {
              e.target.style.background = "#fff7ed";
              e.target.style.color = "#ea580c";
            }}
            onMouseLeave={e => {
              e.target.style.background = "transparent";
              e.target.style.color = "#f97316";
            }}
          >
            See all jobs →
          </button>
        </div>

        <div style={styles.categoryGrid}>
          {categories.map((cat, i) => (
            <div
              key={cat.label}
              style={{
                ...styles.categoryCard,
                border: activeCategory === i
                  ? "2px solid #f97316"
                  : "2px solid #e2e8f0",
                transform: activeCategory === i
                  ? "translateY(-4px)"
                  : "none",
                boxShadow: activeCategory === i
                  ? "0 12px 32px rgba(249,115,22,0.15)"
                  : "0 2px 8px rgba(0,0,0,0.04)",
              }}
              onClick={() => setPage("Jobs")}
              onMouseEnter={() => setActiveCategory(i)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div style={styles.categoryIcon}>{cat.icon}</div>
              <div style={styles.categoryLabel}>{cat.label}</div>
              <div style={styles.categoryCount}>{cat.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div style={styles.featureSection}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={styles.sectionTitle}>Why Choose JobSpark?</h2>
            <p style={styles.sectionSub}>
              Everything you need to find a job or build your dream team
            </p>
          </div>
          <div style={styles.featureGrid}>
            {features.map((f, i) => (
              <FeatureCard key={f.title} feature={f} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <div style={styles.section}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={styles.sectionTitle}>What People Are Saying</h2>
          <p style={styles.sectionSub}>
            Join thousands of happy job seekers and hirers
          </p>
        </div>
        <div style={styles.testimonialGrid}>
          {testimonials.map(t => (
            <div key={t.name} style={styles.testimonialCard}>
              <div style={styles.quoteIcon}>"</div>
              <p style={styles.testimonialText}>{t.text}</p>
              <div style={styles.testimonialAuthor}>
                <div style={{ ...styles.testimonialAvatar, background: t.color }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={styles.testimonialName}>{t.name}</div>
                  <div style={styles.testimonialRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA BANNER ── */}
      <div style={styles.ctaBanner}>
        <div style={styles.ctaInner}>
          <div style={styles.ctaLeft}>
            <h2 style={styles.ctaTitle}>Ready to take the next step?</h2>
            <p style={styles.ctaSub}>
              Join 50,000+ professionals already using JobSpark
            </p>
          </div>
          <div style={styles.ctaBtns}>
            <button
              style={styles.ctaBtnLight}
              onClick={() => setPage("Jobs")}
              onMouseEnter={e => {
                e.target.style.background = "#fff7ed";
                e.target.style.color = "#ea580c";
              }}
              onMouseLeave={e => {
                e.target.style.background = "#ffffff";
                e.target.style.color = "#f97316";
              }}
            >
              Browse Jobs
            </button>
            <button
              style={styles.ctaBtnDark}
              onClick={() => setPage("Hire")}
              onMouseEnter={e => {
                e.target.style.background = "#ea580c";
                e.target.style.boxShadow = "0 8px 24px rgba(249,115,22,0.5)";
              }}
              onMouseLeave={e => {
                e.target.style.background = "#f97316";
                e.target.style.boxShadow = "0 4px 16px rgba(249,115,22,0.3)";
              }}
            >
              Post a Job →
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────
// FEATURE CARD — separate component so
// hover state works independently per card
// ─────────────────────────────────────────
function FeatureCard({ feature, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...styles.featureCard,
        background: hovered ? feature.color : "#ffffff",
        border: `1px solid ${hovered ? feature.border : "#e2e8f0"}`,
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered
          ? "0 16px 40px rgba(0,0,0,0.1)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        animationDelay: `${delay}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.featureIconBox}>{feature.icon}</div>
      <h3 style={styles.featureTitle}>{feature.title}</h3>
      <p style={styles.featureDesc}>{feature.desc}</p>
    </div>
  );
}

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────
const styles = {
  // Hero
  hero: {
    position: "relative",
    padding: "90px 40px 80px",
    textAlign: "center",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0c4a6e 100%)",
    color: "#ffffff",
    overflow: "hidden",
  },
  circle1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "rgba(249,115,22,0.08)",
    top: "-200px",
    right: "-100px",
    pointerEvents: "none",
  },
  circle2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(59,130,246,0.08)",
    bottom: "-100px",
    left: "-50px",
    pointerEvents: "none",
  },
  badge: {
    display: "inline-block",
    background: "rgba(249,115,22,0.15)",
    border: "1px solid rgba(249,115,22,0.3)",
    borderRadius: "20px",
    padding: "6px 18px",
    fontSize: "13px",
    color: "#fdba74",
    fontWeight: 600,
    marginBottom: "24px",
    letterSpacing: "0.3px",
  },
  heroTitle: {
    fontSize: "clamp(36px, 5vw, 60px)",
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: "20px",
    letterSpacing: "-1.5px",
  },
  heroHighlight: {
    background: "linear-gradient(135deg, #f97316, #fb923c)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSub: {
    fontSize: "17px",
    color: "#94a3b8",
    lineHeight: 1.7,
    marginBottom: "40px",
  },

  // Search
  searchWrapper: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    background: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 16px 48px rgba(0,0,0,0.3)",
    border: "2px solid rgba(255,255,255,0.1)",
  },
  searchIcon: {
    padding: "0 16px",
    fontSize: "18px",
  },
  searchInput: {
    flex: 1,
    padding: "18px 0",
    border: "none",
    fontSize: "15px",
    outline: "none",
    color: "#0f172a",
    fontFamily: "Poppins, sans-serif",
    background: "transparent",
  },
  searchBtn: {
    padding: "18px 28px",
    background: "linear-gradient(135deg, #f97316, #ea580c)",
    color: "#ffffff",
    border: "none",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    whiteSpace: "nowrap",
    transition: "all 0.2s",
  },
  searchHints: {
    marginTop: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  hintLabel: {
    fontSize: "13px",
    color: "#64748b",
    fontWeight: 600,
  },
  hint: {
    fontSize: "13px",
    color: "#94a3b8",
    cursor: "pointer",
    padding: "3px 10px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "all 0.2s",
  },

  // Stats
  statsBar: {
    display: "flex",
    justifyContent: "center",
    gap: "0",
    background: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
  },
  statItem: {
    textAlign: "center",
    padding: "28px 48px",
    borderRight: "1px solid #e2e8f0",
    flex: 1,
    maxWidth: "200px",
  },
  statIcon: {
    fontSize: "22px",
    marginBottom: "6px",
  },
  statNum: {
    fontSize: "28px",
    fontWeight: 900,
    color: "#f97316",
    letterSpacing: "-0.5px",
  },
  statLabel: {
    fontSize: "13px",
    color: "#64748b",
    marginTop: "2px",
    fontWeight: 500,
  },

  // Section
  section: {
    padding: "72px 40px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "36px",
  },
  sectionTitle: {
    fontSize: "32px",
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: "-0.5px",
    marginBottom: "6px",
  },
  sectionSub: {
    color: "#64748b",
    fontSize: "16px",
    fontWeight: 400,
  },
  seeAllBtn: {
    background: "transparent",
    border: "none",
    color: "#f97316",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
    padding: "8px 16px",
    borderRadius: "8px",
    fontFamily: "Poppins, sans-serif",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  },

  // Categories
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: "16px",
  },
  categoryCard: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "24px 20px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.25s ease",
  },
  categoryIcon: {
    fontSize: "36px",
    marginBottom: "10px",
  },
  categoryLabel: {
    fontWeight: 700,
    fontSize: "15px",
    color: "#0f172a",
    marginBottom: "4px",
  },
  categoryCount: {
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: 500,
  },

  // Features
  featureSection: {
    background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
    padding: "72px 0",
    borderTop: "1px solid #e2e8f0",
    borderBottom: "1px solid #e2e8f0",
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "20px",
  },
  featureCard: {
    borderRadius: "20px",
    padding: "32px 28px",
    transition: "all 0.3s ease",
    cursor: "default",
  },
  featureIconBox: {
    fontSize: "36px",
    marginBottom: "16px",
    display: "inline-block",
    background: "#f8fafc",
    borderRadius: "12px",
    padding: "12px",
    lineHeight: 1,
  },
  featureTitle: {
    fontWeight: 700,
    fontSize: "17px",
    color: "#0f172a",
    marginBottom: "10px",
  },
  featureDesc: {
    color: "#64748b",
    fontSize: "14px",
    lineHeight: 1.7,
    margin: 0,
  },

  // Testimonials
  testimonialGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
  },
  testimonialCard: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "32px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
    position: "relative",
  },
  quoteIcon: {
    fontSize: "48px",
    color: "#f97316",
    lineHeight: 1,
    marginBottom: "8px",
    fontFamily: "Georgia, serif",
    opacity: 0.4,
  },
  testimonialText: {
    fontSize: "15px",
    color: "#334155",
    lineHeight: 1.7,
    marginBottom: "24px",
    fontStyle: "italic",
  },
  testimonialAuthor: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  testimonialAvatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    flexShrink: 0,
  },
  testimonialName: {
    fontWeight: 700,
    fontSize: "14px",
    color: "#0f172a",
  },
  testimonialRole: {
    fontSize: "12px",
    color: "#94a3b8",
    marginTop: "2px",
  },

  // CTA Banner
  ctaBanner: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    padding: "64px 40px",
    margin: "0",
  },
  ctaInner: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "32px",
    flexWrap: "wrap",
  },
  ctaLeft: {
    flex: 1,
  },
  ctaTitle: {
    fontSize: "32px",
    fontWeight: 800,
    color: "#ffffff",
    marginBottom: "8px",
    letterSpacing: "-0.5px",
  },
  ctaSub: {
    color: "#94a3b8",
    fontSize: "16px",
  },
  ctaBtns: {
    display: "flex",
    gap: "12px",
    flexShrink: 0,
  },
  ctaBtnLight: {
    padding: "14px 28px",
    background: "#ffffff",
    color: "#f97316",
    border: "none",
    borderRadius: "12px",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    transition: "all 0.2s",
  },
  ctaBtnDark: {
    padding: "14px 28px",
    background: "#f97316",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    boxShadow: "0 4px 16px rgba(249,115,22,0.3)",
    transition: "all 0.2s",
  },
};

export default Home;