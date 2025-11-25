'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * GameBoard Component
 * 
 * A 3x3 Tic Tac Toe board with advanced animations and micro-interactions
 * Features:
 * - Framer Motion scale and bounce animations for X/O placement
 * - Neon cyan glow and pulse effect for winning combinations
 * - Hover micro-animations for interactive cells
 * - Sound effects on cell click
 * - Glassmorphism visual style
 */

type Player = 'X' | 'O' | null;

interface GameBoardProps {
  /** Array of 9 cells representing the board state (null = empty, 'X' or 'O' = played) */
  board: Player[];
  /** Callback when a cell is clicked, receives the cell index (0-8) */
  onCellClick: (index: number) => void;
  /** Optional: Array of winning cell indices to highlight (e.g., [0, 1, 2] for top row) */
  winningCombination?: number[];
  /** Optional: Disable all cell clicks (e.g., during AI turn or game over) */
  disabled?: boolean;
  /** Optional: Current player for visual feedback */
  currentPlayer?: Player;
}

export default function GameBoard({
  board,
  onCellClick,
  winningCombination = [],
  disabled = false,
  currentPlayer = 'X',
}: GameBoardProps) {
  /**
   * Play sound effect on cell click
   * Uses Web Audio API for instant playback
   */
  const playClickSound = () => {
    // Create a short pleasant click sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Bright, short click sound
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  /**
   * Handle cell click with sound effect
   */
  const handleCellClick = (index: number) => {
    if (disabled || board[index] !== null) return;
    
    playClickSound();
    onCellClick(index);
  };

  /**
   * Check if a cell is part of the winning combination
   */
  const isWinningCell = (index: number): boolean => {
    return winningCombination.includes(index);
  };

  /**
   * Render X or O with animation
   */
  const renderCellContent = (value: Player, index: number) => {
    if (!value) return null;

    const isWinner = isWinningCell(index);

    return (
      <motion.div
        key={`${index}-${value}`}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: 1, 
          rotate: 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          duration: 0.6,
        }}
        className={`
          text-6xl md:text-7xl font-bold select-none
          ${value === 'X' ? 'text-cyan-400' : 'text-pink-400'}
          ${isWinner ? 'animate-pulse' : ''}
        `}
      >
        {value}
      </motion.div>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-3 md:gap-4 p-4 max-w-md mx-auto">
      {board.map((cell, index) => {
        const isWinner = isWinningCell(index);
        const isEmpty = cell === null;
        const isClickable = !disabled && isEmpty;

        return (
          <motion.button
            key={index}
            onClick={() => handleCellClick(index)}
            disabled={!isClickable}
            whileHover={isClickable ? { scale: 1.05 } : {}}
            whileTap={isClickable ? { scale: 0.95 } : {}}
            className={`
              relative aspect-square rounded-2xl
              flex items-center justify-center
              transition-all duration-300
              ${
                isWinner
                  ? 'bg-cyan-500/20 shadow-[0_0_30px_rgba(0,217,255,0.6)] ring-2 ring-cyan-400'
                  : 'bg-white/10 backdrop-blur-md'
              }
              ${
                isClickable
                  ? 'hover:bg-white/20 hover:shadow-[0_0_20px_rgba(0,217,255,0.3)] cursor-pointer'
                  : 'cursor-not-allowed'
              }
              border border-white/20
              shadow-lg
            `}
          >
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            
            {/* Cell content (X or O) */}
            <div className="relative z-10">
              {renderCellContent(cell, index)}
            </div>

            {/* Winning cell pulsing glow effect */}
            {isWinner && (
              <motion.div
                className="absolute inset-0 rounded-2xl bg-cyan-400/20"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}

            {/* Hover indicator for empty cells */}
            {isEmpty && isClickable && (
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity"
                style={{
                  background: 'radial-gradient(circle, rgba(0,217,255,0.1) 0%, transparent 70%)',
                }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
