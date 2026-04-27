import {
  type NamedAPIResourceList,
  type Pokemon,
  type PokemonListItem,
} from '@/types/pokemon';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const DEFAULT_REVALIDATE_SECONDS = 60 * 60;

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
 * Obtiene una lista de Pokémon y enriquece cada item con imagen y tipos.
 */
export async function getPokemonList(
  limit = 24,
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
