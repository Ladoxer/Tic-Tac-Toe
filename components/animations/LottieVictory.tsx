'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { X } from 'lucide-react';

interface LottieVictoryProps {
  isOpen: boolean;
  onClose: () => void;
  winner: 'X' | 'O';
}

export default function LottieVictory({ isOpen, onClose, winner }: LottieVictoryProps) {
  // Simple trophy animation data (inline for demo - in production, load from file)
  const trophyAnimation = {
    v: '5.7.4',
    fr: 60,
    ip: 0,
    op: 120,
    w: 500,
    h: 500,
    nm: 'Trophy',
    ddd: 0,
    assets: [],
    layers: [],
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative bg-gradient-to-br from-cyan-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="flex flex-col items-center gap-4">
              {/* Trophy Icon (placeholder - you can add Lottie here) */}
              <div className="w-32 h-32 flex items-center justify-center text-8xl">
                🏆
              </div>

              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                Victory!
              </h2>

              <p className="text-xl text-gray-200">
                Player <span className={winner === 'X' ? 'text-cyan-400' : 'text-pink-400'}>{winner}</span> wins!
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold shadow-lg hover:shadow-cyan-500/50 transition-shadow"
              >
                Awesome!
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
