'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useGame } from '@/hooks/useGame';
import GameBoard from '@/components/game/GameBoard';
import Scoreboard from '@/components/game/Scoreboard';
import GameControls from '@/components/game/GameControls';
import ConfettiEffect from '@/components/game/ConfettiEffect';
import LottieVictory from '@/components/animations/LottieVictory';
import AIThinkingIndicator from '@/components/game/AIThinkingIndicator';
import StreakDisplay from '@/components/game/StreakDisplay';
import ProgressTracker from '@/components/game/ProgressTracker';
import PlayerAvatar from '@/components/game/PlayerAvatar';
import { soundManager } from '@/lib/sound/soundManager';

// Enhanced motivational messages with psychology
const MOTIVATIONAL_MESSAGES = {
  move: [
    'Nice move!', 
    'Strategic thinking!', 
    "You're getting smarter!", 
    'Brilliant!', 
    'Keep it up!', 
    'Excellent!',
    'Great strategy! 🎯',
    'Smart play! 🧠',
    "You're on fire! 🔥",
    'Impressive! 💪',
    'Well played! 👏',
    'Genius move! ⚡',
    'Outstanding! 🌟',
    'Perfect! ✨',
    'You got this! 💯',
    'Incredible! 🎮',
    'Keep pushing! 🚀',
    'Amazing! 🎨',
    'Fantastic! 🎉',
    'Superb! 🏆',
  ],
  win: ['Victory!', 'Outstanding!', 'You won!', 'Excellent game!', 'Champion! 👑', 'Incredible win! 🎉'],
  draw: ["It's a tie!", 'Well played!', 'Evenly matched!', 'Great game!', 'Close match! 🤝'],
  aiThinking: ['AI is thinking...', 'Calculating move...', 'Analyzing...', 'Processing strategy...'],
};

export default function GamePage() {
  const searchParams = useSearchParams();
  const mode = (searchParams?.get('mode') || 'pvp') as 'pvp' | 'pvai';

  const {
    board,
    currentPlayer,
    gameMode,
    status,
    winner,
    winningCombination,
    history,
    scores,
    difficulty,
    currentStreak,
    bestStreak,
    makePlayerMove,
    setGameMode,
    resetGame,
    undoMove,
    resetScores,
  } = useGame();

  const [message, setMessage] = useState('');
  const [showVictory, setShowVictory] = useState(false);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [avatarEmotion, setAvatarEmotion] = useState<'happy' | 'neutral' | 'thinking' | 'sad' | 'excited'>('neutral');

  // Set game mode on mount
  useEffect(() => {
    if (mode !== gameMode) {
      setGameMode(mode);
    }
  }, [mode]);

  // Update motivational message and avatar emotion
  useEffect(() => {
    if (status === 'won' && winner) {
      const winMessages = MOTIVATIONAL_MESSAGES.win;
      setMessage(winMessages[Math.floor(Math.random() * winMessages.length)]);
      setShowVictory(true);
      
      // Avatar emotions based on winner
      if (gameMode === 'pvai') {
        setAvatarEmotion(winner === 'X' ? 'excited' : 'sad');
      } else {
        setAvatarEmotion('happy');
      }
    } else if (status === 'draw') {
      const drawMessages = MOTIVATIONAL_MESSAGES.draw;
      setMessage(drawMessages[Math.floor(Math.random() * drawMessages.length)]);
      setAvatarEmotion('neutral');
    } else if (gameMode === 'pvai' && currentPlayer === 'O') {
      // AI's turn (AI is always O)
      const thinkingMessages = MOTIVATIONAL_MESSAGES.aiThinking;
      setMessage(thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)]);
      setIsAIThinking(true);
      setAvatarEmotion('thinking');
    } else if (gameMode === 'pvai' && currentPlayer === 'X') {
      // Human's turn (Human is always X in PvAI mode)
      if (currentStreak >= 3) {
        setMessage(`Your turn! 🔥 ${currentStreak} win streak!`);
        setAvatarEmotion('excited');
      } else {
        setMessage("Your turn! (You are X)");
        setAvatarEmotion('neutral');
      }
      setIsAIThinking(false);
    } else {
      setMessage(`Player ${currentPlayer}'s turn`);
      setIsAIThinking(false);
      setAvatarEmotion('neutral');
    }
  }, [status, winner, currentPlayer, gameMode, currentStreak]);

  const handleCellClick = (index: number) => {
    // In PvAI mode, only allow clicks when it's human's turn (X)
    if (gameMode === 'pvai' && currentPlayer === 'O') {
      return; // AI's turn, don't allow human clicks
    }
    
    if (isAIThinking) return;
    
    // Show motivational message on move
    if (status === 'playing' && board[index] === null) {
      const moveMessages = MOTIVATIONAL_MESSAGES.move;
      setTimeout(() => {
        if (status === 'playing') {
          setMessage(moveMessages[Math.floor(Math.random() * moveMessages.length)]);
        }
      }, 100);
    }

    soundManager.playClick();
    makePlayerMove(index);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-20">
      {/* Confetti Effect */}
      <ConfettiEffect trigger={status === 'won' && winner !== null} winner={winner || 'X'} />

      {/* Victory Modal */}
      <LottieVictory
        isOpen={showVictory}
        onClose={() => setShowVictory(false)}
        winner={winner || 'X'}
      />

      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
            {gameMode === 'pvp' ? 'Player vs Player' : 'Player vs AI'}
          </h1>
          {gameMode === 'pvai' && (
            <p className="text-sm text-gray-400">
              Difficulty: <span className="text-cyan-400 font-semibold capitalize">{difficulty}</span>
            </p>
          )}
        </motion.div>

        {/* Player Avatar (PvAI mode only) */}
        {gameMode === 'pvai' && (
          <div className="flex justify-center mb-4">
            <PlayerAvatar emotion={avatarEmotion} player="X" />
          </div>
        )}

        {/* Scoreboard */}
        <Scoreboard scores={scores} onReset={resetScores} />

        {/* Streak Display (PvAI mode only) */}
        {gameMode === 'pvai' && (
          <div className="flex justify-center mb-4">
            <StreakDisplay streak={currentStreak} bestStreak={bestStreak} />
          </div>
        )}

        {/* Status Message or AI Thinking Indicator */}
        <div className="text-center mb-4">
          <AnimatePresence mode="wait">
            {isAIThinking ? (
              <motion.div
                key="ai-thinking"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <AIThinkingIndicator />
              </motion.div>
            ) : (
              <motion.div
                key={message}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <p className="text-xl font-semibold text-cyan-400">
                  {message}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Game Board */}
        <GameBoard
          board={board}
          onCellClick={handleCellClick}
          winningCombination={winningCombination}
          disabled={status !== 'playing' || isAIThinking}
          currentPlayer={currentPlayer}
        />

        {/* Game Status */}
        {status !== 'playing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-6"
          >
            {status === 'won' && winner && (
              <p className="text-2xl font-bold">
                Player <span className={winner === 'X' ? 'text-cyan-400' : 'text-pink-400'}>{winner}</span> wins! 🎉
              </p>
            )}
            {status === 'draw' && (
              <p className="text-2xl font-bold text-yellow-400">
                It&apos;s a draw! 🤝
              </p>
            )}
          </motion.div>
        )}

        {/* Controls */}
        <GameControls
          onUndo={undoMove}
          onReset={resetGame}
          canUndo={history.length > 1 && status === 'playing'}
        />

        {/* Progress Tracker */}
        <ProgressTracker scores={scores} gameMode={gameMode} />
      </div>
    </div>
  );
}
