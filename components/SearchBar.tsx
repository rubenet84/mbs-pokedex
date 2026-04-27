'use client';

import { Search, X } from '@/components/lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Barra de búsqueda para filtrar Pokémon por nombre en tiempo real.
 */
export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
        aria-hidden="true"
      />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar Pokémon por nombre..."
        className="w-full rounded-xl border border-zinc-300 bg-white py-2.5 pr-10 pl-10 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
        aria-label="Buscar Pokémon por nombre"
      />

      {value.length > 0 ? (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-700"
          aria-label="Limpiar búsqueda"
        >
          <X size={16} />
        </button>
      ) : null}
    </div>
  );
}
