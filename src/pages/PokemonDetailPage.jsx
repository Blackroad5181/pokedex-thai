import { Link, useParams } from "react-router-dom";
import pokemonData from "../data/pokemon.json";
import abilitiesData from "../data/abilities.json";
import {
  getDescriptionDisplay,
  getDisplayName,
  getEnglishName,
  getImageSrc,
} from "../utils/pokemonDisplay";

function PokemonDetailPage() {
  const { id } = useParams();

  const pokemonIndex = pokemonData.findIndex((p) => String(p.id) === id);

  const pokemon = pokemonData[pokemonIndex];

  if (!pokemon) {
    return (
      <div className="detail-page">
        <h2>ไม่พบข้อมูลโปเกมอน</h2>
        <Link to="/" className="nav-link">← กลับ</Link>
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
    <section className="detail-page">
      <Link to="/" className="nav-link">← กลับไปหน้า List</Link>

      <article className="detail-card">
        <div className="detail-left">
          <img
            src={getImageSrc(pokemon)}
            alt={englishName}
            className="detail-image"
          />

          <h2>
            {displayName}
            {displayName !== englishName ? ` (${englishName})` : ""}
          </h2>

          <p className="detail-subtle">Dex No: #{pokemon.dexNo}</p>

          <div className="detail-types">
            {(pokemon.types || []).map((type) => (
              <span key={type} className="type-chip">
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="detail-right">
          <div className="detail-meta-block">
            <h3>Overview</h3>
            <p>
              <strong>Ability:</strong> {abilityNames.length ? abilityNames.join(", ") : "TBD"}
            </p>
            <p>
              <strong>Description:</strong> {getDescriptionDisplay(pokemon)}
            </p>
          </div>

          <div className="detail-meta-block">
            <h3>Base Stats</h3>
            {(Object.entries(pokemon.stats || {})).map(([key, value]) => (
              <div key={key} className="stat-row">
                <div className="stat-row__label">
                  <span>{statLabels[key] || key}</span>
                  <span>{value}</span>
                </div>
                <div className="stat-row__track">
                  <div
                    className="stat-row__bar"
                    style={{ width: `${Math.min((value / 160) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <div className="detail-nav">
        {prev ? (
          <Link to={`/pokemon/${prev.id}`} className="nav-link">← {getEnglishName(prev)}</Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link to={`/pokemon/${next.id}`} className="nav-link">{getEnglishName(next)} →</Link>
        ) : null}
      </div>
    </section>
  );
}

export default PokemonDetailPage;
