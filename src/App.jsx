import "./App.css";
import { Routes, Route } from "react-router-dom";
import PokemonListPage from "./pages/PokemonListPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="app-kicker">Champion-first Pokédex</p>
        <h1>Pokémon Champion</h1>
      </header>

      <main className="app-main">
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
