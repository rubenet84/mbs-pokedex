'use client';

import { useState } from 'react';

import PokemonCard from '@/components/PokemonCard';
import ViewToggler, { type ViewType } from '@/components/ViewToggler';
import type { PokemonListItem } from '@/types/pokemon';

interface PokemonCollectionProps {
  pokemons: PokemonListItem[];
}

/**
 * Lista interactiva de Pokémon con selector entre modo tarjeta y modo lista.
 */
export default function PokemonCollection({ pokemons }: PokemonCollectionProps) {
  const [viewType, setViewType] = useState<ViewType>('card');

  return (
    <section aria-label="Listado de Pokémon">
      <div className="mb-5 flex justify-end">
        <ViewToggler onViewChange={setViewType} />
      </div>

      <div className={viewType === 'card' ? 'grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4' : 'flex flex-col gap-3'}>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} viewType={viewType} />
        ))}
      </div>
    </section>
  );
}
