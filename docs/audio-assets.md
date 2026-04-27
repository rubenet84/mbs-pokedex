# Audio Assets (v1.3.0)

## Fuente de sonidos

Los gritos de Pokémon se reproducen desde el repositorio oficial público indicado:

- `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/[id].ogg`

## Implementación

El componente cliente `PokemonCryButton` crea un `Audio` con el `id` del Pokémon en la página de detalle y ejecuta `play()` bajo interacción de usuario.

Ejemplo de URL resultante:

- Pokémon #25: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/25.ogg`
