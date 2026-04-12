import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import abilitiesData from "../data/abilities.json";
import {
  getAbilities,
  getDexNo,
  getDisplayName,
  getEnglishName,
  getImageSrc,
  getStats,
  SAFE_PLACEHOLDER_IMAGE,
  getTypes,
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
  const types = getTypes(pokemon);
  const [imageSrc, setImageSrc] = useState(getImageSrc(pokemon));

  useEffect(() => {
    setImageSrc(getImageSrc(pokemon));
  }, [pokemon]);

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

        <div className="pokemon-card__image-wrap">
          <img
            src={imageSrc}
            alt={englishName}
            className="pokemon-card__image"
            loading="lazy"
            onError={() => setImageSrc(SAFE_PLACEHOLDER_IMAGE)}
          />
        </div>

        <p className="meta-label">Type</p>
        <div className="type-badge-row">
          {types.length ? (
            types.map((type) => (
              <span key={type} className={`type-badge type-badge--${type.toLowerCase()}`}>
                {type}
              </span>
            ))
          ) : (
            <span className="meta-value">TBD</span>
          )}
        </div>

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
