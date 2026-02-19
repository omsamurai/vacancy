import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Hire from "./pages/Hire";

function App() {
  const [page, setPage] = useState("Home");

  function renderPage() {
    switch (page) {
      case "Home": return <Home setPage={setPage} />;
      case "Jobs": return <Jobs />;
      case "Hire": return <Hire />;
      default:     return <Home setPage={setPage} />;
    }
  }

  return (
    <div style={{ background: "#f8f7f4", minHeight: "100vh" }}>
      <Navbar page={page} setPage={setPage} />
      <main>{renderPage()}</main>
    </div>
  );
}

export default App;