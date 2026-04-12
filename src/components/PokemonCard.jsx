import { Link } from "react-router-dom";
import abilitiesData from "../data/abilities.json";
import {
  getDisplayName,
  getEnglishName,
  getTypesDisplay,
} from "../utils/pokemonDisplay";

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
    <Link
      to={`/pokemon/${pokemon.id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          border: "1px solid gray",
          margin: 8,
          padding: 8,
          cursor: "pointer",
          borderRadius: "12px",
        }}
      >
        <h3>
          {displayName}
          {displayName !== englishName ? ` (${englishName})` : ""}
        </h3>
        <p>#{pokemon.dexNo}</p>
        <p>Type: {getTypesDisplay(pokemon)}</p>
        <p>Ability: {abilityNames.length ? abilityNames.join(", ") : "TBD"}</p>
      </div>
    </Link>
  );
}

export default PokemonCard;
