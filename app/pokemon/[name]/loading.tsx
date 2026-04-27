/**
 * Skeleton loader para la página de detalle.
 */
export default function PokemonDetailLoading() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <div className="h-4 w-16 animate-pulse rounded bg-zinc-200" />
            <div className="h-8 w-36 animate-pulse rounded bg-zinc-200" />
            <div className="mx-auto h-72 w-72 animate-pulse rounded-full bg-zinc-200" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-zinc-200" />
                <div className="h-2 w-full animate-pulse rounded bg-zinc-200" />
              </div>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
