import { Link } from "react-router-dom";
import {
  getDexNo,
  getDisplayName,
  getEnglishName,
  getImageSrc,
  getStats,
  getTypesDisplay,
} from "../utils/pokemonDisplay";

function PokemonCard({ pokemon }) {
  const displayName = getDisplayName(pokemon);
  const englishName = getEnglishName(pokemon);
  const imageSrc = getImageSrc(pokemon);
  const stats = getStats(pokemon);

  const typesDisplay = getTypesDisplay(pokemon);
  const types =
    typeof typesDisplay === "string"
      ? typesDisplay
          .split(/,|\/|\|/)
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

  const cardStats = [
    { label: "HP", value: stats.hp ?? "—", cls: "hp" },
    { label: "Atk", value: stats.attack ?? "—", cls: "attack" },
    { label: "Def", value: stats.defense ?? "—", cls: "defense" },
    { label: "SpA", value: stats.spAttack ?? "—", cls: "spatk" },
    { label: "SpD", value: stats.spDefense ?? "—", cls: "spdef" },
    { label: "Spe", value: stats.speed ?? "—", cls: "speed" },
  ];

  return (
    <Link className="pokemon-card-link" to={`/pokemon/${pokemon.id}`}>
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
          />
        </div>

        <div className="meta-label">Type</div>
        <div className="type-badge-row">
          {types.map((type) => (
            <span
              key={type}
              className={`type-badge type-${type.toLowerCase()}`}
            >
              {type}
            </span>
          ))}
        </div>

        <div className="meta-label">Base Stats</div>
        <div className="card-stats">
          {cardStats.map((stat) => (
            <div key={stat.label} className={`card-stat-chip ${stat.cls}`}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      </article>
    </Link>
  );
}

export default PokemonCard;
