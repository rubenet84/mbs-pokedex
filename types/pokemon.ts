/**
 * Recurso con nombre reutilizado por múltiples endpoints de PokeAPI.
 */
export interface NamedAPIResource {
  name: string;
  url: string;
}

/**
 * Respuesta de lista paginada para recursos con nombre.
 */
export interface NamedAPIResourceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

/**
 * Item de tipo de un Pokémon con su orden y tipo asociado.
 */
export interface PokemonTypeSlot {
  slot: number;
  type: NamedAPIResource;
}

/**
 * Item de habilidad de un Pokémon.
 */
export interface PokemonAbilitySlot {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

/**
 * Item de estadística base de un Pokémon.
 */
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

/**
 * Subconjunto tipado de sprites usados por la aplicación.
 */
export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
}

/**
 * Entidad principal de Pokémon basada en el contrato de PokeAPI.
 */
export interface Pokemon {
  id: number;
  name: string;
  base_experience: number | null;
  height: number | null;
  is_default: boolean;
  order: number | null;
  weight: number | null;
  abilities: PokemonAbilitySlot[];
  forms: NamedAPIResource[];
  species: NamedAPIResource;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonTypeSlot[];
}

/**
 * Modelo derivado para renderizar tarjetas en la grilla principal.
 */
export interface PokemonListItem {
  id: number;
  name: string;
  image: string;
  types: string[];
}
