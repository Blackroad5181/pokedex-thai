export const SAFE_PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='100' y='100' text-anchor='middle' dominant-baseline='middle' fill='%236b7280' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E";

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

export function getTypesDisplay(pokemon) {
  return pokemon?.types?.length ? pokemon.types.join(", ") : "TBD";
}

export function getImageSrc(pokemon) {
  return pokemon?.image?.trim() ? pokemon.image : SAFE_PLACEHOLDER_IMAGE;
}

export function getDescriptionDisplay(pokemon) {
  return pokemon?.description?.trim() || "ข้อมูลยังไม่เปิดเผย";
}
