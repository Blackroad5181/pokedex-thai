import { useMemo, useState } from "react";
import pokemonData from "../data/pokemon.json";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import abilitiesData from "../data/abilities.json";

function PokemonListPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedAbility, setSelectedAbility] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

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

  const totalPages = Math.ceil(filteredPokemon.length / pageSize);

  const paginatedPokemon = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPokemon.slice(start, start + pageSize);
  }, [currentPage, filteredPokemon]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setCurrentPage(1);
  };

  const handleAbilityChange = (e) => {
    setSelectedAbility(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <h2>Pokemon List</h2>

      <div style={{ marginBottom: "16px" }}>
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onSubmit={handleSearchSubmit}
        />

        <br />

        <select
          value={selectedType}
          onChange={handleTypeChange}
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
          onChange={handleAbilityChange}
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
        <>
          <p style={{ marginBottom: "8px" }}>
            Page {currentPage} of {totalPages}
          </p>

          {paginatedPokemon.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "16px",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              style={{ padding: "8px 12px" }}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  style={{
                    padding: "8px 12px",
                    fontWeight: currentPage === page ? "bold" : "normal",
                  }}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.min(page + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              style={{ padding: "8px 12px" }}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>ไม่พบโปเกมอนที่ค้นหา</p>
      )}
    </div>
  );
}

export default PokemonListPage;
