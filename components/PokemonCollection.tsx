'use client';

import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';

import PokemonCard from '@/components/PokemonCard';
import SearchBar from '@/components/SearchBar';
import ViewToggler, { type ViewType } from '@/components/ViewToggler';
import { Moon, Sun } from '@/components/lucide-react';
import { formatPokemonName } from '@/lib/pokeapi';
import type { PokemonListItem } from '@/types/pokemon';

const FAVORITES_STORAGE_KEY = 'pokedex-favorites-v1';
const PAGE_SIZE = 36;

type FavoriteFilter = 'all' | 'favorites';

interface PokemonCollectionProps {
  pokemons: PokemonListItem[];
}

interface PokemonStatEntry {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonDetailStats {
  id: number;
  name: string;
  stats: PokemonStatEntry[];
}

function filterPokemonsByName(pokemons: PokemonListItem[], searchTerm: string): PokemonListItem[] {
  const normalizedTerm = searchTerm.trim().toLowerCase();

  if (!normalizedTerm) {
    return pokemons;
  }

  return pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(normalizedTerm));
}

async function fetchPokemonStats(name: string): Promise<PokemonDetailStats | null> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    return null;
  }

  return response.json() as Promise<PokemonDetailStats>;
}

function getInitialFavorites(): number[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const savedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
  return savedFavorites ? (JSON.parse(savedFavorites) as number[]) : [];
}

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.localStorage.getItem('pokedex-theme') === 'dark';
}

