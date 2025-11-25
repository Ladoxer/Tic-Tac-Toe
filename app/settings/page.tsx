'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Volume2, VolumeX, ArrowLeft, Zap, Brain } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { useTheme } from '@/hooks/useTheme';
import { useGame } from '@/hooks/useGame';

export default function SettingsPage() {
  const router = useRouter();
  const { soundEnabled, toggleSound } = useSound();
  const { theme, setTheme } = useTheme();
  const { difficulty, setDifficulty } = useGame();

  const settingCardClass = `
    glass rounded-2xl p-6 border border-white/20
  `;

  const difficultyOptions = [
    { 
      value: 'easy' as const, 
      label: 'Easy', 
      icon: '😊', 
      color: 'green',
      description: 'Perfect for beginners'
    },
    { 
      value: 'medium' as const, 
      label: 'Medium', 
      icon: '🎯', 
      color: 'blue',
      description: 'Balanced challenge'
    },
    { 
      value: 'hard' as const, 
      label: 'Hard', 
      icon: '⚡', 
      color: 'orange',
      description: 'Tough but beatable'
    },
    { 
      value: 'impossible' as const, 
      label: 'Impossible', 
      icon: '🔥', 
      color: 'red',
      description: 'Unbeatable AI'
    },
  ];

  const getDifficultyColor = (value: string) => {
    switch (value) {
      case 'easy': return 'green';
      case 'medium': return 'blue';
      case 'hard': return 'orange';
      case 'impossible': return 'red';
      default: return 'cyan';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">Settings</h1>
          <p className="text-gray-300">Customize your game experience</p>
        </motion.div>

        <div className="space-y-6">
          {/* AI Difficulty */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={settingCardClass}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-cyan-400" />
              AI Difficulty
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {difficultyOptions.map((option) => {
                const isSelected = difficulty === option.value;
                const color = getDifficultyColor(option.value);
                
                return (
                  <button
                    key={option.value}
                    onClick={() => setDifficulty(option.value)}
                    className={`
                      py-3 px-4 rounded-lg font-medium transition-all
                      ${isSelected
                        ? `bg-${color}-500/30 border-2 border-${color}-400 text-${color}-400 shadow-[0_0_20px_rgba(${color === 'green' ? '34,197,94' : color === 'blue' ? '59,130,246' : color === 'orange' ? '249,115,22' : '239,68,68'},0.3)]`
                        : 'bg-white/5 border border-white/20 hover:bg-white/10'
                      }
                    `}
                    style={{
                      backgroundColor: isSelected ? `rgba(${color === 'green' ? '34,197,94' : color === 'blue' ? '59,130,246' : color === 'orange' ? '249,115,22' : '239,68,68'}, 0.2)` : undefined,
                      borderColor: isSelected ? (color === 'green' ? '#22C55E' : color === 'blue' ? '#3B82F6' : color === 'orange' ? '#F97316' : '#EF4444') : undefined,
                      color: isSelected ? (color === 'green' ? '#22C55E' : color === 'blue' ? '#3B82F6' : color === 'orange' ? '#F97316' : '#EF4444') : undefined,
                      boxShadow: isSelected ? `0 0 20px rgba(${color === 'green' ? '34,197,94' : color === 'blue' ? '59,130,246' : color === 'orange' ? '249,115,22' : '239,68,68'}, 0.3)` : undefined,
                    }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl">{option.icon}</span>
                      <span>{option.label}</span>
                    </div>
                    <p className="text-xs mt-1 opacity-70">{option.description}</p>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Sound Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={settingCardClass}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
                  {soundEnabled ? (
                    <Volume2 className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-gray-400" />
                  )}
                  Sound Effects
                </h2>
                <p className="text-sm text-gray-400">Play sounds during gameplay</p>
              </div>
              <button
                onClick={toggleSound}
                className={`
                  relative w-16 h-8 rounded-full transition-colors
                  ${soundEnabled ? 'bg-cyan-500' : 'bg-gray-600'}
                `}
              >
                <motion.div
                  animate={{ x: soundEnabled ? 32 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg"
                />
              </button>
            </div>
          </motion.div>

          {/* Theme Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={settingCardClass}
          >
            <h2 className="text-xl font-semibold mb-4">Theme</h2>
            <div className="grid grid-cols-3 gap-3">
              {(['light', 'dark', 'system'] as const).map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => setTheme(themeOption)}
                  className={`
                    py-2 px-4 rounded-lg font-medium capitalize transition-all
                    ${theme === themeOption
                      ? 'bg-cyan-500/30 border-2 border-cyan-400 text-cyan-400'
                      : 'bg-white/5 border border-white/20 hover:bg-white/10'
                    }
                  `}
                >
                  {themeOption}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/')}
            className="w-full py-3 px-6 bg-white/10 hover:bg-white/20 rounded-lg font-medium flex items-center justify-center gap-2 transition-all border border-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </motion.button>
        </div>
      </div>
    </div>
  );
}
