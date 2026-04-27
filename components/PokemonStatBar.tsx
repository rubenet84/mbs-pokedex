interface PokemonStatBarProps {
  label: string;
  value: number;
}

/**
 * Barra de progreso para visualizar una estadística base.
 */
export default function PokemonStatBar({ label, value }: PokemonStatBarProps) {
  const normalizedValue = Math.min(100, Math.round((value / 255) * 100));

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-zinc-700">{label}</span>
        <span className="font-semibold text-zinc-900">{value}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-zinc-200">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
          style={{ width: `${normalizedValue}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
