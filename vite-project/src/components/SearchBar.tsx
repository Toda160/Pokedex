import { ChangeEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      className="search-input"
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Caută Pokémon..."
      aria-label="Search Pokémon"
    />
  );
}
