import { useEffect, useState } from "react";
import { getGlobalIndex, getPokemon, getType } from "../lib/api";
import { NamedAPIResource, Pokemon } from "../types/pokeapi";
import useDebounce from "./useDebounce";

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
  const [globalList, setGlobalList] = useState<NamedAPIResource[]>([]);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalMatched, setTotalMatched] = useState(0);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const data = await getGlobalIndex({ signal: controller.signal });
        setGlobalList(data.results);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!globalList.length) return;

    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);

        let matched: NamedAPIResource[] = globalList.filter((p) =>
          p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

        if (typeFilter) {
          const typeRes = await getType(typeFilter, {
            signal: controller.signal,
          });
          const typeSet = new Set(typeRes.pokemon.map((x) => x.pokemon.name));
          matched = matched.filter((p) => typeSet.has(p.name));
        }

        if (sort === "name-asc" || sort === "name-desc") {
          matched = [...matched].sort((a, b) => {
            const cmp = a.name.localeCompare(b.name);
            return sort === "name-asc" ? cmp : -cmp;
          });
        }

        setTotalMatched(matched.length);

        const start = (page - 1) * pageSize;
        const pageSlice = matched.slice(start, start + pageSize);

        let details = await Promise.all(
          pageSlice.map((p) =>
            getPokemon(p.name, { signal: controller.signal })
          )
        );

        if (sort === "weight-asc" || sort === "weight-desc") {
          details = [...details].sort((a, b) => {
            const cmp = a.weight - b.weight;
            return sort === "weight-asc" ? cmp : -cmp;
          });
        }

        setPokemonList(details);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [globalList, debouncedSearch, typeFilter, sort, page, pageSize]);

  return { pokemonList, total: totalMatched, loading, error };
}
