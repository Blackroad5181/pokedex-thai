import { Link } from "react-router-dom";
import abilitiesData from "../data/abilities.json";

function PokemonCard({ pokemon }) {
  const abilityNames = pokemon.abilities.map((abilityId) => {
    const ability = abilitiesData.find((ab) => ab.id === abilityId);
    return ability ? ability.name.en : abilityId;
  });

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
          {pokemon.name.th} ({pokemon.name.en})
        </h3>
        <p>#{pokemon.dexNo}</p>
        <p>Type: {pokemon.types.join(", ")}</p>
        <p>Ability: {abilityNames.join(", ")}</p>
      </div>
    </Link>
  );
}

export default PokemonCard;