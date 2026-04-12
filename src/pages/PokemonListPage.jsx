import { useEffect, useMemo, useState } from "react";
import pokemonData from "../data/pokemon.json";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import abilitiesData from "../data/abilities.json";
import {
  getAbilities,
  getDisplayName,
  getEnglishName,
  getStats,
  getTypes,
} from "../utils/pokemonDisplay";

function PokemonListPage() {
  const PAGE_SIZE = 20;
  const statOptions = [
    { value: "hp", label: "HP" },
    { value: "attack", label: "Attack" },
    { value: "defense", label: "Defense" },
    { value: "spAttack", label: "Sp. Attack" },
    { value: "spDefense", label: "Sp. Defense" },
    { value: "speed", label: "Speed" },
  ];
  const [inputSearchTerm, setInputSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedAbility, setSelectedAbility] = useState("");
  const [selectedStat, setSelectedStat] = useState("hp");
  const [statOperator, setStatOperator] = useState(">");
  const [statValue, setStatValue] = useState("");
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

      const matchesType = !selectedType || getTypes(p).includes(selectedType);

      const matchesAbility =
        !selectedAbility || getAbilities(p).includes(selectedAbility);

      const numericStatValue = Number(statValue);
      const hasStatFilter = statValue !== "" && Number.isFinite(numericStatValue);
      const currentStatValue = Number(getStats(p)[selectedStat] ?? 0);
      const matchesStat = !hasStatFilter
        ? true
        : statOperator === ">"
          ? currentStatValue > numericStatValue
          : statOperator === "<"
            ? currentStatValue < numericStatValue
            : currentStatValue === numericStatValue;

      return matchesSearch && matchesType && matchesAbility && matchesStat;
    });
  }, [searchTerm, selectedType, selectedAbility, selectedStat, statOperator, statValue]);

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
    <section>
      <h2 className="page-title">Pokemon List</h2>

      <div className="filter-panel">
        <SearchBar value={inputSearchTerm} onChange={setInputSearchTerm} />

        <button
          type="button"
          className="button"
          onClick={() => {
            setSearchTerm(inputSearchTerm);
            setCurrentPage(1);
          }}
        >
          ค้นหา
        </button>

        <select
          className="select"
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">ทุกประเภท</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          className="select"
          value={selectedAbility}
          onChange={(e) => {
            setSelectedAbility(e.target.value);
            setCurrentPage(1);
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

        <select
          className="select"
          value={selectedStat}
          onChange={(e) => {
            setSelectedStat(e.target.value);
            setCurrentPage(1);
          }}
        >
          {statOptions.map((option) => (
            <option key={option.value} value={option.value}>
              สเตตัส: {option.label}
            </option>
          ))}
        </select>

        <select
          className="select"
          value={statOperator}
          onChange={(e) => {
            setStatOperator(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value=">">สเตตัส &gt;</option>
          <option value="<">สเตตัส &lt;</option>
          <option value="=">สเตตัส =</option>
        </select>

        <input
          className="input"
          type="number"
          min="0"
          placeholder="ค่าสเตตัส"
          value={statValue}
          onChange={(e) => {
            setStatValue(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {filteredPokemon.length > 0 ? (
        <>
          <p className="results-meta">
            แสดงผล {paginatedPokemon.length} จาก {filteredPokemon.length} ตัว
          </p>

          <div className="pokemon-grid">
            {paginatedPokemon.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>

          <div className="pagination">
            <button
              type="button"
              className="pagination-button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
            >
              ก่อนหน้า
            </button>
            <span>
              หน้า {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              className="pagination-button"
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={currentPage === totalPages}
            >
              ถัดไป
            </button>
          </div>
        </>
      ) : (
        <p className="empty-state">ไม่พบโปเกมอนที่ค้นหา</p>
      )}
    </section>
  );
}

export default PokemonListPage;
