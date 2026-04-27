'use client';

import { useDeferredValue, useMemo, useState } from 'react';

import PokemonCard from '@/components/PokemonCard';
import SearchBar from '@/components/SearchBar';
import ViewToggler, { type ViewType } from '@/components/ViewToggler';
import type { PokemonListItem } from '@/types/pokemon';

interface PokemonCollectionProps {
  pokemons: PokemonListItem[];
}

/**
 * Filtra una colección de Pokémon por nombre de forma case-insensitive.
 *
 * @param pokemons - Lista completa de Pokémon disponible para mostrar.
 * @param searchTerm - Texto ingresado por el usuario en el buscador.
 * @returns Lista filtrada de Pokémon cuyo nombre incluye el término de búsqueda.
 */
function filterPokemonsByName(pokemons: PokemonListItem[], searchTerm: string): PokemonListItem[] {
  const normalizedTerm = searchTerm.trim().toLowerCase();

  if (!normalizedTerm) {
    return pokemons;
  }

  return pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(normalizedTerm));
}

/**
 * Lista interactiva de Pokémon con selector de vista y búsqueda en tiempo real.
 */
export default function PokemonCollection({ pokemons }: PokemonCollectionProps) {
  const [viewType, setViewType] = useState<ViewType>('card');
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredPokemons = useMemo(
    () => filterPokemonsByName(pokemons, deferredSearchTerm),
    [pokemons, deferredSearchTerm],
  );

  return (
    <section aria-label="Listado de Pokémon">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <div className="self-end sm:self-auto">
          <ViewToggler onViewChange={setViewType} />
        </div>
      </div>

      {filteredPokemons.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-10 text-center">
          <p className="text-base font-semibold text-zinc-700">No se encontraron Pokémon con ese nombre.</p>
          <p className="mt-1 text-sm text-zinc-500">Prueba con otro término de búsqueda.</p>
        </div>
      ) : (
        <div className={viewType === 'card' ? 'grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4' : 'flex flex-col gap-3'}>
          {filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} viewType={viewType} />
          ))}
        </div>
      )}
    </section>
  );
}
