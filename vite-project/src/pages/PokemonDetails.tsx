import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemon } from "../lib/api";
import { Pokemon } from "../types/pokeapi";
import StatBar from "../components/StatBar";

export default function PokemonDetails() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;

    (async () => {
      try {
        setLoading(true);
        const data = await getPokemon(name);
        setPokemon(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, [name]);

  if (loading) return <div className="details-loading">Loading...</div>;
  if (error) return <div className="details-error">Error: {error}</div>;
  if (!pokemon) return <div className="details-error">Pokemon not found</div>;

  const art =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default ??
    "";

  return (
    <div className="details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="details-card">
        <img className="details-image" src={art} alt={pokemon.name} />

        <div className="details-info">
          <h1 className="details-title">
            #{pokemon.id}{" "}
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h1>

          <div className="details-types">
            {pokemon.types.map((t) => (
              <span key={t.slot} className={`type-badge type-${t.type.name}`}>
                {t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
              </span>
            ))}
          </div>

          <div className="details-stats">
            <div className="stat-row">
              <span className="stat-label">Height:</span>
              <span className="stat-value">{pokemon.height / 10}m</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Weight:</span>
              <span className="stat-value">{pokemon.weight / 10}kg</span>
            </div>
          </div>

          <div className="stats-section">
            <h3>Base Stats</h3>
            <div className="stats-list">
              {pokemon.stats?.map((stat) => (
                <div key={stat.stat.name} className="stat-item">
                  <span className="stat-name">{stat.stat.name}:</span>
                  <StatBar value={stat.base_stat} max={255} />
                  <span className="stat-value">{stat.base_stat}</span>
                </div>
              )) || <p>Stats not available</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
