import { Link, useParams } from "react-router-dom";
import pokemonData from "../data/pokemon.json";
import abilitiesData from "../data/abilities.json";
import {
  getDescriptionDisplay,
  getDisplayName,
  getEnglishName,
  getImageSrc,
  getTypesDisplay,
} from "../utils/pokemonDisplay";

function PokemonDetailPage() {
  const { id } = useParams();

  const pokemonIndex = pokemonData.findIndex((p) => String(p.id) === id);

  const pokemon = pokemonData[pokemonIndex];

  if (!pokemon) {
    return (
      <div>
        <h2>ไม่พบข้อมูลโปเกมอน</h2>
        <Link to="/">← กลับ</Link>
      </div>
    );
  }

  const abilityNames = (pokemon.abilities || [])
    .map((abilityId) => {
      const ability = abilitiesData.find((ab) => ab.id === abilityId);
      return ability ? ability.name.en : abilityId;
    })
    .filter(Boolean);

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
  const displayName = getDisplayName(pokemon);
  const englishName = getEnglishName(pokemon);

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
            src={getImageSrc(pokemon)}
            alt={englishName}
            style={{ width: "150px" }}
          />

          <h2>
            {displayName}
            {displayName !== englishName ? ` (${englishName})` : ""}
          </h2>

          <p>Dex No: #{pokemon.dexNo}</p>
        </div>

        {/* RIGHT */}
        <div style={{ flex: 2 }}>
          <p>
            <strong>Type:</strong> {getTypesDisplay(pokemon)}
          </p>

          <p>
            <strong>Ability:</strong> {abilityNames.length ? abilityNames.join(", ") : "TBD"}
          </p>

          <p>
            <strong>Description:</strong> {getDescriptionDisplay(pokemon)}
          </p>

          <h3>Stats</h3>

          {Object.entries(pokemon.stats || {}).map(([key, value]) => (
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
        {prev ? <Link to={`/pokemon/${prev.id}`}>← {getEnglishName(prev)}</Link> : <div />}

        {next ? <Link to={`/pokemon/${next.id}`}>{getEnglishName(next)} →</Link> : null}
      </div>
    </div>
  );
}

export default PokemonDetailPage;
