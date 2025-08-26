import { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, 300);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  return (
    <input
      className="search-input"
      type="text"
      value={localValue}
      onChange={handleChange}
      placeholder="Caută Pokémon..."
      aria-label="Search Pokémon"
    />
  );
}
