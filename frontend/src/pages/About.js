import { useState, useEffect } from "react";

function About() {
  const [visible, setVisible]     = useState(false);
  const [activeValue, setActiveValue] = useState(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const team = [
    { name: "Ananya Iyer",  role: "CEO & Founder",    emoji: "👩‍💼", color: "#fff7ed", border: "#fed7aa", bio: "10+ years in HR tech. Previously at LinkedIn and Naukri." },
    { name: "Rohit Kumar",  role: "CTO",               emoji: "👨‍💻", color: "#eff6ff", border: "#bfdbfe", bio: "Full stack engineer. Built platforms serving 1M+ users." },
    { name: "Meera Singh",  role: "Head of Design",    emoji: "👩‍🎨", color: "#fdf4ff", border: "#e9d5ff", bio: "Design lead with a passion for clean, human-first UI/UX." },
    { name: "Dev Patel",    role: "Head of Growth",    emoji: "🧑‍💼", color: "#f0fdf4", border: "#bbf7d0", bio: "Growth strategist who scaled 3 startups to Series B." },
    { name: "Sara Khan",    role: "Head of Marketing", emoji: "👩‍💻", color: "#fef3c7", border: "#fde68a", bio: "Brand builder with 8 years in B2B and consumer tech." },
    { name: "Arjun Nair",   role: "Lead Engineer",     emoji: "👨‍🔬", color: "#ecfdf5", border: "#a7f3d0", bio: "Backend wizard. Loves distributed systems and chai." },
  ];

  const values = [
    { icon: "🤝", title: "Trust",      desc: "We build honest, transparent relationships between candidates and employers at every step.",  color: "#fff7ed", border: "#fed7aa" },
    { icon: "⚡", title: "Speed",      desc: "We respect your time. From posting to hiring, we make every step fast and friction-free.",    color: "#eff6ff", border: "#bfdbfe" },
    { icon: "🌍", title: "Inclusion",  desc: "Great talent has no boundaries. We believe opportunity should be accessible to everyone.",     color: "#f0fdf4", border: "#bbf7d0" },
    { icon: "💡", title: "Innovation", desc: "We constantly push to build smarter tools that make hiring and job seeking feel effortless.",  color: "#fdf4ff", border: "#e9d5ff" },
    { icon: "❤️", title: "Care",       desc: "Behind every job application is a real person with real ambitions. We never forget that.",     color: "#fef3c7", border: "#fde68a" },
    { icon: "🎯", title: "Results",    desc: "We measure success by real outcomes — people hired, careers launched, teams built.",           color: "#ecfdf5", border: "#a7f3d0" },
  ];

  const milestones = [
    { year: "2020", title: "JobSpark Founded",  desc: "Started in a small Bangalore office with a team of 4 and a big vision."              },
    { year: "2021", title: "First 1,000 Hires", desc: "Reached our first major milestone — 1,000 successful hires on the platform."         },
    { year: "2022", title: "Series A Funding",  desc: "Raised ₹15Cr to expand our team and build smarter matching technology."             },
    { year: "2023", title: "Pan India Launch",  desc: "Expanded to 20+ cities and onboarded 2,000+ companies across India."                },
    { year: "2024", title: "50K+ Hires",        desc: "Crossed 50,000 successful hires and launched our AI-powered job matching."          },
    { year: "2025", title: "Going Global",      desc: "Expanding to Southeast Asia and the Middle East to connect talent worldwide."        },
  ];

  const stats = [
    { num: "2020",  label: "Founded",      icon: "🏢" },
    { num: "12",    label: "Team Members", icon: "👥" },
    { num: "50K+",  label: "Hires Made",   icon: "🤝" },
    { num: "5K+",   label: "Companies",    icon: "💼" },
  ];

  return (
    <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}>

      {/* ── HERO ── */}
      <div style={styles.hero}>
        <div style={styles.heroCircle1} />
        <div style={styles.heroCircle2} />
        <div style={styles.heroInner}>
          <div style={styles.heroBadge}>🏢 Our Story</div>
          <h1 style={styles.heroTitle}>
            We are Building the Future
            of <span style={styles.heroOrange}>Work</span>
          </h1>
          <p style={styles.heroSub}>
            JobSpark was born from a simple belief — that finding the right
            job or the right person should not be so hard. We are on a mission
            to make it simpler, faster, and more human.
          </p>
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={styles.statsBar}>
        {stats.map(s => (
          <div key={s.label} style={styles.statItem}>
            <div style={styles.statIcon}>{s.icon}</div>
            <div style={styles.statNum}>{s.num}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── MISSION VISION APPROACH ── */}
      <div style={styles.section}>
        <div style={styles.missionGrid}>
          {[
            { icon: "🎯", title: "Our Mission", desc: "To democratize career opportunities by connecting talent with the right companies — regardless of background, location, or education. Every person deserves a shot at their dream job." },
            { icon: "💡", title: "Our Vision",  desc: "A world where every skilled professional finds meaningful work and every company builds its perfect team — powered by technology that puts people first." },
            { icon: "🚀", title: "Our Approach",desc: "We combine smart technology with a human touch. Our AI matches candidates to jobs, but real people ensure every experience feels personal, fair, and effective." },
          ].map(m => (
            <div key={m.title} style={styles.missionCard}>
              <div style={styles.missionIcon}>{m.icon}</div>
              <h3 style={styles.missionTitle}>{m.title}</h3>
              <p style={styles.missionDesc}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <div style={styles.timelineSection}>
        <div style={styles.timelineInner}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ ...styles.sectionTitle, color: "#ffffff" }}>Our Journey</h2>
            <p style={{ color: "#94a3b8", fontSize: "16px" }}>
              From a small startup to India's fastest growing job platform
            </p>
          </div>
          <div style={styles.timeline}>
            {milestones.map((m, i) => (
              <div key={m.year} style={styles.timelineItem(i % 2 === 0)}>
                <div style={styles.timelineCard}>
                  <div style={styles.timelineYear}>{m.year}</div>
                  <h4 style={styles.timelineTitle}>{m.title}</h4>
                  <p style={styles.timelineDesc}>{m.desc}</p>
                </div>
                <div style={styles.timelineDot} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TEAM ── */}
      <div style={styles.section}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={styles.sectionTitle}>Meet the Team</h2>
          <p style={styles.sectionSub}>
            The people behind JobSpark who work every day to connect talent with opportunity
          </p>
        </div>
        <div style={styles.teamGrid}>
          {team.map(member => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>

      {/* ── VALUES ── */}
      <div style={styles.valuesSection}>
        <div style={styles.valuesInner}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={styles.sectionTitle}>What We Stand For</h2>
            <p style={styles.sectionSub}>
              The principles that guide every decision we make
            </p>
          </div>
          <div style={styles.valuesGrid}>
            {values.map((v, i) => (
              <div
                key={v.title}
                style={{
                  ...styles.valueCard,
                  background: activeValue === i ? v.color : "#ffffff",
                  border: activeValue === i ? `1px solid ${v.border}` : "1px solid #e2e8f0",
                  transform: activeValue === i ? "translateY(-4px)" : "none",
                  boxShadow: activeValue === i ? "0 12px 32px rgba(0,0,0,0.08)" : "0 2px 8px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={() => setActiveValue(i)}
                onMouseLeave={() => setActiveValue(null)}
              >
                <div style={styles.valueIcon}>{v.icon}</div>
                <h3 style={styles.valueTitle}>{v.title}</h3>
                <p style={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTACT CTA ── */}
      <div style={styles.contactSection}>
        <div style={styles.contactInner}>
          <h2 style={styles.contactTitle}>Want to Work With Us?</h2>
          <p style={styles.contactSub}>
            We are always looking for talented people to join our team
            or partner with us to grow the platform.
          </p>
          <div style={styles.contactBtns}>
            <button
              style={styles.contactBtnPrimary}
              onClick={() => window.location.href = "mailto:hello@jobspark.com"}
            >
              ✉️ Get in Touch
            </button>
            <button
              style={styles.contactBtnSecondary}
              onClick={() => window.location.href = "mailto:careers@jobspark.com"}
            >
              💼 View Open Roles
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────
// TEAM CARD COMPONENT
// ─────────────────────────────────────────
function TeamCard({ member }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...styles.teamCard,
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? "0 20px 48px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
        border: hovered ? `1px solid ${member.border}` : "1px solid #e2e8f0",
        background: hovered ? member.color : "#ffffff",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ ...styles.teamAvatar, background: member.color, border: `2px solid ${member.border}` }}>
        {member.emoji}
      </div>
      <h4 style={styles.teamName}>{member.name}</h4>
      <div style={styles.teamRole}>{member.role}</div>
      <p style={styles.teamBio}>{member.bio}</p>
    </div>
  );
}

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────
const styles = {
  hero: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0c4a6e 100%)",
    padding: "96px 40px 80px",
    textAlign: "center",
    color: "#ffffff",
    position: "relative",
    overflow: "hidden",
  },
  heroCircle1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "rgba(249,115,22,0.06)",
    top: "-200px",
    right: "-100px",
    pointerEvents: "none",
  },
  heroCircle2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(59,130,246,0.06)",
    bottom: "-100px",
    left: "-50px",
    pointerEvents: "none",
  },
  heroInner: {
    maxWidth: "700px",
    margin: "0 auto",
    position: "relative",
  },
  heroBadge: {
    display: "inline-block",
    background: "rgba(249,115,22,0.15)",
    border: "1px solid rgba(249,115,22,0.3)",
    borderRadius: "20px",
    padding: "5px 16px",
    fontSize: "13px",
    color: "#fdba74",
    fontWeight: 600,
    marginBottom: "20px",
  },
  heroTitle: {
    fontSize: "clamp(32px, 5vw, 52px)",
    fontWeight: 900,
    lineHeight: 1.15,
    marginBottom: "20px",
    letterSpacing: "-1px",
  },
  heroOrange: {
    background: "linear-gradient(135deg, #f97316, #fb923c)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSub: {
    fontSize: "17px",
    color: "#94a3b8",
    lineHeight: 1.7,
    maxWidth: "580px",
    margin: "0 auto",
  },

  // Stats
  statsBar: {
    display: "flex",
    justifyContent: "center",
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
  statIcon: { fontSize: "22px", marginBottom: "6px" },
  statNum:  { fontSize: "28px", fontWeight: 900, color: "#f97316", letterSpacing: "-0.5px" },
  statLabel:{ fontSize: "13px", color: "#64748b", marginTop: "2px", fontWeight: 500 },

  // Section
  section: {
    padding: "72px 40px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  sectionTitle: {
    fontSize: "32px",
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: "-0.5px",
    marginBottom: "8px",
  },
  sectionSub: {
    color: "#64748b",
    fontSize: "16px",
    maxWidth: "560px",
    margin: "0 auto",
    lineHeight: 1.6,
  },

  // Mission
  missionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
  },
  missionCard: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "36px 32px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  missionIcon:  { fontSize: "40px", marginBottom: "16px" },
  missionTitle: { fontSize: "20px", fontWeight: 800, color: "#0f172a", marginBottom: "12px" },
  missionDesc:  { color: "#64748b", lineHeight: 1.7, fontSize: "15px", margin: 0 },

  // Timeline
  timelineSection: {
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    padding: "80px 40px",
  },
  timelineInner: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  timeline: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
    position: "relative",
  },
  timelineItem: (isLeft) => ({
    display: "flex",
    justifyContent: isLeft ? "flex-start" : "flex-end",
    paddingBottom: "32px",
    position: "relative",
  }),
  timelineCard: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "24px 28px",
    maxWidth: "380px",
    backdropFilter: "blur(8px)",
  },
  timelineYear:  { fontSize: "13px", fontWeight: 700, color: "#f97316", marginBottom: "6px", letterSpacing: "1px" },
  timelineTitle: { fontSize: "17px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" },
  timelineDesc:  { fontSize: "14px", color: "#94a3b8", lineHeight: 1.6, margin: 0 },
  timelineDot: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#f97316",
    border: "3px solid #0f172a",
    boxShadow: "0 0 0 3px rgba(249,115,22,0.3)",
    position: "absolute",
    left: "50%",
    top: "28px",
    transform: "translateX(-50%)",
    flexShrink: 0,
  },

  // Team
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  teamCard: {
    borderRadius: "20px",
    padding: "32px 28px",
    textAlign: "center",
    transition: "all 0.25s ease",
    cursor: "default",
  },
  teamAvatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    margin: "0 auto 16px",
  },
  teamName: { fontSize: "17px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" },
  teamRole: { fontSize: "13px", color: "#f97316", fontWeight: 600, marginBottom: "12px" },
  teamBio:  { fontSize: "13px", color: "#64748b", lineHeight: 1.6, margin: 0 },

  // Values
  valuesSection: {
    background: "#f8fafc",
    borderTop: "1px solid #e2e8f0",
    borderBottom: "1px solid #e2e8f0",
    padding: "72px 0",
  },
  valuesInner: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 40px",
  },
  valuesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  valueCard: {
    borderRadius: "20px",
    padding: "32px 28px",
    cursor: "default",
    transition: "all 0.25s ease",
  },
  valueIcon:  { fontSize: "36px", marginBottom: "14px" },
  valueTitle: { fontSize: "18px", fontWeight: 700, color: "#0f172a", marginBottom: "10px" },
  valueDesc:  { fontSize: "14px", color: "#64748b", lineHeight: 1.7, margin: 0 },

  // Contact
  contactSection: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    padding: "80px 40px",
    textAlign: "center",
  },
  contactInner: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  contactTitle: {
    fontSize: "36px",
    fontWeight: 900,
    color: "#ffffff",
    marginBottom: "12px",
    letterSpacing: "-0.5px",
  },
  contactSub: {
    color: "#94a3b8",
    fontSize: "16px",
    lineHeight: 1.7,
    marginBottom: "36px",
  },
  contactBtns: {
    display: "flex",
    gap: "14px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  contactBtnPrimary: {
    padding: "14px 32px",
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
  contactBtnSecondary: {
    padding: "14px 32px",
    background: "rgba(255,255,255,0.08)",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "12px",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    transition: "all 0.2s",
  },
};

export default About;