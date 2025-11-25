'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Loader2 } from 'lucide-react';

export default function AIThinkingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="flex items-center gap-3 justify-center py-3 px-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl border border-purple-400/30 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
    >
      {/* Animated Brain Icon */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Brain className="w-6 h-6 text-purple-400" />
      </motion.div>

      {/* Text */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-purple-300">AI is thinking</span>
        
        {/* Animated dots */}
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.3, 1, 0.3],
                y: [0, -4, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-1.5 h-1.5 bg-purple-400 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Spinning loader */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Loader2 className="w-5 h-5 text-blue-400" />
      </motion.div>
    </motion.div>
  );
}
