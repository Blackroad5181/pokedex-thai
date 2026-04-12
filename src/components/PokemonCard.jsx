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
  const abilityNames = getAbilities(pokemon)
    .map((abilityId) => {
      const ability = abilitiesData.find((ab) => ab.id === abilityId);
      return ability ? ability.name.en : abilityId;
    })
    .filter(Boolean);

  const displayName = getDisplayName(pokemon);
  const englishName = getEnglishName(pokemon);
  const stats = getStats(pokemon);
  const statItems = [
    ["HP", stats.hp],
    ["ATK", stats.attack],
    ["DEF", stats.defense],
    ["SPD", stats.speed],
  ];

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

        <div className="stats-inline" aria-label="Base stats">
          {statItems.map(([label, value]) => (
            <span key={label} className="stats-inline__item">
              <strong>{label}</strong> {value ?? "-"}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}

export default PokemonCard;
