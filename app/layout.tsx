import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Pokedex Next.js',
  description: 'Pokedex profesional con Next.js App Router, TypeScript y Tailwind CSS.',
};

/**
 * Layout raíz de la aplicación.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full bg-zinc-50 font-sans text-zinc-900">{children}</body>
    </html>
  );
}
