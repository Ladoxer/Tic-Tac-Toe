'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Undo, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface GameControlsProps {
  onUndo?: () => void;
  onReset?: () => void;
  canUndo?: boolean;
}

export default function GameControls({ onUndo, onReset, canUndo = true }: GameControlsProps) {
  const router = useRouter();

  const buttonClass = `
    flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium
    bg-white/10 backdrop-blur-md border border-white/20
    hover:bg-white/20 hover:shadow-[0_0_20px_rgba(0,217,255,0.3)]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10
    transition-all duration-300
  `;

  return (
    <div className="flex flex-wrap gap-3 justify-center mt-6">
      {/* Undo Button */}
      {onUndo && (
        <motion.button
          whileHover={{ scale: canUndo ? 1.05 : 1 }}
          whileTap={{ scale: canUndo ? 0.95 : 1 }}
          onClick={onUndo}
          disabled={!canUndo}
          className={buttonClass}
          title="Undo last move"
        >
          <Undo className="w-4 h-4" />
          <span>Undo</span>
        </motion.button>
      )}

      {/* New Game Button */}
      {onReset && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className={buttonClass}
          title="Start a new game"
        >
          <RotateCcw className="w-4 h-4" />
          <span>New Game</span>
        </motion.button>
      )}

      {/* Home Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/')}
        className={buttonClass}
        title="Return to home"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </motion.button>
    </div>
  );
}
