import { Link } from "react-router-dom";
import abilitiesData from "../data/abilities.json";
import {
  getAbilities,
  getDexNo,
  getDisplayName,
  getEnglishName,
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
      </article>
    </Link>
  );
}

export default PokemonCard;
