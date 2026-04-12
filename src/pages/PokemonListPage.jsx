import { useMemo, useState } from "react";
import pokemonData from "../data/pokemonSchema";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import abilitiesData from "../data/abilities.json";

function PokemonListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedAbility, setSelectedAbility] = useState("");

  const allTypes = useMemo(() => {
    const typeSet = new Set();

    pokemonData.forEach((p) => {
      p.types.forEach((type) => typeSet.add(type));
    });

    return Array.from(typeSet).sort();
  }, []);
  
    const allAbilities = useMemo(() => {
        const abilitySet = new Set();
    
      pokemonData.forEach((p) => {
        p.abilities.forEach((ab) => abilitySet.add(ab));
      });
    
      return Array.from(abilitySet).sort();
    }, []);

const filteredPokemon = useMemo(() => {
  const keyword = searchTerm.trim().toLowerCase();

  return pokemonData.filter((p) => {
    const thaiName = p.name.th.toLowerCase();
    const englishName = p.name.en.toLowerCase();

    const matchesSearch =
      !keyword ||
      thaiName.includes(keyword) ||
      englishName.includes(keyword);

    const matchesType =
      !selectedType || p.types.includes(selectedType);

    const matchesAbility =
      !selectedAbility || p.abilities.includes(selectedAbility);

    return matchesSearch && matchesType && matchesAbility;
  });
}, [searchTerm, selectedType, selectedAbility]);

  return (
    <div>
      <h2>Pokemon List</h2>

      <div style={{ marginBottom: "16px" }}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <br />

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "220px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
          }}
        >
          <option value="">ทุกประเภท</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        
        <br />

        <select
          value={selectedAbility}
          onChange={(e) => setSelectedAbility(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "220px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            marginTop: "10px",
          }}
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
      </div>

      {filteredPokemon.length > 0 ? (
        filteredPokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))
      ) : (
        <p>ไม่พบโปเกมอนที่ค้นหา</p>
      )}
    </div>
  );
}

export default PokemonListPage;