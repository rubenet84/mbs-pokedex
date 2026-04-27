export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import PokemonCryButton from '@/components/PokemonCryButton';
import PokemonStatBar from '@/components/PokemonStatBar';
import {
  formatHeight,
  formatPokemonName,
  formatWeight,
  getPokemonDetail,
  getPokemonEvolutionChain,
  getPokemonArtwork,
  typeThemeClassMap,
} from '@/lib/pokeapi';

interface PokemonDetailPageProps {
  params: Promise<{ name: string }>;
}

/**
 * Página de detalle de un Pokémon con stats, habilidades, evoluciones y audio.
 */
export default async function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const { name } = await params;

  const pokemon = await getPokemonDetail(name).catch(() => null);

  if (!pokemon) {
    notFound();
  }

  const evolutionChain = await getPokemonEvolutionChain(pokemon.name).catch(() => []);
  const mainType = pokemon.types[0]?.type.name ?? 'normal';
  const theme = typeThemeClassMap[mainType] ?? 'from-zinc-300 to-zinc-100';

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <div className={`h-28 bg-gradient-to-r ${theme}`} />
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 md:p-8">
          <section>
            <p className="text-sm font-semibold text-zinc-500">#{String(pokemon.id).padStart(3, '0')}</p>
            <h1 className="mt-1 text-3xl font-extrabold text-zinc-900">{formatPokemonName(pokemon.name)}</h1>
            <div className="mt-3">
              <PokemonCryButton pokemonId={pokemon.id} />
            </div>
            <div className="relative mx-auto mt-4 h-72 w-72 md:h-80 md:w-80">
              <Image
                src={getPokemonArtwork(pokemon)}
                alt={`Imagen oficial de ${pokemon.name}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 80vw, 40vw"
                loading="lazy"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-zinc-50 p-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">Altura</p>
                <p className="text-lg font-semibold text-zinc-900">{formatHeight(pokemon.height)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">Peso</p>
                <p className="text-lg font-semibold text-zinc-900">{formatWeight(pokemon.weight)}</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-900">Estadísticas base</h2>
              <div className="mt-3 space-y-3">
                {pokemon.stats.map((stat) => (
                  <PokemonStatBar
                    key={stat.stat.name}
                    label={formatPokemonName(stat.stat.name)}
                    value={stat.base_stat}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-zinc-900">Habilidades</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {pokemon.abilities.map(({ ability, is_hidden }) => (
                  <li
                    key={ability.name}
                    className="rounded-full bg-zinc-900 px-3 py-1 text-sm font-medium text-white"
                  >
                    {formatPokemonName(ability.name)}
                    {is_hidden ? ' (Oculta)' : ''}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-zinc-900">Cadena de evolución</h2>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {evolutionChain.length === 0 ? (
                  <p className="text-sm text-zinc-500">Sin cadena de evolución disponible.</p>
                ) : (
                  evolutionChain.map((evolutionName, index) => (
                    <div key={evolutionName} className="flex items-center gap-2">
                      <Link
                        href={`/pokemon/${evolutionName}`}
                        className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${
                          evolutionName === pokemon.name
                            ? 'border-zinc-900 bg-zinc-900 text-white'
                            : 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50'
                        }`}
                      >
                        {formatPokemonName(evolutionName)}
                      </Link>
                      {index < evolutionChain.length - 1 ? <span className="text-zinc-400">→</span> : null}
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
