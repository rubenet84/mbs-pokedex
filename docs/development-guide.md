# Development Guide

## Arquitectura general

El proyecto sigue la estructura solicitada por `AGENTS.md`:

- `app/`: rutas y páginas del App Router.
- `components/`: componentes reutilizables de UI.
- `lib/`: capa de datos y utilidades de formato.
- `types/`: contratos TypeScript del dominio.
- `docs/`: documentación técnica.

### Flujo de datos

1. Las páginas Server Component (`app/page.tsx`, `app/pokemon/[name]/page.tsx`) piden información a `lib/pokeapi.ts`.
2. `lib/pokeapi.ts` centraliza `getPokemonList` y `getPokemonDetail`.
3. Los datos llegan ya tipados con interfaces de `types/pokemon.ts`.
4. Los componentes (`PokemonCard`, `PokemonStatBar`) solo renderizan UI.

## Colores dinámicos por tipo

La lógica de colores vive en `components/PokemonCard.tsx`:

- `typeColorMap` define colores de badge y gradiente de tarjeta para cada tipo.
- `getTypeStyles(type)` devuelve el estilo correspondiente o un fallback neutro.
- El tipo principal (`pokemon.types[0]`) define el fondo de la tarjeta.
- Todos los tipos del Pokémon se muestran como badges con color propio.

Este enfoque permite extender tipos o cambiar paletas desde un único punto.

## Mobile-first y responsive

La vista principal usa una grid mobile-first:

- Móvil: `grid-cols-1`
- Tablet: `md:grid-cols-3`
- Desktop: `xl:grid-cols-4`

Las tarjetas y pantallas de carga mantienen tamaños y espacios progresivos para evitar layout shift.

## Manejo de errores y carga

Se implementaron estados de UX robustos:

- `app/loading.tsx`: skeletons en el listado.
- `app/pokemon/[name]/loading.tsx`: skeletons en el detalle.
- `app/error.tsx`: error boundary global.
- `app/pokemon/[name]/error.tsx`: error boundary específico de la ruta de detalle.
