import { Link, useParams } from "react-router-dom";
import pokemonData from "../data/pokemon.json";
import abilitiesData from "../data/abilities.json";
import movesData from "../data/moves.json";
import {
  getAbilities,
  getDescriptionDisplay,
  getDexNo,
  getDisplayName,
  getEnglishName,
  getImageSrc,
  getMoves,
  getStats,
  getTypesDisplay,
} from "../utils/pokemonDisplay";

function PokemonDetailPage() {
  const { id } = useParams();

  const pokemonIndex = pokemonData.findIndex((p) => String(p.id) === id);
  const pokemon = pokemonData[pokemonIndex];

  if (!pokemon) {
    return (
      <div>
        <h2 className="page-title">ไม่พบข้อมูลโปเกมอน</h2>
        <Link className="detail-back" to="/">
          ← กลับ
        </Link>
      </div>
    );
  }

  const prev = pokemonData[pokemonIndex - 1];
  const next = pokemonData[pokemonIndex + 1];
  const moves = getMoves(pokemon);

  const statLabels = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    spAttack: "Sp. Attack",
    spDefense: "Sp. Defense",
    speed: "Speed",
  };

  const displayName = getDisplayName(pokemon);
  const englishName = getEnglishName(pokemon);

  const formatLabel = (value) =>
    String(value)
      .replace(/[_-]/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

  const getAbilityDetails = (abilityIdOrName) => {
    if (!abilityIdOrName) return null;

    return (
      abilitiesData.find((ab) => {
        const dbId = ab.id || "";
        const dbName =
          typeof ab.name === "string" ? ab.name : ab.name?.en || "";

        return (
          dbId === abilityIdOrName ||
          dbName === abilityIdOrName ||
          dbId.toLowerCase() === String(abilityIdOrName).toLowerCase() ||
          dbName.toLowerCase() === String(abilityIdOrName).toLowerCase()
        );
      }) || null
    );
  };

  const abilityNames = getAbilities(pokemon)
    .map((abilityId) => {
      const ability = getAbilityDetails(abilityId);

      if (!ability) return formatLabel(abilityId);
      if (typeof ability.name === "string") return ability.name;
      if (ability.name?.en) return ability.name.en;

      return formatLabel(abilityId);
    })
    .filter(Boolean);

  const getMoveDetails = (moveName) => {
    if (!moveName) return null;

    return (
      movesData.find((m) => {
        const dbId = m.id || "";
        const dbName =
          typeof m.name === "string" ? m.name : m.name?.en || "";

        return (
          dbId === moveName ||
          dbName === moveName ||
          dbId.toLowerCase() === String(moveName).toLowerCase() ||
          dbName.toLowerCase() === String(moveName).toLowerCase()
        );
      }) || null
    );
  };

  const moveRows = (Array.isArray(moves) ? moves : []).map((move, index) => {
    const moveName =
      typeof move === "string"
        ? move
        : move?.name || move?.move || `move-${index + 1}`;

    const details = getMoveDetails(moveName);

    const detailName =
      typeof details?.name === "string"
        ? details.name
        : details?.name?.en || formatLabel(moveName);

    const detailDescription =
      typeof details?.description === "string"
        ? details.description
        : details?.description?.en || "—";

    return {
      key: `${moveName}-${index}`,
      name: detailName,
      type: details?.type || move?.type || "—",
      category: details?.category || move?.category || "—",
      power: details?.power ?? move?.power ?? "—",
      accuracy: details?.accuracy ?? move?.accuracy ?? "—",
      pp: details?.pp ?? move?.pp ?? "—",
      level: move?.level ?? move?.levelLearnedAt ?? "—",
      description: detailDescription,
    };
  });

  const stats = getStats(pokemon);
  const totalStats = Object.values(stats).reduce(
    (sum, value) => sum + (Number(value) || 0),
    0
  );

  return (
    <section className="pokemon-detail-page">
      <Link className="detail-back" to="/">
        ← กลับไปหน้า List
      </Link>

      <div className="detail-card">
        <header className="detail-hero">
          <div className="detail-hero__image-wrap">
            <img
              src={getImageSrc(pokemon)}
              alt={englishName}
              className="detail-image"
            />
          </div>

          <div className="detail-hero__content">
            <p className="detail-hero__kicker">Pokemon Database</p>

            <h2 className="detail-name">
              {displayName}
              {displayName !== englishName ? ` (${englishName})` : ""}
            </h2>

            <div className="detail-tag-row">
              <span className="detail-tag">Dex #{getDexNo(pokemon)}</span>
              <span className="detail-tag">{getTypesDisplay(pokemon)}</span>
            </div>

            <p className="detail-description">
              {getDescriptionDisplay(pokemon)}
            </p>
          </div>
        </header>

        <div className="detail-sections">
          <section className="detail-section">
            <h3>Overview</h3>
            <dl className="overview-grid">
              <div className="overview-item">
                <dt>Type</dt>
                <dd>{getTypesDisplay(pokemon)}</dd>
              </div>

              <div className="overview-item">
                <dt>Ability</dt>
                <dd>{abilityNames.length ? abilityNames.join(", ") : "TBD"}</dd>
              </div>

              <div className="overview-item">
                <dt>Moves Available</dt>
                <dd>{moveRows.length}</dd>
              </div>

              <div className="overview-item">
                <dt>Source</dt>
                <dd>Pokemon Champions</dd>
              </div>
            </dl>
          </section>

          <section className="detail-section">
            <h3>Base Stats</h3>
            <div className="stats-grid">
              {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="stat-row">
                  <div className="stat-label">
                    <span>{statLabels[key] || key}</span>
                    <span>{value}</span>
                  </div>
                  <div className="stat-track">
                    <div
                      className="stat-fill"
                      style={{ width: `${Math.min((value / 160) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}

              <div className="stat-row">
                <div className="stat-label">
                  <span>Total</span>
                  <span>{totalStats}</span>
                </div>
                <div className="stat-track">
                  <div
                    className="stat-fill"
                    style={{ width: `${Math.min((totalStats / 720) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="detail-section">
            <h3>Moves</h3>

            {moveRows.length > 0 ? (
              <div className="moves-table-wrap">
                <table className="moves-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Category</th>
                      <th>Power</th>
                      <th>Accuracy</th>
                      <th>PP</th>
                      <th>Level</th>
                    </tr>
                  </thead>

                  <tbody>
                    {moveRows.map((move) => (
                      <tr key={move.key}>
                        <td>
                          <div>{move.name}</div>
                          <small style={{ opacity: 0.7 }}>
                            {move.description}
                          </small>
                        </td>
                        <td>{move.type}</td>
                        <td>{move.category}</td>
                        <td>{move.power}</td>
                        <td>{move.accuracy}</td>
                        <td>{move.pp}</td>
                        <td>{move.level}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="meta-value">No move data available.</p>
            )}
          </section>
        </div>
      </div>

      <div className="detail-nav">
        {prev ? (
          <Link className="nav-link" to={`/pokemon/${prev.id}`}>
            ← {getEnglishName(prev)}
          </Link>
        ) : (
          <span className="nav-link nav-link--empty">No previous</span>
        )}

        {next ? (
          <Link className="nav-link nav-link--right" to={`/pokemon/${next.id}`}>
            {getEnglishName(next)} →
          </Link>
        ) : (
          <span className="nav-link nav-link--empty">No next</span>
        )}
      </div>
    </section>
  );
}

export default PokemonDetailPage;
