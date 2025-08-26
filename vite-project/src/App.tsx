import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pokedex from "./pages/Pokedex";
import PokemonDetails from "./pages/PokemonDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
