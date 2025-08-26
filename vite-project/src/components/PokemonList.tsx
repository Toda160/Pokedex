import { useEffect, useState } from "react";
import usePokemonList from "../hooks/usePokemonList";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";

type PokemonListProps = {
  search: string;
  typeFilter: string;
  sort: "" | "name-asc" | "name-desc" | "weight-asc" | "weight-desc";
  pageSize?: number;
};

export default function PokemonList({
  search,
  typeFilter,
  sort,
  pageSize = 20,
}: PokemonListProps) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search, typeFilter, sort]);

  const { pokemonList, total, loading, error } = usePokemonList({
    page,
    search,
    typeFilter,
    sort,
    pageSize,
  });

  return (
    <section className="list-wrap">
      {error && <p className="error">Error: {error}</p>}
      {loading && <p className="loading">Loading...</p>}

      <div className="grid">
        {pokemonList.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>

      <Pagination
        page={page}
        total={total}
        pageSize={pageSize}
        onChange={setPage}
      />
    </section>
  );
}
