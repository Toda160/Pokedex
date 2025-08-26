type SortOption = "" | "name-asc" | "name-desc" | "weight-asc" | "weight-desc";

type SortSelectProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      className="type-select"
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      aria-label="Sort by"
    >
      <option value="">No sort</option>
      <option value="name-asc">Name (A → Z)</option>
      <option value="name-desc">Name (Z → A)</option>
      <option value="weight-asc">Weight (low → high)</option>
      <option value="weight-desc">Weight (high → low)</option>
    </select>
  );
}
