import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

type TypeFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dark",
  "dragon",
  "steel",
  "fairy",
] as const;

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function TypeFilter({ value, onChange }: TypeFilterProps) {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, 200);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <select
      className="type-select"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      aria-label="Filter by type"
    >
      <option value="">All types</option>
      {POKEMON_TYPES.map((t) => (
        <option key={t} value={t}>
          {capitalize(t)}
        </option>
      ))}
    </select>
  );
}
