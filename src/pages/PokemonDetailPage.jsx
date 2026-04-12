import { Link, useParams } from "react-router-dom";
import pokemonData from "../data/pokemonSchema";
import abilitiesData from "../data/abilities.json";

function PokemonDetailPage() {
  const { id } = useParams();

  const pokemonIndex = pokemonData.findIndex(
    (p) => String(p.id) === id
  );

  const pokemon = pokemonData[pokemonIndex];

  if (!pokemon) {
    return (
      <div>
        <h2>ไม่พบข้อมูลโปเกมอน</h2>
        <Link to="/">← กลับ</Link>
      </div>
    );
  }
  
  const abilityNames = pokemon.abilities.map((abilityId) => {
  const ability = abilitiesData.find((ab) => ab.id === abilityId);
  return ability ? ability.name.en : abilityId;
  });
  
  const prev = pokemonData[pokemonIndex - 1];
  const next = pokemonData[pokemonIndex + 1];
  const statLabels = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  spAttack: "Sp. Attack",
  spDefense: "Sp. Defense",
  speed: "Speed",
};

  return (
    <div style={{ marginTop: "24px" }}>
      <Link to="/">← กลับไปหน้า List</Link>

      <div
        style={{
          marginTop: "16px",
          padding: "20px",
          border: "1px solid gray",
          borderRadius: "16px",
          display: "flex",
          gap: "20px",
        }}
      >
        {/* LEFT */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            src={pokemon.image}
            alt={pokemon.name.en}
            style={{ width: "150px" }}
          />

          <h2>
            {pokemon.name.th} ({pokemon.name.en})
          </h2>

          <p>Dex No: #{pokemon.dexNo}</p>
        </div>

        {/* RIGHT */}
        <div style={{ flex: 2 }}>
          <p>
            <strong>Type:</strong> {pokemon.types.join(", ")}
          </p>

          <p>
            <strong>Ability:</strong>{" "}
            {abilityNames.join(", ")}
          </p>

          <p>
            <strong>Description:</strong> {pokemon.description}
          </p>

          <h3>Stats</h3>

            {Object.entries(pokemon.stats).map(([key, value]) => (
              <div key={key} style={{ marginBottom: "12px" }}>
                <div style={{ fontSize: "12px", marginBottom: "4px" }}>
                  {statLabels[key] || key} : {value}
                </div>
              <div
                style={{
                  height: "8px",
                  background: "#333",
                  borderRadius: "4px",
                }}
              >
                <div
                  style={{
                    width: `${Math.min((value / 160) * 100, 100)}%`,
                    height: "100%",
                    background: "#4CAF50",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NAV */}
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {prev ? (
          <Link to={`/pokemon/${prev.id}`}>
            ← {prev.name.en}
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link to={`/pokemon/${next.id}`}>
            {next.name.en} →
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default PokemonDetailPage;