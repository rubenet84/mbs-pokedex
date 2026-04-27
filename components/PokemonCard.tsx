import Image from 'next/image';
import Link from 'next/link';

import { Heart } from '@/components/lucide-react';
import { formatPokemonName, isLegendaryPokemon } from '@/lib/pokeapi';
import type { PokemonListItem } from '@/types/pokemon';

/**
 * Mapa de colores para badges y fondos por tipo principal.
 */
export const typeColorMap: Record<string, { badge: string; card: string }> = {
  normal: { badge: 'bg-zinc-500', card: 'from-zinc-100 to-zinc-50' },
  fire: { badge: 'bg-red-500', card: 'from-red-100 to-rose-50' },
  water: { badge: 'bg-blue-500', card: 'from-blue-100 to-cyan-50' },
  electric: { badge: 'bg-yellow-500', card: 'from-yellow-100 to-amber-50' },
  grass: { badge: 'bg-green-500', card: 'from-green-100 to-emerald-50' },
  ice: { badge: 'bg-cyan-500', card: 'from-cyan-100 to-sky-50' },
  fighting: { badge: 'bg-orange-700', card: 'from-orange-100 to-red-50' },
  poison: { badge: 'bg-purple-500', card: 'from-purple-100 to-fuchsia-50' },
  ground: { badge: 'bg-amber-700', card: 'from-amber-100 to-orange-50' },
  flying: { badge: 'bg-indigo-400', card: 'from-indigo-100 to-violet-50' },
  psychic: { badge: 'bg-pink-500', card: 'from-pink-100 to-rose-50' },
  bug: { badge: 'bg-lime-600', card: 'from-lime-100 to-green-50' },
  rock: { badge: 'bg-stone-600', card: 'from-stone-100 to-zinc-50' },
  ghost: { badge: 'bg-violet-700', card: 'from-violet-100 to-purple-50' },
  dragon: { badge: 'bg-indigo-700', card: 'from-indigo-100 to-blue-50' },
  dark: { badge: 'bg-gray-700', card: 'from-gray-200 to-zinc-100' },
  steel: { badge: 'bg-slate-500', card: 'from-slate-100 to-zinc-50' },
  fairy: { badge: 'bg-fuchsia-400', card: 'from-fuchsia-100 to-pink-50' },
};

/**
 * Retorna estilos por tipo con fallback para tipos desconocidos.
 */
export function getTypeStyles(type: string): { badge: string; card: string } {
  return typeColorMap[type] ?? { badge: 'bg-zinc-500', card: 'from-zinc-100 to-zinc-50' };
}

export type PokemonCardViewType = 'card' | 'list';

interface PokemonCardProps {
  pokemon: PokemonListItem;
  viewType?: PokemonCardViewType;
  isFavorite: boolean;
  onToggleFavorite: (pokemonId: number) => void;
}

export default function PokemonCard({
  pokemon,
  viewType = 'card',
  isFavorite,
  onToggleFavorite,
}: PokemonCardProps) {
  const mainType = pokemon.types[0] ?? 'normal';
  const cardStyle = getTypeStyles(mainType);
  const isLegendary = isLegendaryPokemon(pokemon.id);

  const favoriteButton = (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        onToggleFavorite(pokemon.id);
      }}
      className="z-10 rounded-full border border-zinc-300 bg-white/90 p-1.5 text-zinc-500 transition hover:scale-105"
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <Heart size={16} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-zinc-500'} />
    </button>
  );

  const glitterOverlay = isLegendary ? (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.7),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(250,204,21,0.35),transparent_25%),radial-gradient(circle_at_30%_80%,rgba(99,102,241,0.25),transparent_25%)] opacity-80"
    />
  ) : null;

  if (viewType === 'list') {
    return (
      <Link
        href={`/pokemon/${pokemon.name}`}
        className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-r ${cardStyle.card} p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:gap-4 sm:p-4`}
        aria-label={`Ver detalle de ${pokemon.name}`}
      >
        {glitterOverlay}
        <div className="absolute top-2 right-2">{favoriteButton}</div>
        <div className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20">
          <Image
            src={pokemon.image}
            alt={`Artwork oficial de ${pokemon.name}`}
            fill
            sizes="(max-width: 768px) 64px, 80px"
            className="object-contain drop-shadow-md transition group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-zinc-500 sm:text-sm">#{String(pokemon.id).padStart(3, '0')}</p>
          <h2 className="truncate text-base font-bold text-zinc-900 sm:text-lg">{formatPokemonName(pokemon.name)}</h2>
        </div>

        <div className="flex max-w-[45%] flex-wrap justify-end gap-2">
          {pokemon.types.map((type) => {
            const styles = getTypeStyles(type);
            return (
              <span
                key={`${pokemon.name}-${type}`}
                className={`${styles.badge} rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white sm:px-3 sm:text-xs`}
              >
                {type}
              </span>
            );
          })}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className={`group relative overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br ${cardStyle.card} p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}
      aria-label={`Ver detalle de ${pokemon.name}`}
    >
      {glitterOverlay}
      <div className="relative z-10 flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-500">#{String(pokemon.id).padStart(3, '0')}</p>
        {favoriteButton}
      </div>
      <div className="relative z-10 mx-auto mt-3 h-36 w-36">
        <Image
          src={pokemon.image}
          alt={`Artwork oficial de ${pokemon.name}`}
          fill
          sizes="(max-width: 768px) 40vw, 20vw"
          className="object-contain drop-shadow-md transition group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <h2 className="relative z-10 mt-2 text-lg font-bold text-zinc-900">{formatPokemonName(pokemon.name)}</h2>
      <div className="relative z-10 mt-3 flex flex-wrap gap-2">
        {pokemon.types.map((type) => {
          const styles = getTypeStyles(type);
          return (
            <span
              key={`${pokemon.name}-${type}`}
              className={`${styles.badge} rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white`}
            >
              {type}
            </span>
          );
        })}
      </div>
    </Link>
  );
}
