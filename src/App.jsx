import { Routes, Route } from "react-router-dom";
import PokemonListPage from "./pages/PokemonListPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="app-kicker">Pokémon Champion Database</p>
        <h1>My Pokedex 🔥</h1>
      </header>

      <main className="page-container">
        <Routes>
          <Route path="/" element={<PokemonListPage />} />
          <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
          <Route path="*" element={<PokemonListPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
