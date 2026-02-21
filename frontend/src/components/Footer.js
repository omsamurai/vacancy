function Footer({ setPage }) {
  return (
    <footer style={styles.footer}>

      {/* TOP ROW */}
      <div style={styles.top}>

        {/* Logo + tagline */}
        <div style={styles.brand}>
          <div style={styles.logo}>
            Job<span style={styles.orange}>Spark</span>
          </div>
          <p style={styles.tagline}>
            Connecting talent with opportunity.<br />
            Your next chapter starts here.
          </p>
        </div>

        {/* Quick Links */}
        <div style={styles.linkGroup}>
          <div style={styles.linkTitle}>Navigation</div>
          {["Home", "Jobs", "Hire", "Blog", "About"].map(link => (
            <div
              key={link}
              style={styles.link}
              onClick={() => setPage(link)}
            >
              {link}
            </div>
          ))}
        </div>

        {/* For Job Seekers */}
        <div style={styles.linkGroup}>
          <div style={styles.linkTitle}>Job Seekers</div>
          <div style={styles.link}>Browse Jobs</div>
          <div style={styles.link}>Career Tips</div>
          <div style={styles.link}>Resume Builder</div>
          <div style={styles.link}>Salary Guide</div>
        </div>

        {/* For Employers */}
        <div style={styles.linkGroup}>
          <div style={styles.linkTitle}>Employers</div>
          <div style={styles.link}>Post a Job</div>
          <div style={styles.link}>Find Candidates</div>
          <div style={styles.link}>Pricing</div>
          <div style={styles.link}>Contact Us</div>
        </div>

      </div>

      {/* DIVIDER */}
      <div style={styles.divider} />

      {/* BOTTOM ROW */}
      <div style={styles.bottom}>
        <div style={styles.copyright}>
          © 2025 JobSpark. All rights reserved.
        </div>
        <div style={styles.bottomLinks}>
          <span style={styles.link}>Privacy Policy</span>
          <span style={styles.link}>Terms of Service</span>
          <span style={styles.link}>Cookies</span>
        </div>
      </div>

    </footer>
  );
}

const styles = {
  footer: {
    background: "#1a1a2e",
    color: "#94a3b8",
    padding: "60px 40px 32px",
    marginTop: "80px",
  },

  // Top section
  top: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: "40px",
    maxWidth: "1100px",
    margin: "0 auto",
  },

  // Brand
  brand: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  logo: {
    fontSize: "24px",
    fontWeight: 900,
    color: "#ffffff",
    letterSpacing: "-0.5px",
  },
  orange: {
    color: "#f97316",
  },
  tagline: {
    fontSize: "14px",
    lineHeight: 1.7,
    color: "#64748b",
    margin: 0,
  },

  // Link groups
  linkGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  linkTitle: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "4px",
  },
  link: {
    fontSize: "14px",
    color: "#64748b",
    cursor: "pointer",
    transition: "color 0.2s",
  },

  // Divider
  divider: {
    borderTop: "1px solid #2d3748",
    margin: "40px auto",
    maxWidth: "1100px",
  },

  // Bottom row
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  copyright: {
    fontSize: "13px",
    color: "#64748b",
  },
  bottomLinks: {
    display: "flex",
    gap: "24px",
  },
};

export default Footer;