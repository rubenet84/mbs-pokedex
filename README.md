# Pokédex con Next.js

Aplicación profesional de Pokédex construida con **Next.js (App Router)**, **TypeScript estricto** y **Tailwind CSS**, consumiendo datos de **PokeAPI**.

## Requisitos

- Node.js 20+
- npm 10+

## Inicio rápido

Instala dependencias:

```bash
npm install
```

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts disponibles

- `npm run dev`: inicia la app en modo desarrollo.
- `npm run build`: genera la build de producción.
- `npm run start`: levanta la build compilada.
- `npm run lint`: ejecuta ESLint.

## Estructura del proyecto

- `app/`: rutas y páginas (App Router).
- `components/`: componentes de UI reutilizables.
- `lib/`: capa de datos y utilidades.
- `types/`: tipos e interfaces de dominio.
- `docs/`: documentación técnica.

## Funcionalidades destacadas

- Carga inicial de los primeros 300 Pokémon.
- Búsqueda en tiempo real y filtros por tipo.
- Sistema de favoritos persistente con `localStorage`.
- Comparador de Base Stats entre dos Pokémon.
- Infinite scroll con `IntersectionObserver`.
- Página de detalle con tema dinámico por tipo, cadena evolutiva y audio del grito.

## Documentación técnica

Consulta la carpeta `docs/`:

- `development-guide.md`
- `ui-components.md`
- `features.md`
- `performance.md`
- `audio-assets.md`
