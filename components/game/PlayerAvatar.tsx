'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlayerAvatarProps {
  emotion: 'happy' | 'neutral' | 'thinking' | 'sad' | 'excited';
  player: 'X' | 'O';
}

const EMOTIONS = {
  happy: '😊',
  neutral: '😐',
  thinking: '🤔',
  sad: '😔',
  excited: '🤩',
};

const EMOTION_COLORS = {
  happy: 'from-green-500/20 to-emerald-500/20 border-green-400/30',
  neutral: 'from-gray-500/20 to-slate-500/20 border-gray-400/30',
  thinking: 'from-purple-500/20 to-indigo-500/20 border-purple-400/30',
  sad: 'from-blue-500/20 to-cyan-500/20 border-blue-400/30',
  excited: 'from-yellow-500/20 to-orange-500/20 border-yellow-400/30',
};

export default function PlayerAvatar({ emotion, player }: PlayerAvatarProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      className={`flex items-center gap-3 px-4 py-2 bg-gradient-to-r ${EMOTION_COLORS[emotion]} backdrop-blur-md rounded-full border`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={emotion}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-3xl"
        >
          {EMOTIONS[emotion]}
        </motion.span>
      </AnimatePresence>
      
      <div className="flex flex-col">
        <span className="text-xs text-gray-400">Player</span>
        <span className={`text-lg font-bold ${player === 'X' ? 'text-cyan-400' : 'text-pink-400'}`}>
          {player}
        </span>
      </div>
    </motion.div>
  );
}
