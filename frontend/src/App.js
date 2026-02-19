import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {

  // This controls which page is currently shown
  // We'll use this to render different pages later
  const [page, setPage] = useState("Home");

  return (
    <div>
      {/* Navbar is always visible on every page */}
      <Navbar page={page} setPage={setPage} />

      {/* Temporary — just to confirm clicking nav works */}
      <h2 style={{ padding: "40px", color: "#888" }}>
        Current Page: {page}
      </h2>
    </div>
  );
}

export default App;