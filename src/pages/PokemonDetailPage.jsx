import { Link, useParams } from "react-router-dom";
import pokemonData from "../data/pokemon.json";
import abilitiesData from "../data/abilities.json";
import {
  getAbilities,
  getDescriptionDisplay,
  getDexNo,
  getDisplayName,
  getEnglishName,
  getImageSrc,
  getStats,
  getTypesDisplay,
} from "../utils/pokemonDisplay";

function PokemonDetailPage() {
  const { id } = useParams();

  const pokemonIndex = pokemonData.findIndex((p) => String(p.id) === id);

  const pokemon = pokemonData[pokemonIndex];

  if (!pokemon) {
    return (
      <div>
        <h2 className="page-title">ไม่พบข้อมูลโปเกมอน</h2>
        <Link className="detail-back" to="/">
          ← กลับ
        </Link>
      </div>
    );
  }

  const abilityNames = getAbilities(pokemon)
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
    <section>
      <Link className="detail-back" to="/">
        ← กลับไปหน้า List
      </Link>

      <div className="detail-card">
        <aside className="detail-sidebar">
          <img src={getImageSrc(pokemon)} alt={englishName} className="detail-image" />

          <h2 className="detail-name">
            {displayName}
            {displayName !== englishName ? ` (${englishName})` : ""}
          </h2>

          <p className="meta-value">Dex No: #{getDexNo(pokemon)}</p>
        </aside>

        <div>
          <div className="detail-section">
            <h3>Metadata</h3>
            <p>
              <strong>Type:</strong> {getTypesDisplay(pokemon)}
            </p>
            <p>
              <strong>Ability:</strong>{" "}
              {abilityNames.length ? abilityNames.join(", ") : "TBD"}
            </p>
            <p>
              <strong>Description:</strong> {getDescriptionDisplay(pokemon)}
            </p>
          </div>

          <div className="detail-section">
            <h3>Stats</h3>

            <div className="stats-grid">
              {Object.entries(getStats(pokemon)).map(([key, value]) => (
                <div key={key} className="stat-row">
                  <div className="stat-label">
                    <span>{statLabels[key] || key}</span>
                    <span>{value}</span>
                  </div>
                  <div className="stat-track">
                    <div
                      className="stat-fill"
                      style={{ width: `${Math.min((value / 160) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="detail-nav">
        {prev ? (
          <Link className="nav-link" to={`/pokemon/${prev.id}`}>
            ← {getEnglishName(prev)}
          </Link>
        ) : (
          <span className="nav-link nav-link--empty">No previous</span>
        )}

        {next ? (
          <Link className="nav-link nav-link--right" to={`/pokemon/${next.id}`}>
            {getEnglishName(next)} →
          </Link>
        ) : (
          <span className="nav-link nav-link--empty">No next</span>
        )}
      </div>
    </section>
  );
}

export default PokemonDetailPage;
