/**
 * Skeleton loader para la página principal mientras el server component carga datos.
 */
export default function HomeLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-3">
        <div className="h-10 w-40 animate-pulse rounded-lg bg-zinc-200" />
        <div className="h-5 w-72 animate-pulse rounded-lg bg-zinc-200" />
      </div>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <article key={index} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="h-4 w-14 animate-pulse rounded bg-zinc-200" />
            <div className="mx-auto mt-4 h-36 w-36 animate-pulse rounded-full bg-zinc-200" />
            <div className="mt-4 h-6 w-28 animate-pulse rounded bg-zinc-200" />
            <div className="mt-3 flex gap-2">
              <div className="h-6 w-16 animate-pulse rounded-full bg-zinc-200" />
              <div className="h-6 w-16 animate-pulse rounded-full bg-zinc-200" />
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
