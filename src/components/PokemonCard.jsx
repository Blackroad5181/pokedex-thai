import { Link } from "react-router-dom";
import abilitiesData from "../data/abilities.json";
import {
  getAbilities,
  getDexNo,
  getDisplayName,
  getEnglishName,
  getStats,
  getTypesDisplay,
} from "../utils/pokemonDisplay";

function PokemonCard({ pokemon }) {
  const stats = getStats(pokemon);
  const compactStats = [
    { key: "hp", label: "HP" },
    { key: "attack", label: "ATK" },
    { key: "defense", label: "DEF" },
    { key: "spAttack", label: "SpA" },
    { key: "spDefense", label: "SpD" },
    { key: "speed", label: "SPD" },
  ];
  const abilityNames = getAbilities(pokemon)
    .map((abilityId) => {
      const ability = abilitiesData.find((ab) => ab.id === abilityId);
      return ability ? ability.name.en : abilityId;
    })
    .filter(Boolean);

  const displayName = getDisplayName(pokemon);
  const englishName = getEnglishName(pokemon);

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="pokemon-card-link">
      <article className="pokemon-card">
        <div className="pokemon-card__top">
          <h3>
            {displayName}
            {displayName !== englishName ? ` (${englishName})` : ""}
          </h3>
          <span className="dex-badge">#{getDexNo(pokemon)}</span>
        </div>

        <p className="meta-label">Type</p>
        <p className="meta-value">{getTypesDisplay(pokemon)}</p>

        <p className="meta-label">Ability</p>
        <p className="meta-value">
          {abilityNames.length ? abilityNames.join(", ") : "TBD"}
        </p>

        <div className="card-stats">
          {compactStats.map((stat) => (
            <div key={stat.key} className="card-stat-chip">
              <span>{stat.label}</span>
              <strong>{stats[stat.key] ?? "-"}</strong>
            </div>
          ))}
        </div>
      </article>
    </Link>
  );
}

export default PokemonCard;
