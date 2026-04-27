# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
