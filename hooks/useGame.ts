/**
 * Game State Management Hook
 * 
 * Central hook for managing all game state using Zustand
 */

import { create } from 'zustand';
import { GameState, Player, GameMode, Difficulty, GameStatus } from '@/lib/game/gameTypes';
import {
  createEmptyBoard,
  checkWinner,
  isBoardFull,
  makeMove,
  getOpponent,
  isValidMove,
} from '@/lib/game/gameLogic';
import { getAIMove } from '@/lib/game/aiPlayer';
import { loadScores, saveScores, resetScores as resetStoredScores, loadSettings, saveSettings } from '@/lib/storage/localStorage';
import { soundManager } from '@/lib/sound/soundManager';

interface GameStore extends GameState {
  // Actions
  makePlayerMove: (position: number) => void;
  setGameMode: (mode: GameMode) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  resetGame: () => void;
  undoMove: () => void;
  resetScores: () => void;
}

export const useGame = create<GameStore>((set, get) => {
  // Load scores from localStorage
  const savedScores = loadScores();
  // Load difficulty from settings
  const savedSettings = loadSettings();

  return {
    // Initial state
    board: createEmptyBoard(),
    currentPlayer: 'X',
    gameMode: 'pvp',
    difficulty: savedSettings.difficulty, // Load from settings instead of hardcoding
    status: 'playing',
    winner: null,
    winningCombination: [],
    history: [createEmptyBoard()],
    scores: savedScores,
    currentStreak: 0,
    bestStreak: 0,

    // Make a move (human player)
    makePlayerMove: (position: number) => {
      const state = get();

      // Validation
      if (state.status !== 'playing') return;
      if (!isValidMove(state.board, position)) return;

      // Make the move
      const newBoard = makeMove(state.board, position, state.currentPlayer);
      const newHistory = [...state.history, newBoard];

      // Check for winner
      const winResult = checkWinner(newBoard);
      let newStatus: GameStatus = 'playing';
      let newWinner: Player = null;
      let newWinningCombination: number[] = [];
      let newScores = { ...state.scores };
      let newCurrentStreak = state.currentStreak;
      let newBestStreak = state.bestStreak;

      if (winResult) {
        newStatus = 'won' as GameStatus;
        newWinner = winResult.winner;
        newWinningCombination = winResult.combination;

        // Update scores
        if (newWinner === 'X') newScores.X++;
        else if (newWinner === 'O') newScores.O++;

        // Update streak (only for player X in PvAI mode)
        if (state.gameMode === 'pvai' && newWinner === 'X') {
          newCurrentStreak++;
          if (newCurrentStreak > newBestStreak) {
            newBestStreak = newCurrentStreak;
          }
          // Play streak sound if milestone reached (every 3 wins)
          if (newCurrentStreak >= 3 && newCurrentStreak % 3 === 0) {
            setTimeout(() => soundManager.playStreak(), 600);
          }
        } else if (state.gameMode === 'pvai' && newWinner === 'O') {
          // Reset streak if AI wins
          newCurrentStreak = 0;
        }

        saveScores(newScores);
        soundManager.playVictory();
      } else if (isBoardFull(newBoard)) {
        newStatus = 'draw' as GameStatus;
        newScores.draws++;
        // Reset streak on draw in PvAI mode
        if (state.gameMode === 'pvai') {
          newCurrentStreak = 0;
        }
        saveScores(newScores);
        soundManager.playDraw();
      }

      // Play dopamine sound on good move (only for player moves, before game ends)
      if (newStatus === 'playing' && state.gameMode === 'pvai' && state.currentPlayer === 'X') {
        soundManager.playGoodMove();
      }

      // Update state
      set({
        board: newBoard,
        currentPlayer: getOpponent(state.currentPlayer),
        status: newStatus,
        winner: newWinner,
        winningCombination: newWinningCombination,
        history: newHistory,
        scores: newScores,
        currentStreak: newCurrentStreak,
        bestStreak: newBestStreak,
      });

      // If PvAI mode and game is still playing, trigger AI move
      // AI is always 'O', so only trigger if next player is 'O'
      if (state.gameMode === 'pvai' && newStatus === 'playing') {
        const nextPlayer = getOpponent(state.currentPlayer);
        
        // Only trigger AI if it's AI's turn (player O)
        if (nextPlayer === 'O') {
          setTimeout(() => {
            const aiState = get();
            if (aiState.status !== 'playing') return;
            if (aiState.currentPlayer !== 'O') return; // Double check it's O's turn

            const aiMove = getAIMove(aiState.board, 'O', aiState.difficulty);
            get().makePlayerMove(aiMove);
          }, 500); // Small delay for better UX
        }
      }
    },

    // Set game mode
    setGameMode: (mode: GameMode) => {
      set({ gameMode: mode });
      get().resetGame();
    },

    // Set difficulty
    setDifficulty: (difficulty: Difficulty) => {
      set({ difficulty });
      // Save to localStorage
      const settings = loadSettings();
      settings.difficulty = difficulty;
      saveSettings(settings);
    },

    // Reset the current game
    resetGame: () => {
      const emptyBoard = createEmptyBoard();
      set({
        board: emptyBoard,
        currentPlayer: 'X',
        status: 'playing',
        winner: null,
        winningCombination: [],
        history: [emptyBoard],
      });
    },

    // Undo last move
    undoMove: () => {
      const state = get();
      if (state.history.length <= 1) return;

      const newHistory = [...state.history];
      newHistory.pop(); // Remove current board
      const previousBoard = newHistory[newHistory.length - 1];

      set({
        board: previousBoard,
        currentPlayer: getOpponent(state.currentPlayer),
        status: 'playing',
        winner: null,
        winningCombination: [],
        history: newHistory,
      });
    },

    // Reset all scores
    resetScores: () => {
      const newScores = { X: 0, O: 0, draws: 0 };
      resetStoredScores();
      set({ scores: newScores });
    },
  };
});
