import { Routes, Route } from "react-router-dom";
import PokemonListPage from "./pages/PokemonListPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";

function App() {
  return (
    <div>
      <h1>My Pokedex 🔥</h1>

      <Routes>
        <Route path="/" element={<PokemonListPage />} />
        <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
        <Route path="*" element={<PokemonListPage />} />
      </Routes>
    </div>
  );
}

export default App;
