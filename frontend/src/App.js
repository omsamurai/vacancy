import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";

function App() {
  const [page, setPage] = useState("Home");

  function renderPage() {
    switch (page) {
      case "Home": return <Home setPage={setPage} />;
      case "Jobs": return <Jobs />;
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