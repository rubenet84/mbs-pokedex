# Features (v1.3.0)

## Sistema de Favoritos

Se agregó un sistema de favoritos persistente en cliente:

- Cada tarjeta (`PokemonCard`) muestra un botón de corazón.
- Al hacer toggle, se guarda/quita el `id` del Pokémon en `localStorage` con la clave `pokedex-favorites-v1`.
- En `PokemonCollection` existe un filtro dedicado **Mis Favoritos** para ver únicamente los Pokémon marcados.

## Filtros por Tipo

Se incorporó una barra de tipos que se construye dinámicamente desde la lista cargada (primeros 300 Pokémon).

- Incluye opción `Todos`.
- Permite combinar filtros por nombre + tipo + favoritos.

## Comparador de Base Stats

Se añadió un comparador funcional dentro de la home:

- Dos selectores (`Pokémon A` y `Pokémon B`).
- Carga de stats desde PokeAPI al seleccionar cada Pokémon.
- Tabla comparativa de estadística por estadística, resaltando el valor mayor.
