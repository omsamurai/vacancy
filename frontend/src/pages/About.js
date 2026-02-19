function About() {

  const team = [
    { name: "Ananya Iyer",  role: "CEO & Founder",    emoji: "👩‍💼", color: "#fef3c7" },
    { name: "Rohit Kumar",  role: "CTO",               emoji: "👨‍💻", color: "#dbeafe" },
    { name: "Meera Singh",  role: "Head of Design",    emoji: "👩‍🎨", color: "#fce7f3" },
    { name: "Dev Patel",    role: "Head of Growth",    emoji: "🧑‍💼", color: "#dcfce7" },
  ];

  const values = [
    { icon: "🤝", title: "Trust",     desc: "We build honest relationships between candidates and employers." },
    { icon: "⚡", title: "Speed",     desc: "We value your time and make the hiring process fast." },
    { icon: "🌍", title: "Inclusion", desc: "We believe great talent comes from everywhere." },
  ];

  const stats = [
    ["2020",     "Year Founded"],
    ["12",       "Team Members"],
    ["10,000+",  "Jobs Posted"],
    ["8,000+",   "Hires Made"],
  ];

  return (
    <div>

      {/* ── HERO SECTION ── */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>
          About <span style={styles.orange}>JobSpark</span>
        </h1>
        <p style={styles.heroSub}>
          We are on a mission to make hiring and job-seeking
          simpler, faster, and more human.
        </p>
      </div>

      <div style={styles.section}>

        {/* ── MISSION & VISION ── */}
        <div style={styles.twoCol}>
          <div style={styles.card}>
            <div style={styles.cardIcon}>🎯</div>
            <h3 style={styles.cardTitle}>Our Mission</h3>
            <p style={styles.cardDesc}>
              To democratize career opportunities by connecting talent
              with the right companies, regardless of background or geography.
            </p>
          </div>
          <div style={styles.card}>
            <div style={styles.cardIcon}>💡</div>
            <h3 style={styles.cardTitle}>Our Vision</h3>
            <p style={styles.cardDesc}>
              A world where every skilled person finds meaningful work
              and every company finds its perfect team member.
            </p>
          </div>
        </div>

        {/* ── STATS ── */}
        <div style={styles.statsRow}>
          {stats.map(([num, label]) => (
            <div key={label} style={styles.statItem}>
              <div style={styles.statNum}>{num}</div>
              <div style={styles.statLabel}>{label}</div>
            </div>
          ))}
        </div>

        {/* ── TEAM ── */}
        <h2 style={styles.sectionTitle}>Meet the Team</h2>
        <p style={styles.sectionSub}>The people behind JobSpark</p>

        <div style={styles.teamGrid}>
          {team.map(member => (
            <div key={member.name} style={styles.teamCard}>
              {/* Avatar circle with emoji */}
              <div style={styles.avatar(member.color)}>
                {member.emoji}
              </div>
              <div style={styles.memberName}>{member.name}</div>
              <div style={styles.memberRole}>{member.role}</div>
            </div>
          ))}
        </div>

        {/* ── VALUES ── */}
        <h2 style={{ ...styles.sectionTitle, marginTop: "56px" }}>
          Our Values
        </h2>
        <p style={styles.sectionSub}>What we stand for every day</p>

        <div style={styles.valuesGrid}>
          {values.map(v => (
            <div key={v.title} style={styles.valueCard}>
              <div style={styles.valueIcon}>{v.icon}</div>
              <h3 style={styles.valueTitle}>{v.title}</h3>
              <p style={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* ── CONTACT ── */}
        <div style={styles.contactBox}>
          <h3 style={styles.contactTitle}>Get in Touch</h3>
          <p style={styles.contactSub}>
            Have questions or want to partner with us?
          </p>
          <a href="mailto:hello@jobspark.com" style={styles.contactBtn}>
            ✉️ hello@jobspark.com
          </a>
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
    fontSize: "48px",
    fontWeight: 900,
    marginBottom: "16px",
    letterSpacing: "-1px",
  },
  orange: {
    color: "#f97316",
  },
  heroSub: {
    fontSize: "18px",
    color: "#94a3b8",
    maxWidth: "500px",
    margin: "0 auto",
    lineHeight: 1.6,
  },

  // Section wrapper
  section: {
    padding: "60px 40px",
    maxWidth: "1100px",
    margin: "0 auto",
  },

  // Mission / Vision
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginBottom: "48px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    border: "1px solid #e8e4de",
    textAlign: "center",
  },
  cardIcon: {
    fontSize: "40px",
    marginBottom: "12px",
  },
  cardTitle: {
    fontWeight: 800,
    fontSize: "20px",
    marginBottom: "10px",
    color: "#1a1a2e",
  },
  cardDesc: {
    color: "#888888",
    lineHeight: 1.7,
    margin: 0,
    fontSize: "15px",
  },

  // Stats
  statsRow: {
    display: "flex",
    justifyContent: "space-around",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "36px",
    border: "1px solid #e8e4de",
    marginBottom: "56px",
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

  // Section headings
  sectionTitle: {
    fontSize: "28px",
    fontWeight: 800,
    marginBottom: "8px",
    color: "#1a1a2e",
    letterSpacing: "-0.5px",
  },
  sectionSub: {
    color: "#888888",
    marginBottom: "28px",
    fontSize: "15px",
  },

  // Team
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "16px",
  },
  teamCard: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "28px 20px",
    border: "1px solid #e8e4de",
    textAlign: "center",
  },
  avatar: (color) => ({
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: color,
    margin: "0 auto 14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
  }),
  memberName: {
    fontWeight: 700,
    fontSize: "16px",
    color: "#1a1a2e",
    marginBottom: "4px",
  },
  memberRole: {
    color: "#888888",
    fontSize: "13px",
  },

  // Values
  valuesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  valueCard: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "28px",
    border: "1px solid #e8e4de",
    textAlign: "center",
  },
  valueIcon: {
    fontSize: "32px",
    marginBottom: "10px",
  },
  valueTitle: {
    fontWeight: 700,
    fontSize: "17px",
    marginBottom: "8px",
    color: "#1a1a2e",
  },
  valueDesc: {
    color: "#888888",
    fontSize: "13px",
    lineHeight: 1.6,
    margin: 0,
  },

  // Contact
  contactBox: {
    marginTop: "56px",
    background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
    borderRadius: "20px",
    padding: "48px",
    textAlign: "center",
    color: "#ffffff",
  },
  contactTitle: {
    fontSize: "26px",
    fontWeight: 800,
    marginBottom: "10px",
  },
  contactSub: {
    color: "#94a3b8",
    marginBottom: "24px",
    fontSize: "15px",
  },
  contactBtn: {
    display: "inline-block",
    padding: "14px 32px",
    background: "#f97316",
    color: "#ffffff",
    borderRadius: "10px",
    fontWeight: 700,
    fontSize: "15px",
    textDecoration: "none",
  },
};

export default About;