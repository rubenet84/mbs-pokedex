# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-04-27
### Added
- Sistema de favoritos con persistencia en `localStorage` desde la lista principal.
- Filtro de vista "Mis Favoritos" combinado con búsqueda y filtros por tipo.
- Barra de filtros por tipo generada dinámicamente.
- Comparador de dos Pokémon para visualizar sus Base Stats lado a lado.
- Infinite Scroll con `IntersectionObserver` para cargar tarjetas progresivamente.
- Efecto holográfico/glitter en tarjetas de Pokémon legendarios y míticos.
- Cadena de evolución navegable en la página de detalle.
- Botón para reproducir el grito real de cada Pokémon en detalle.
- Nuevo set de documentación técnica: `docs/features.md`, `docs/performance.md` y `docs/audio-assets.md`.

### Changed
- Se amplió la carga inicial de la Pokedex a los primeros 300 Pokémon.
- Se aplicó `loading="lazy"` a las imágenes de Pokémon para mejorar rendimiento percibido.
- La página de detalle ahora aplica theming dinámico según el tipo principal del Pokémon.
- Se añadió modo oscuro estilo "Pokéball" en la colección principal.
- Se incrementó la versión del proyecto a `1.3.0`.

## [1.2.0] - 2026-04-27
### Added
- Buscador de Pokémon en tiempo real.
- Componente SearchBar.

## [1.1.0] - 2026-04-27
### Added
- Funcionalidad de cambio de vista (Grid/List).
- Componente ViewToggler.

## [1.0.0] - 2026-04-27
### Added
- Initial Pokedex implementation with Next.js App Router and TypeScript strict typing.
- Typed domain models in `types/pokemon.ts` based on the PokeAPI schema.
- Centralized PokeAPI data layer in `lib/pokeapi.ts` with list/detail functions and format helpers.
- Responsive home page with Pokémon grid and reusable `PokemonCard` component.
- Dynamic type-to-color mapping for cards and badges using Tailwind utility classes.
- Detailed Pokémon page with dimensions, abilities, and base stat bars.
- Professional loading states (`app/loading.tsx`, `app/pokemon/[name]/loading.tsx`) and route error boundaries (`app/error.tsx`, `app/pokemon/[name]/error.tsx`).
- Project documentation in `docs/development-guide.md`.
