# Performance (v1.3.0)

## Carga Inicial Ampliada

La capa de datos en `lib/pokeapi.ts` ahora usa `INITIAL_POKEMON_LIMIT = 300` para preparar un dataset más amplio desde servidor.

## Lazy Loading de Imágenes

Todas las imágenes de Pokémon en:

- tarjetas de listado/grilla,
- vista detalle,

usan `loading="lazy"` para reducir trabajo inicial de red y render.

## Infinite Scroll con Intersection Observer

En `PokemonCollection`:

- Se renderiza un subconjunto inicial (`PAGE_SIZE = 36`).
- Un sentinel al final de la lista es observado con `IntersectionObserver`.
- Al entrar en viewport, aumenta automáticamente la cantidad visible hasta completar los resultados filtrados.

Este enfoque mejora UX al evitar paginación manual y mantiene el DOM controlado por bloques.
