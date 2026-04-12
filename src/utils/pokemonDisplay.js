export const SAFE_PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='100' y='100' text-anchor='middle' dominant-baseline='middle' fill='%236b7280' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E";

function getChampionInfo(pokemon) {
  return pokemon?.champion ?? pokemon ?? {};
}

export function getDisplayName(pokemon) {
  const thaiName = pokemon?.name?.th?.trim();
  const englishName = pokemon?.name?.en?.trim();

  if (thaiName) {
    return thaiName;
  }

  if (englishName) {
    return englishName;
  }

  const slug = pokemon?.slug?.trim();
  if (slug) {
    return slug;
  }

  return `Unknown #${pokemon?.id ?? "-"}`;
}

export function getEnglishName(pokemon) {
  const englishName = pokemon?.name?.en?.trim();

  if (englishName) {
    return englishName;
  }

  const slug = pokemon?.slug?.trim();
  if (slug) {
    return slug;
  }

  return `Unknown #${pokemon?.id ?? "-"}`;
}

export function getDexNo(pokemon) {
  const champion = getChampionInfo(pokemon);
  return champion?.dexNo?.trim() || "-";
}

export function getTypes(pokemon) {
  const champion = getChampionInfo(pokemon);
  return Array.isArray(champion?.types) ? champion.types : [];
}

export function getAbilities(pokemon) {
  const champion = getChampionInfo(pokemon);
  return Array.isArray(champion?.abilities) ? champion.abilities : [];
}

export function getStats(pokemon) {
  const champion = getChampionInfo(pokemon);
  return champion?.stats && typeof champion.stats === "object"
    ? champion.stats
    : {};
}

export function getMoves(pokemon) {
  const champion = getChampionInfo(pokemon);
  return Array.isArray(champion?.moves) ? champion.moves : [];
}

export function formatMoveName(move) {
  if (!move || typeof move !== "string") {
    return "-";
  }

  return move
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getTypesDisplay(pokemon) {
  const types = getTypes(pokemon);
  return types.length ? types.join(", ") : "TBD";
}

export function getImageSrc(pokemon) {
  const champion = getChampionInfo(pokemon);
  return champion?.image?.trim() ? champion.image : SAFE_PLACEHOLDER_IMAGE;
}

export function getDescriptionDisplay(pokemon) {
  const champion = getChampionInfo(pokemon);
  return champion?.description?.trim() || "ข้อมูลยังไม่เปิดเผย";
}
