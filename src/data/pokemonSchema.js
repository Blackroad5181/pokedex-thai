import rawPokemonData from "./pokemon.json";

function getChampionsStatus(availableInChampions, championsStatus) {
  if (championsStatus) {
    return championsStatus;
  }

  return availableInChampions ? "available" : "unavailable";
}

export function normalizePokemon(pokemon) {
  const availableInChampions =
    pokemon.champions?.availableInChampions ??
    pokemon.availableInChampions ??
    false;

  const championsStatus = getChampionsStatus(
    availableInChampions,
    pokemon.champions?.championsStatus ?? pokemon.championsStatus
  );

  const sourceGame =
    pokemon.champions?.sourceGame ??
    pokemon.sourceGame ??
    "Pokemon Champions";

  const isPlaceholder =
    pokemon.champions?.isPlaceholder ??
    pokemon.isPlaceholder ??
    false;

  const lastVerified =
    pokemon.champions?.lastVerified ??
    pokemon.lastVerified ??
    null;

  const notes = pokemon.champions?.notes ?? pokemon.notes ?? "";

  return {
    ...pokemon,
    availableInChampions,
    championsStatus,
    sourceGame,
    isPlaceholder,
    lastVerified,
    notes,
    champions: {
      availableInChampions,
      championsStatus,
      sourceGame,
      isPlaceholder,
      lastVerified,
      notes,
    },
  };
}

const pokemonData = rawPokemonData.map(normalizePokemon);

export default pokemonData;
