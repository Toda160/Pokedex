import { useState } from "react";
import SearchBar from "../components/SearchBar";
import TypeFilter from "../components/TypeFilter";
import SortSelect from "../components/SortSelect";
import PokemonList from "../components/PokemonList";
import ThemeToggle from "../components/ThemeToggle";

export default function Pokedex() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sort, setSort] = useState<
    "" | "name-asc" | "name-desc" | "weight-asc" | "weight-desc"
  >("");

  return (
    <>
      <ThemeToggle />
      <main className="container">
        <h1 className="title">Pokédex</h1>

        <div className="toolbar">
          <SearchBar value={search} onChange={setSearch} />
          <TypeFilter value={typeFilter} onChange={setTypeFilter} />
          <SortSelect value={sort} onChange={setSort} />
        </div>

        <PokemonList search={search} typeFilter={typeFilter} sort={sort} />
      </main>
    </>
  );
}
