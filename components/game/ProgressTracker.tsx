'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award } from 'lucide-react';
import { calculateWinRate } from '@/lib/game/playerStats';

interface ProgressTrackerProps {
  scores: {
    X: number;
    O: number;
    draws: number;
  };
  gameMode: 'pvp' | 'pvai';
}

export default function ProgressTracker({ scores, gameMode }: ProgressTrackerProps) {
  const totalGames = scores.X + scores.O + scores.draws;
  const wins = gameMode === 'pvai' ? scores.X : scores.X + scores.O;
  const winRate = calculateWinRate(wins, totalGames);

  if (totalGames === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto mt-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
    >
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-4 h-4 text-cyan-400" />
        <span className="text-sm font-semibold text-gray-300">Your Progress</span>
      </div>

      {/* Win Rate Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Win Rate</span>
          <span className="font-semibold text-cyan-400">{winRate}%</span>
        </div>
        
        <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${winRate}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
          />
          
          {/* Glow effect */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${winRate}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 bg-cyan-400/30 blur-sm rounded-full"
          />
        </div>

        {/* Motivational message based on win rate */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 text-xs"
        >
          <Award className="w-3 h-3 text-yellow-400" />
          <span className="text-gray-300">
            {winRate >= 75 && "You're crushing it! 🎯"}
            {winRate >= 50 && winRate < 75 && "You're improving! Keep going! 📈"}
            {winRate >= 25 && winRate < 50 && "Getting better! Practice makes perfect! 💪"}
            {winRate < 25 && totalGames < 5 && "Just warming up! 🔥"}
            {winRate < 25 && totalGames >= 5 && "Don't give up! Every game is practice! 🌟"}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
