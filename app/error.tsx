'use client';

/**
 * Límite de error global para rutas del App Router.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-bold text-zinc-900">Ocurrió un error inesperado</h2>
      <p className="text-zinc-600">{error.message}</p>
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
