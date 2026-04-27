import Image from 'next/image';
import Link from 'next/link';

import { formatPokemonName } from '@/lib/pokeapi';
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

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

/**
 * Tarjeta de Pokémon para la grilla principal.
 */
export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const mainType = pokemon.types[0] ?? 'normal';
  const cardStyle = getTypeStyles(mainType);

  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className={`group rounded-2xl border border-zinc-200 bg-gradient-to-br ${cardStyle.card} p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}
      aria-label={`Ver detalle de ${pokemon.name}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-500">#{String(pokemon.id).padStart(3, '0')}</p>
      </div>
      <div className="relative mx-auto mt-3 h-36 w-36">
        <Image
          src={pokemon.image}
          alt={`Artwork oficial de ${pokemon.name}`}
          fill
          sizes="(max-width: 768px) 40vw, 20vw"
          className="object-contain drop-shadow-md transition group-hover:scale-105"
          priority={pokemon.id <= 8}
        />
      </div>
      <h2 className="mt-2 text-lg font-bold text-zinc-900">{formatPokemonName(pokemon.name)}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
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
