import { useEffect, useState } from "react";
import { getGlobalIndex, getPokemon, getType } from "../lib/api";
import { Pokemon } from "../types/pokeapi";

type SortOption = "" | "name-asc" | "name-desc" | "weight-asc" | "weight-desc";

interface UsePokemonListOptions {
  page: number;
  search: string;
  typeFilter: string;
  sort?: SortOption;
  pageSize?: number;
}

export default function usePokemonList({
  page,
  search,
  typeFilter,
  sort = "",
  pageSize = 20,
}: UsePokemonListOptions) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        setLoading(true);
        setError(null);

        const allPokemon = await getGlobalIndex();

        let filtered = allPokemon.results.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(search.toLowerCase())
        );

        if (typeFilter) {
          const typeData = await getType(typeFilter);
          const typePokemonNames = new Set(
            typeData.pokemon.map((p) => p.pokemon.name)
          );
          filtered = filtered.filter((pokemon) =>
            typePokemonNames.has(pokemon.name)
          );
        }

        setTotal(filtered.length);

        if (sort === "name-asc") {
          filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === "name-desc") {
          filtered.sort((a, b) => b.name.localeCompare(a.name));
        }

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const pagePokemon = filtered.slice(start, end);

        const pokemonDetails = await Promise.all(
          pagePokemon.map((pokemon) => getPokemon(pokemon.name))
        );

        if (sort === "weight-asc") {
          pokemonDetails.sort((a, b) => a.weight - b.weight);
        } else if (sort === "weight-desc") {
          pokemonDetails.sort((a, b) => b.weight - a.weight);
        }

        setPokemonList(pokemonDetails);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Eroare necunoscută");
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [page, search, typeFilter, sort, pageSize]);

  return { pokemonList, total, loading, error };
}
