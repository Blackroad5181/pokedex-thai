import { Link } from "react-router-dom";
import abilitiesData from "../data/abilities.json";
import { getDisplayName, getEnglishName } from "../utils/pokemonDisplay";

function PokemonCard({ pokemon }) {
  const abilityNames = (pokemon.abilities || [])
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
          <p className="pokemon-card__dex">#{pokemon.dexNo}</p>
          <p className="pokemon-card__id">ID {pokemon.id}</p>
        </div>

        <h3>
          {displayName}
          {displayName !== englishName ? ` (${englishName})` : ""}
        </h3>

        <div className="pokemon-card__chips">
          {(pokemon.types || []).map((type) => (
            <span key={type} className="type-chip">
              {type}
            </span>
          ))}
        </div>

        <p className="pokemon-card__abilities">
          <span>Ability:</span> {abilityNames.length ? abilityNames.join(", ") : "TBD"}
        </p>
      </article>
    </Link>
  );
}

export default PokemonCard;
