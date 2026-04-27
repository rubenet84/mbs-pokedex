'use client';

import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';

export type ViewType = 'card' | 'list';

interface ViewTogglerProps {
  onViewChange: (viewType: ViewType) => void;
}

/**
 * Control de interfaz para alternar entre vista de tarjetas y lista.
 * Mantiene su estado local y notifica cambios al componente padre.
 */
export default function ViewToggler({ onViewChange }: ViewTogglerProps) {
  const [viewType, setViewType] = useState<ViewType>('card');

  const updateViewType = (nextViewType: ViewType) => {
    setViewType(nextViewType);
    onViewChange(nextViewType);
  };

  return (
    <div
      className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 bg-white p-1 shadow-sm"
      role="group"
      aria-label="Selector de vista de Pokémon"
    >
      <button
        type="button"
        onClick={() => updateViewType('card')}
        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
          viewType === 'card' ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
        }`}
        aria-pressed={viewType === 'card'}
      >
        <LayoutGrid className="h-4 w-4" aria-hidden="true" />
        <span>Cards</span>
      </button>
      <button
        type="button"
        onClick={() => updateViewType('list')}
        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
          viewType === 'list' ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
        }`}
        aria-pressed={viewType === 'list'}
      >
        <List className="h-4 w-4" aria-hidden="true" />
        <span>Lista</span>
      </button>
    </div>
  );
}
