import { useState } from "react";

// Navbar receives two props:
// - page: the currently active page (e.g. "Home")
// - setPage: function to change the active page
function Navbar({ page, setPage }) {

  // All the navigation links in order
  const links = ["Home", "Jobs", "Hire", "Blog", "About"];

  return (
    <nav style={styles.nav}>

      {/* LOGO — clicking it always goes back to Home */}
      <div style={styles.logo} onClick={() => setPage("Home")}>
        Job<span style={styles.logoHighlight}>Spark</span>
      </div>

      {/* NAV LINKS — loop through links array and render each */}
      <ul style={styles.navList}>
        {links.map(link => (
          <li key={link}>
            <button
              style={styles.navBtn(page === link)}
              onClick={() => setPage(link)}
            >
              {link}
            </button>
          </li>
        ))}
      </ul>

    </nav>
  );
}

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────
const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
    height: "65px",
    background: "#ffffff",
    borderBottom: "1px solid #e8e4de",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: "22px",
    fontWeight: 800,
    color: "#1a1a2e",
    cursor: "pointer",
    letterSpacing: "-0.5px",
  },
  logoHighlight: {
    color: "#f97316",
  },
  navList: {
    display: "flex",
    gap: "8px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  // This is a function because the style changes based on
  // whether this link is the active page or not
  navBtn: (isActive) => ({
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: isActive ? 700 : 500,
    fontSize: "15px",
    background: isActive ? "#1a1a2e" : "transparent",
    color: isActive ? "#ffffff" : "#555555",
    transition: "all 0.2s",
  }),
};

export default Navbar;