export const dynamic = 'force-dynamic';

import PokemonCollection from '@/components/PokemonCollection';
import { getPokemonList } from '@/lib/pokeapi';

/**
 * Home de la Pokedex con selector de vista y listado responsivo.
 */
export default async function HomePage() {
  const pokemons = await getPokemonList(24, 0);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">Pokedex</h1>
        <p className="mt-2 text-sm text-zinc-600 sm:text-base">
          Explora los primeros 24 Pokémon con sus tipos y acceso al detalle.
        </p>
      </header>

      <PokemonCollection pokemons={pokemons} />
    </main>
  );
}
