type StatBarProps = {
  value: number;
  max: number;
};

export default function StatBar({ value, max }: StatBarProps) {
  const percentage = (value / max) * 100;

  return (
    <div className="stat-bar-container">
      <div className="stat-bar-fill" style={{ width: `${percentage}%` }} />
    </div>
  );
}
