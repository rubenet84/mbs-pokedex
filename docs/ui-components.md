# UI Components

## ViewToggler

`ViewToggler` es un Client Component que controla el estado visual de la Home entre dos variantes:

- `card`: renderiza la grilla responsive tradicional.
- `list`: renderiza filas horizontales optimizadas para lectura rápida.

### Comportamiento

- Usa estado local (`useState`) para almacenar el modo activo.
- Dispara `onViewChange(viewType)` al padre para sincronizar la vista del listado.
- Incluye botones accesibles con `aria-pressed` y `role="group"`.
- Utiliza iconos `LayoutGrid` y `List` de `lucide-react` para representar cada modo.

## SearchBar

`SearchBar` es un Client Component reutilizable para capturar el texto de búsqueda de Pokémon.

### Props

- `value`: string controlado desde el componente padre.
- `onChange(value)`: callback para actualizar el estado del input.

### Comportamiento

- Renderiza un input estilizado con icono `Search`.
- Dispara `onChange` en cada pulsación para habilitar filtrado en tiempo real.
- Muestra un botón de limpiar (`X`) solo cuando existe texto.

## PokemonCollection

`PokemonCollection` encapsula la interactividad en cliente para no convertir `app/page.tsx` en Client Component.

### Flujo

1. Recibe `pokemons` desde el Server Component (`app/page.tsx`).
2. Mantiene `viewType` en estado local.
3. Mantiene `searchTerm` como estado controlado para el input.
4. Usa `useDeferredValue(searchTerm)` para no bloquear la UI durante el tipeo si la colección crece.
5. Usa `useMemo` con la función `filterPokemonsByName` para evitar recálculos innecesarios.
6. Renderiza `SearchBar` y `ViewToggler`.
7. Muestra estado vacío cuando no hay coincidencias.
8. Cambia dinámicamente el contenedor:
   - `grid ...` en modo `card`.
   - `flex flex-col ...` en modo `list`.

## PokemonCard (card/list)

`PokemonCard` ahora soporta dos presentaciones con una sola API.

### Props

- `pokemon`: datos base del Pokémon.
- `viewType?`: `'card' | 'list'` (default: `'card'`).

### Estructura en modo lista

- **Izquierda:** miniatura optimizada (`next/image`).
- **Centro:** ID con padding y nombre formateado.
- **Derecha:** badges de tipos con `flex-wrap` y prioridad de legibilidad móvil/desktop.

Esta estrategia evita duplicar componentes y mantiene la consistencia de estilos por tipo.
