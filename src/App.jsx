import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PokemonDetail from "./pages/PokemonDetails";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
