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
  const initialFilters = {
    searchTerm: "",
    selectedType: "",
    selectedAbility: "",
    selectedStat: "hp",
    statOperator: ">",
    statValue: "",
  };

  const [pendingFilters, setPendingFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
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
    const keyword = appliedFilters.searchTerm.trim().toLowerCase();

    return pokemonData.filter((p) => {
      const displayName = getDisplayName(p).toLowerCase();
      const englishName = getEnglishName(p).toLowerCase();

      const matchesSearch =
        !keyword ||
        displayName.includes(keyword) ||
        englishName.includes(keyword);

      const matchesType =
        !appliedFilters.selectedType ||
        getTypes(p).includes(appliedFilters.selectedType);

      const matchesAbility =
        !appliedFilters.selectedAbility ||
        getAbilities(p).includes(appliedFilters.selectedAbility);

      const numericStatValue = Number(appliedFilters.statValue);
      const hasStatFilter =
        appliedFilters.statValue !== "" && Number.isFinite(numericStatValue);
      const currentStatValue = Number(getStats(p)[appliedFilters.selectedStat] ?? 0);
      const matchesStat = !hasStatFilter
        ? true
        : appliedFilters.statOperator === ">"
          ? currentStatValue > numericStatValue
          : appliedFilters.statOperator === "<"
            ? currentStatValue < numericStatValue
            : currentStatValue === numericStatValue;

      return matchesSearch && matchesType && matchesAbility && matchesStat;
    });
  }, [appliedFilters]);

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

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setAppliedFilters(pendingFilters);
    setCurrentPage(1);
  };

  return (
    <section>
      <h2 className="page-title">Pokemon List</h2>

      <form className="filter-panel" onSubmit={handleSearchSubmit}>
        <SearchBar
          value={pendingFilters.searchTerm}
          onChange={(value) =>
            setPendingFilters((prev) => ({ ...prev, searchTerm: value }))
          }
        />

        <button type="submit" className="button">
          ค้นหา
        </button>

        <select
          className="select"
          value={pendingFilters.selectedType}
          onChange={(e) =>
            setPendingFilters((prev) => ({ ...prev, selectedType: e.target.value }))
          }
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
          value={pendingFilters.selectedAbility}
          onChange={(e) =>
            setPendingFilters((prev) => ({ ...prev, selectedAbility: e.target.value }))
          }
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
          value={pendingFilters.selectedStat}
          onChange={(e) =>
            setPendingFilters((prev) => ({ ...prev, selectedStat: e.target.value }))
          }
        >
          {statOptions.map((option) => (
            <option key={option.value} value={option.value}>
              สเตตัส: {option.label}
            </option>
          ))}
        </select>

        <select
          className="select"
          value={pendingFilters.statOperator}
          onChange={(e) =>
            setPendingFilters((prev) => ({ ...prev, statOperator: e.target.value }))
          }
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
          value={pendingFilters.statValue}
          onChange={(e) =>
            setPendingFilters((prev) => ({ ...prev, statValue: e.target.value }))
          }
        />
      </form>

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