export default function PokemonCollection({ pokemons }: PokemonCollectionProps) {
  const [viewType, setViewType] = useState<ViewType>('card');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [favoriteFilter, setFavoriteFilter] = useState<FavoriteFilter>('all');
  const [favoriteIds, setFavoriteIds] = useState<number[]>(getInitialFavorites);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [compareA, setCompareA] = useState('');
  const [compareB, setCompareB] = useState('');
  const [compareStatsA, setCompareStatsA] = useState<PokemonDetailStats | null>(null);
  const [compareStatsB, setCompareStatsB] = useState<PokemonDetailStats | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const deferredSearchTerm = useDeferredValue(searchTerm);

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    window.localStorage.setItem('pokedex-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const availableTypes = useMemo(() => {
    const set = new Set<string>();
    pokemons.forEach((pokemon) => pokemon.types.forEach((type) => set.add(type)));
    return ['all', ...Array.from(set).sort()];
  }, [pokemons]);

  const filteredPokemons = useMemo(() => {
    const byName = filterPokemonsByName(pokemons, deferredSearchTerm);

    return byName.filter((pokemon) => {
      const typeMatch = selectedType === 'all' || pokemon.types.includes(selectedType);
      const favoriteMatch = favoriteFilter === 'all' || favoriteIds.includes(pokemon.id);
      return typeMatch && favoriteMatch;
    });
  }, [pokemons, deferredSearchTerm, selectedType, favoriteFilter, favoriteIds]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setVisibleCount((current) => Math.min(current + PAGE_SIZE, filteredPokemons.length));
        }
      },
      { rootMargin: '240px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [filteredPokemons.length]);

  const visiblePokemons = filteredPokemons.slice(0, visibleCount);

  async function handleComparatorChange(slot: 'a' | 'b', value: string) {
    if (slot === 'a') {
      setCompareA(value);
    } else {
      setCompareB(value);
    }

    if (!value) {
      if (slot === 'a') {
        setCompareStatsA(null);
      } else {
        setCompareStatsB(null);
      }
      return;
    }

    const data = await fetchPokemonStats(value);
    if (slot === 'a') {
      setCompareStatsA(data);
    } else {
      setCompareStatsB(data);
    }
  }

  function toggleFavorite(pokemonId: number) {
    setFavoriteIds((current) =>
      current.includes(pokemonId) ? current.filter((id) => id !== pokemonId) : [...current, pokemonId],
    );
  }

  const compareStats = useMemo(() => {
    if (!compareStatsA || !compareStatsB) {
      return [];
    }

    return compareStatsA.stats.map((statA) => {
      const statB = compareStatsB.stats.find((item) => item.stat.name === statA.stat.name);
      return {
        statName: statA.stat.name,
        valueA: statA.base_stat,
        valueB: statB?.base_stat ?? 0,
      };
    });
  }, [compareStatsA, compareStatsB]);

  return (
    <section
      aria-label="Listado de Pokémon"
      className={isDarkMode ? 'rounded-3xl border border-zinc-500 bg-gradient-to-br from-zinc-800 via-red-950 to-zinc-700 p-4 text-zinc-100 shadow-inner sm:p-6' : ''}
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          value={searchTerm}
          onChange={(value) => {
            setSearchTerm(value);
            setVisibleCount(PAGE_SIZE);
          }}
        />
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => setIsDarkMode((current) => !current)}
            className="rounded-full border border-zinc-400 bg-white p-2 text-zinc-700 shadow-sm transition hover:scale-105"
            aria-label="Activar o desactivar modo oscuro Pokéball"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <ViewToggler onViewChange={setViewType} />
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {availableTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => {
              setSelectedType(type);
              setVisibleCount(PAGE_SIZE);
            }}
            className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
              selectedType === type
                ? 'border-zinc-900 bg-zinc-900 text-white'
                : 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100'
            }`}
          >
            {type === 'all' ? 'Todos' : type}
          </button>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setFavoriteFilter('all');
            setVisibleCount(PAGE_SIZE);
          }}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${favoriteFilter === 'all' ? 'bg-red-500 text-white' : 'bg-zinc-200 text-zinc-700'}`}
        >
          Todos
        </button>
        <button
          type="button"
          onClick={() => {
            setFavoriteFilter('favorites');
            setVisibleCount(PAGE_SIZE);
          }}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${favoriteFilter === 'favorites' ? 'bg-red-500 text-white' : 'bg-zinc-200 text-zinc-700'}`}
        >
          Mis Favoritos ({favoriteIds.length})
        </button>
      </div>

      <div className="mb-8 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-500">Comparador</h3>
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          <select className="rounded-lg border border-zinc-300 p-2" value={compareA} onChange={(event) => { void handleComparatorChange('a', event.target.value); }}>
            <option value="">Selecciona Pokémon A</option>
            {pokemons.map((pokemon) => (
              <option key={`a-${pokemon.id}`} value={pokemon.name}>{formatPokemonName(pokemon.name)}</option>
            ))}
          </select>
          <select className="rounded-lg border border-zinc-300 p-2" value={compareB} onChange={(event) => { void handleComparatorChange('b', event.target.value); }}>
            <option value="">Selecciona Pokémon B</option>
            {pokemons.map((pokemon) => (
              <option key={`b-${pokemon.id}`} value={pokemon.name}>{formatPokemonName(pokemon.name)}</option>
            ))}
          </select>
        </div>

        {compareStats.length > 0 ? (
          <div className="mt-4 space-y-2">
            {compareStats.map((entry) => (
              <div key={entry.statName} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-lg bg-zinc-50 px-3 py-2 text-sm">
                <span className="font-medium text-zinc-700">{formatPokemonName(entry.statName)}</span>
                <span className={`font-bold ${entry.valueA >= entry.valueB ? 'text-emerald-600' : 'text-zinc-700'}`}>{entry.valueA}</span>
                <span className={`font-bold ${entry.valueB >= entry.valueA ? 'text-emerald-600' : 'text-zinc-700'}`}>{entry.valueB}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {visiblePokemons.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-10 text-center">
          <p className="text-base font-semibold text-zinc-700">No se encontraron Pokémon con esos filtros.</p>
          <p className="mt-1 text-sm text-zinc-500">Prueba otro nombre, tipo o vista de favoritos.</p>
        </div>
      ) : (
        <>
          <div className={viewType === 'card' ? 'grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4' : 'flex flex-col gap-3'}>
            {visiblePokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                pokemon={pokemon}
                viewType={viewType}
                isFavorite={favoriteIds.includes(pokemon.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
          <div ref={sentinelRef} className="h-6" aria-hidden="true" />
        </>
      )}
    </section>
  );
}
