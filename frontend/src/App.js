import { useState } from "react";
import Navbar  from "./components/Navbar";
import Footer  from "./components/Footer";
import Home    from "./pages/Home";
import Jobs    from "./pages/Jobs";
import Hire    from "./pages/Hire";
import Blog    from "./pages/Blog";
import About   from "./pages/About";

function App() {
  const [page, setPage] = useState("Home");

  function renderPage() {
    switch (page) {
      case "Home":  return <Home  setPage={setPage} />;
      case "Jobs":  return <Jobs  />;
      case "Hire":  return <Hire  />;
      case "Blog":  return <Blog  />;
      case "About": return <About />;
      default:      return <Home  setPage={setPage} />;
    }
  }

  return (
    <div style={{ background: "#f8f7f4", minHeight: "100vh" }}>

      {/* Always visible at top */}
      <Navbar page={page} setPage={setPage} />

      {/* Page content */}
      <main>{renderPage()}</main>

      {/* Always visible at bottom */}
      <Footer setPage={setPage} />

    </div>
  );
}

export default App;