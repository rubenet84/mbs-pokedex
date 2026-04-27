export const dynamic = 'force-dynamic';

import PokemonCollection from '@/components/PokemonCollection';
import { INITIAL_POKEMON_LIMIT, getPokemonList } from '@/lib/pokeapi';

/**
 * Home de la Pokedex con filtros avanzados y scroll infinito.
 */
export default async function HomePage() {
  const pokemons = await getPokemonList(INITIAL_POKEMON_LIMIT, 0);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">Pokedex</h1>
        <p className="mt-2 text-sm text-zinc-600 sm:text-base">
          Explora los primeros 300 Pokémon con favoritos, comparación de stats, filtros por tipo e infinite scroll.
        </p>
      </header>

      <PokemonCollection pokemons={pokemons} />
    </main>
  );
}
