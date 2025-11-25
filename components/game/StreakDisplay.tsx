'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getStreakBadge } from '@/lib/game/playerStats';

interface StreakDisplayProps {
  streak: number;
  bestStreak: number;
}

export default function StreakDisplay({ streak, bestStreak }: StreakDisplayProps) {
  const badge = getStreakBadge(streak);
  const showBadge = badge !== null;

  if (streak === 0) return null;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Streak Counter */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-md rounded-full border border-orange-400/30"
      >
        <span className="text-2xl">🔥</span>
        <div className="flex flex-col">
          <span className="text-xs text-gray-300">Win Streak</span>
          <motion.span
            key={streak}
            initial={{ scale: 1.5, color: '#FB923C' }}
            animate={{ scale: 1, color: '#FFFFFF' }}
            className="text-lg font-bold"
          >
            {streak}
          </motion.span>
        </div>
      </motion.div>

      {/* Streak Badge */}
      <AnimatePresence>
        {showBadge && badge && (
          <motion.div
            initial={{ scale: 0, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0, y: -20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="px-4 py-2 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-md rounded-xl border-2 border-yellow-400/50 shadow-[0_0_30px_rgba(250,204,21,0.4)]"
          >
            <div className="flex items-center gap-2">
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="text-2xl"
              >
                {badge.emoji}
              </motion.span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-yellow-300">{badge.title}</span>
                <span className="text-xs text-yellow-200/80">{badge.description}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Best Streak Indicator */}
      {bestStreak > streak && bestStreak >= 3 && (
        <div className="text-xs text-gray-400">
          Best: <span className="text-cyan-400 font-semibold">{bestStreak}</span>
        </div>
      )}
    </div>
  );
}
