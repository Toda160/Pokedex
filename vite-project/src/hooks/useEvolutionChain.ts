import { useEffect, useState } from "react";
import { getPokemonSpecies, getEvolutionChain, getPokemon } from "../lib/api";
import { Pokemon } from "../types/pokeapi";

export function useEvolutionChain(pokemonName: string) {
  const [evolutionChain, setEvolutionChain] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvolutionChain() {
      try {
        setLoading(true);
        setError(null);

        const species = await getPokemonSpecies(pokemonName);

        const evolutionChain = species.evolution_chain;
        if (!evolutionChain?.url) {
          throw new Error("Nu s-a găsit evolution chain pentru acest Pokemon");
        }
        const evolutionChainId = parseInt(
          evolutionChain.url.split("/").slice(-2)[0]
        );

        const chain = await getEvolutionChain(evolutionChainId);

        const pokemonNames: string[] = [];

        pokemonNames.push(chain.chain.species.name);

        chain.chain.evolves_to.forEach((evolution) => {
          pokemonNames.push(evolution.species.name);

          evolution.evolves_to.forEach((thirdEvolution) => {
            pokemonNames.push(thirdEvolution.species.name);
          });
        });

        const pokemonDetails = await Promise.all(
          pokemonNames.map((name) => getPokemon(name))
        );

        const sortedDetails = pokemonNames
          .map((name) => pokemonDetails.find((p) => p.name === name))
          .filter(Boolean) as Pokemon[];

        setTimeout(() => {
          setEvolutionChain(sortedDetails);
        }, 100);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Eroare la încărcarea evoluțiilor"
        );
      } finally {
        setLoading(false);
      }
    }

    if (pokemonName) {
      fetchEvolutionChain();
    }
  }, [pokemonName]);

  return { evolutionChain, loading, error };
}
