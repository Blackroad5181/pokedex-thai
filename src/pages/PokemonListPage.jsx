import { useMemo, useState } from "react";
import pokemonData from "../data/pokemon.json";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import abilitiesData from "../data/abilities.json";
import { getDisplayName, getEnglishName } from "../utils/pokemonDisplay";

function PokemonListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedAbility, setSelectedAbility] = useState("");

  const allTypes = useMemo(() => {
    const typeSet = new Set();

    pokemonData.forEach((p) => {
      (p.types || []).forEach((type) => typeSet.add(type));
    });

    return Array.from(typeSet).sort();
  }, []);

  const allAbilities = useMemo(() => {
    const abilitySet = new Set();

    pokemonData.forEach((p) => {
      (p.abilities || []).forEach((ab) => abilitySet.add(ab));
    });

    return Array.from(abilitySet).sort();
  }, []);

  const filteredPokemon = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return pokemonData.filter((p) => {
      const displayName = getDisplayName(p).toLowerCase();
      const englishName = getEnglishName(p).toLowerCase();

      const matchesSearch =
        !keyword ||
        displayName.includes(keyword) ||
        englishName.includes(keyword);

      const matchesType =
        !selectedType || (p.types || []).includes(selectedType);

      const matchesAbility =
        !selectedAbility || (p.abilities || []).includes(selectedAbility);

      return matchesSearch && matchesType && matchesAbility;
    });
  }, [searchTerm, selectedType, selectedAbility]);

  return (
    <section className="list-page">
      <div className="section-heading">
        <h2>Pokémon List</h2>
        <p>{filteredPokemon.length} champions found</p>
      </div>

      <div className="filters-panel">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <div className="filters-grid">
          <label className="field-group">
            <span>Type</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="">ทุกประเภท</option>
              {allTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="field-group">
            <span>Ability</span>
            <select
              value={selectedAbility}
              onChange={(e) => setSelectedAbility(e.target.value)}
              className="filter-select"
            >
              <option value="">ทุกความสามารถ</option>
              {allAbilities.map((abId) => {
                const ability = abilitiesData.find((ab) => ab.id === abId);

                return (
                  <option key={abId} value={abId}>
                    {ability ? ability.name.en : abId}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
      </div>

      {filteredPokemon.length > 0 ? (
        <div className="pokemon-grid">
          {filteredPokemon.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      ) : (
        <p className="empty-state">ไม่พบโปเกมอนที่ค้นหา</p>
      )}
    </section>
  );
}

export default PokemonListPage;
