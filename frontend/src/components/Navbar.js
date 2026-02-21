import { useState, useEffect } from "react";

function Navbar({ page, setPage }) {
  const links = ["Home", "Jobs", "Hire", "Blog", "About"];

  // Track if user has scrolled down
  // We use this to add shadow + blur to navbar on scroll
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    // Cleanup listener when component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNav(link) {
    setPage(link);
    setMenuOpen(false);
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <nav style={styles.nav(scrolled)}>
      <div style={styles.inner}>

        {/* LOGO */}
        <div style={styles.logo} onClick={() => handleNav("Home")}>
          <div style={styles.logoIcon}>J</div>
          Job<span style={styles.orange}>Spark</span>
        </div>

        {/* DESKTOP NAV LINKS */}
        <ul style={styles.navList}>
          {links.map(link => (
            <li key={link}>
              <button
                style={styles.navBtn(page === link)}
                onClick={() => handleNav(link)}
                onMouseEnter={e => {
                  if (page !== link) {
                    e.target.style.color = "#f97316";
                    e.target.style.background = "#fff7ed";
                  }
                }}
                onMouseLeave={e => {
                  if (page !== link) {
                    e.target.style.color = "#64748b";
                    e.target.style.background = "transparent";
                  }
                }}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA BUTTON */}
        <div style={styles.ctaRow}>
          <button
            style={styles.postJobBtn}
            onClick={() => handleNav("Hire")}
            onMouseEnter={e => {
              e.target.style.background = "#ea6c00";
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 6px 20px rgba(249,115,22,0.4)";
            }}
            onMouseLeave={e => {
              e.target.style.background = "#f97316";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 14px rgba(249,115,22,0.3)";
            }}
          >
            Post a Job
          </button>
        </div>

      </div>
    </nav>
  );
}

const styles = {
  nav: (scrolled) => ({
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: scrolled
      ? "rgba(255,255,255,0.85)"
      : "#ffffff",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    borderBottom: "1px solid #e2e8f0",
    boxShadow: scrolled
      ? "0 4px 24px rgba(0,0,0,0.08)"
      : "none",
    transition: "all 0.3s ease",
  }),
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 48px",
    height: "68px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  // Logo
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "20px",
    fontWeight: 800,
    color: "#0f172a",
    cursor: "pointer",
    letterSpacing: "-0.5px",
  },
  logoIcon: {
    width: "32px",
    height: "32px",
    background: "linear-gradient(135deg, #f97316, #ea580c)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: 900,
    fontSize: "16px",
    boxShadow: "0 4px 10px rgba(249,115,22,0.3)",
  },
  orange: {
    color: "#f97316",
  },

  // Nav links
  navList: {
    display: "flex",
    gap: "4px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navBtn: (isActive) => ({
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: isActive ? 700 : 500,
    fontSize: "14px",
    fontFamily: "Poppins, sans-serif",
    background: isActive
      ? "linear-gradient(135deg, #fff7ed, #ffedd5)"
      : "transparent",
    color: isActive ? "#f97316" : "#64748b",
    transition: "all 0.2s ease",
    position: "relative",
  }),

  // CTA
  ctaRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  postJobBtn: {
    padding: "10px 22px",
    background: "#f97316",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontWeight: 700,
    fontSize: "14px",
    fontFamily: "Poppins, sans-serif",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(249,115,22,0.3)",
    transition: "all 0.2s ease",
  },
};

export default Navbar;