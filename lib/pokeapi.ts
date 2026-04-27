import {
  type EvolutionChain,
  type NamedAPIResourceList,
  type Pokemon,
  type PokemonListItem,
  type PokemonSpecies,
} from '@/types/pokemon';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const DEFAULT_REVALIDATE_SECONDS = 60 * 60;
export const INITIAL_POKEMON_LIMIT = 300;

/**
 * IDs considerados legendarios/míticos para aplicar efectos especiales de UI.
 */
const LEGENDARY_OR_MYTHICAL_IDS = new Set<number>([
  144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 251,
]);

/**
 * Normaliza el nombre para mostrarlo con inicial en mayúscula.
 */
export function formatPokemonName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1).replaceAll('-', ' ');
}

/**
 * Obtiene la URL de artwork oficial y usa fallback si no existe.
 */
export function getPokemonArtwork(pokemon: Pick<Pokemon, 'id' | 'sprites'>): string {
  return (
    pokemon.sprites.other?.['official-artwork']?.front_default ??
    pokemon.sprites.front_default ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
  );
}

/**
 * Determina si un Pokémon es legendario/mítico según su id.
 */
export function isLegendaryPokemon(id: number): boolean {
  return LEGENDARY_OR_MYTHICAL_IDS.has(id);
}

/**
 * Obtiene el detalle de un Pokémon por nombre.
 */
export async function getPokemonDetail(name: string): Promise<Pokemon> {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${name.toLowerCase()}`, {
    next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`No se pudo obtener el detalle para ${name}.`);
  }

  const data: Pokemon = await response.json();
  return data;
}

/**
 * Obtiene metadata de especie de un Pokémon.
 */
export async function getPokemonSpecies(name: string): Promise<PokemonSpecies> {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon-species/${name.toLowerCase()}`, {
    next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`No se pudo obtener la especie para ${name}.`);
  }

  return response.json() as Promise<PokemonSpecies>;
}

/**
 * Obtiene una cadena de evolución.
 */
export async function getEvolutionChainByUrl(url: string): Promise<EvolutionChain> {
  const response = await fetch(url, {
    next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error('No se pudo obtener la cadena de evolución.');
  }

  return response.json() as Promise<EvolutionChain>;
}

/**
 * Obtiene la cadena de evolución a partir del nombre de un Pokémon.
 */
export async function getPokemonEvolutionChain(name: string): Promise<string[]> {
  const species = await getPokemonSpecies(name);
  const evolutionChain = await getEvolutionChainByUrl(species.evolution_chain.url);

  const result: string[] = [];
  let current: EvolutionChain['chain'] | undefined = evolutionChain.chain;

  while (current) {
    result.push(current.species.name);
    current = current.evolves_to[0];
  }

  return result;
}

/**
 * Obtiene una lista de Pokémon y enriquece cada item con imagen y tipos.
 */
export async function getPokemonList(
  limit = INITIAL_POKEMON_LIMIT,
  offset = 0,
): Promise<PokemonListItem[]> {
  const response = await fetch(
    `${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    {
      next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
    },
  );

  if (!response.ok) {
    throw new Error('No se pudo obtener la lista de Pokémon.');
  }

  const listData: NamedAPIResourceList = await response.json();

  const detailResults = await Promise.all(
    listData.results.map(async ({ name }) => getPokemonDetail(name)),
  );

  return detailResults.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    image: getPokemonArtwork(pokemon),
    types: pokemon.types.map((entry) => entry.type.name),
  }));
}

/**
 * Convierte decímetros a metros con 1 decimal.
 */
export function formatHeight(heightInDecimeters: number | null): string {
  if (heightInDecimeters === null) return 'N/A';
  return `${(heightInDecimeters / 10).toFixed(1)} m`;
}

/**
 * Convierte hectogramos a kilogramos con 1 decimal.
 */
export function formatWeight(weightInHectograms: number | null): string {
  if (weightInHectograms === null) return 'N/A';
  return `${(weightInHectograms / 10).toFixed(1)} kg`;
}

/**
 * Mapa de color principal por tipo para theming dinámico.
 */
export const typeThemeClassMap: Record<string, string> = {
  normal: 'from-zinc-200 to-zinc-50',
  fire: 'from-red-500 to-rose-300',
  water: 'from-blue-500 to-cyan-300',
  electric: 'from-yellow-400 to-amber-300',
  grass: 'from-green-500 to-emerald-300',
  ice: 'from-cyan-400 to-sky-300',
  fighting: 'from-orange-600 to-red-300',
  poison: 'from-purple-600 to-fuchsia-300',
  ground: 'from-amber-600 to-orange-300',
  flying: 'from-indigo-500 to-violet-300',
  psychic: 'from-pink-500 to-rose-300',
  bug: 'from-lime-500 to-green-300',
  rock: 'from-stone-600 to-stone-300',
  ghost: 'from-violet-700 to-purple-300',
  dragon: 'from-indigo-700 to-blue-300',
  dark: 'from-gray-700 to-zinc-400',
  steel: 'from-slate-600 to-slate-300',
  fairy: 'from-fuchsia-500 to-pink-300',
};
