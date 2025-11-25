'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X as XIcon, Circle, Sparkles } from 'lucide-react';

interface ScoreboardProps {
  scores: {
    X: number;
    O: number;
    draws: number;
  };
  onReset?: () => void;
}

export default function Scoreboard({ scores, onReset }: ScoreboardProps) {
  const [prevScores, setPrevScores] = useState(scores);
  const [celebrateX, setCelebrateX] = useState(false);
  const [celebrateO, setCelebrateO] = useState(false);
  const [celebrateDraw, setCelebrateDraw] = useState(false);

  // Detect score changes and trigger animations
  useEffect(() => {
    if (scores.X > prevScores.X) {
      setCelebrateX(true);
      setTimeout(() => setCelebrateX(false), 1000);
    }
    if (scores.O > prevScores.O) {
      setCelebrateO(true);
      setTimeout(() => setCelebrateO(false), 1000);
    }
    if (scores.draws > prevScores.draws) {
      setCelebrateDraw(true);
      setTimeout(() => setCelebrateDraw(false), 1000);
    }
    setPrevScores(scores);
  }, [scores]);

  const cardClassName = (celebrating: boolean) => `
    relative overflow-hidden rounded-2xl p-6 
    backdrop-blur-xl border-2 transition-all duration-500
    ${celebrating 
      ? 'bg-gradient-to-br from-yellow-500/30 via-orange-500/20 to-pink-500/30 border-yellow-400 shadow-[0_0_40px_rgba(250,204,21,0.6)]' 
      : 'bg-white/10 border-white/20 shadow-lg hover:bg-white/15'
    }
  `;

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="grid grid-cols-3 gap-4">
        {/* Player X Score */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className={cardClassName(celebrateX)}
        >
          {/* Sparkle effects on score increase */}
          <AnimatePresence>
            {celebrateX && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute top-2 right-2"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col items-center gap-2">
            <motion.div
              animate={celebrateX ? { 
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0]
              } : {}}
              transition={{ duration: 0.6 }}
            >
              <XIcon className="w-7 h-7 text-cyan-400" strokeWidth={3} />
            </motion.div>
            <span className="text-xs font-medium text-gray-300">Player X</span>
            <motion.span
              key={scores.X}
              initial={{ scale: 1.8, color: '#00D9FF' }}
              animate={{ scale: 1, color: '#FFFFFF' }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="text-4xl font-bold"
            >
              {scores.X}
            </motion.span>
            {celebrateX && (
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                className="text-xs text-yellow-400 font-semibold"
              >
                +1 Win!
              </motion.div>
            )}
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Draws */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className={cardClassName(celebrateDraw)}
        >
          <AnimatePresence>
            {celebrateDraw && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute top-2 right-2"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col items-center gap-2">
            <motion.div
              animate={celebrateDraw ? { 
                scale: [1, 1.3, 1],
                rotate: [0, 360]
              } : {}}
              transition={{ duration: 0.8 }}
            >
              <Trophy className="w-7 h-7 text-yellow-400" />
            </motion.div>
            <span className="text-xs font-medium text-gray-300">Draws</span>
            <motion.span
              key={scores.draws}
              initial={{ scale: 1.8, color: '#FCD34D' }}
              animate={{ scale: 1, color: '#FFFFFF' }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="text-4xl font-bold"
            >
              {scores.draws}
            </motion.span>
            {celebrateDraw && (
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                className="text-xs text-yellow-400 font-semibold"
              >
                Draw!
              </motion.div>
            )}
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Player O Score */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className={cardClassName(celebrateO)}
        >
          <AnimatePresence>
            {celebrateO && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute top-2 right-2"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col items-center gap-2">
            <motion.div
              animate={celebrateO ? { 
                scale: [1, 1.3, 1],
                rotate: [0, -10, 10, 0]
              } : {}}
              transition={{ duration: 0.6 }}
            >
              <Circle className="w-7 h-7 text-pink-400" strokeWidth={3} />
            </motion.div>
            <span className="text-xs font-medium text-gray-300">Player O</span>
            <motion.span
              key={scores.O}
              initial={{ scale: 1.8, color: '#F472B6' }}
              animate={{ scale: 1, color: '#FFFFFF' }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="text-4xl font-bold"
            >
              {scores.O}
            </motion.span>
            {celebrateO && (
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                className="text-xs text-yellow-400 font-semibold"
              >
                +1 Win!
              </motion.div>
            )}
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* Total Games Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-center"
      >
        <div className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
          <span className="text-sm text-gray-400">
            Total Games: <span className="text-cyan-400 font-semibold">{scores.X + scores.O + scores.draws}</span>
          </span>
        </div>
      </motion.div>

      {/* Reset Button */}
      {onReset && (scores.X > 0 || scores.O > 0 || scores.draws > 0) && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="mt-4 w-full py-2.5 px-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-red-300 rounded-xl text-sm font-medium transition-all border border-red-500/30 backdrop-blur-sm shadow-lg hover:shadow-red-500/20"
        >
          🗑️ Reset All Scores
        </motion.button>
      )}
    </div>
  );
}
