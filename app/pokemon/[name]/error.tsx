'use client';

/**
 * Límite de error para la ruta de detalle de Pokémon.
 */
export default function PokemonDetailError({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-bold text-zinc-900">No se pudo cargar el detalle</h2>
      <p className="text-zinc-600">Intenta de nuevo en unos segundos.</p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-full bg-zinc-900 px-5 py-2 font-medium text-white transition hover:bg-zinc-700"
      >
        Reintentar
      </button>
    </main>
  );
}
