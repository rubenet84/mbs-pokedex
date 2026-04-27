'use client';

import { useRef } from 'react';

import { Volume2 } from '@/components/lucide-react';

interface PokemonCryButtonProps {
  pokemonId: number;
}

export default function PokemonCryButton({ pokemonId }: PokemonCryButtonProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function playCry() {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonId}.ogg`,
      );
    }

    void audioRef.current.play();
  }

  return (
    <button
      type="button"
      onClick={playCry}
      className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
    >
      <Volume2 size={16} />
      Reproducir grito
    </button>
  );
}
