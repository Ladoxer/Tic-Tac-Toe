/**
 * Game Types and Interfaces
 * 
 * Central type definitions for the Tic Tac Toe game
 */

export type Player = 'X' | 'O' | null;
export type Board = Player[];
export type GameMode = 'pvp' | 'pvai';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'impossible';
export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  gameMode: GameMode;
  difficulty: Difficulty;
  status: GameStatus;
  winner: Player;
  winningCombination: number[];
  history: Board[];
  scores: {
    X: number;
    O: number;
    draws: number;
  };
  currentStreak: number;
  bestStreak: number;
}

export interface GameSettings {
  soundEnabled: boolean;
  theme: 'light' | 'dark' | 'system';
  difficulty: Difficulty;
}
