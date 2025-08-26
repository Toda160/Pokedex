import { useEvolutionChain } from "../hooks/useEvolutionChain";

type EvolutionChainProps = {
  pokemonName: string;
};

export default function EvolutionChain({ pokemonName }: EvolutionChainProps) {
  const { evolutionChain, loading, error } = useEvolutionChain(pokemonName);

  return (
    <div className="evolution-chain">
      <h3>Evolution Chain</h3>
      <div className="evolution-content">
        {loading && <p className="loading">Se încarcă evoluțiile...</p>}
        {error && <p className="error">Eroare: {error}</p>}
        {!loading && !error && evolutionChain.length <= 1 && (
          <p className="no-evolution">Acest Pokemon nu are evoluții</p>
        )}
        {!loading && !error && evolutionChain.length > 1 && (
          <div className="evolution-grid">
            {evolutionChain.map((pokemon, index) => (
              <div key={pokemon.id} className="evolution-item">
                <div className="evolution-card">
                  <img
                    className="evolution-card-image"
                    src={
                      pokemon.sprites.other?.["official-artwork"]
                        ?.front_default ??
                      pokemon.sprites.front_default ??
                      ""
                    }
                    alt={pokemon.name}
                  />
                  <h4 className="evolution-card-title">
                    #{pokemon.id}{" "}
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </h4>
                </div>
                {index < evolutionChain.length - 1 && (
                  <div className="evolution-arrow">→</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
