import { useEffect, useMemo, useState } from "react";
import pokemonData from "../data/pokemon.json";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import abilitiesData from "../data/abilities.json";
import {
  getAbilities,
  getDisplayName,
  getEnglishName,
  getTypes,
} from "../utils/pokemonDisplay";

function PokemonListPage() {
  const PAGE_SIZE = 20;
  const [inputSearchTerm, setInputSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedAbility, setSelectedAbility] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const allTypes = useMemo(() => {
    const typeSet = new Set();

    pokemonData.forEach((p) => {
      getTypes(p).forEach((type) => typeSet.add(type));
    });

    return Array.from(typeSet).sort();
  }, []);

  const allAbilities = useMemo(() => {
    const abilitySet = new Set();

    pokemonData.forEach((p) => {
      getAbilities(p).forEach((ab) => abilitySet.add(ab));
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
        !selectedType || getTypes(p).includes(selectedType);

      const matchesAbility =
        !selectedAbility || getAbilities(p).includes(selectedAbility);

      return matchesSearch && matchesType && matchesAbility;
    });
  }, [searchTerm, selectedType, selectedAbility]);

  const totalPages = Math.max(1, Math.ceil(filteredPokemon.length / PAGE_SIZE));

  const paginatedPokemon = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredPokemon.slice(start, start + PAGE_SIZE);
  }, [currentPage, filteredPokemon, PAGE_SIZE]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div>
      <h2>Pokemon List</h2>

      <div style={{ marginBottom: "16px" }}>
        <SearchBar value={inputSearchTerm} onChange={setInputSearchTerm} />

        <button
          type="button"
          onClick={() => {
            setSearchTerm(inputSearchTerm);
            setCurrentPage(1);
          }}
          style={{
            width: "100%",
            maxWidth: "220px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        >
          ค้นหา
        </button>

        <br />

        <select
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setCurrentPage(1);
          }}
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
          onChange={(e) => {
            setSelectedAbility(e.target.value);
            setCurrentPage(1);
          }}
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
          {paginatedPokemon.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}

          <div style={{ marginTop: "16px" }}>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              style={{ marginRight: "8px" }}
            >
              ก่อนหน้า
            </button>
            <span>
              หน้า {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={currentPage === totalPages}
              style={{ marginLeft: "8px" }}
            >
              ถัดไป
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
