import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  const [page, setPage] = useState("Home");

  // This function will render the correct page
  // We'll keep adding pages here as we build them
  function renderPage() {
    switch (page) {
      case "Home": return <Home setPage={setPage} />;
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