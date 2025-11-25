/**
 * Core Game Logic Utilities
 * 
 * Functions for game state management, win detection, and move validation
 */

import { Player, Board } from './gameTypes';

/**
 * All possible winning combinations in Tic Tac Toe
 * [rows, columns, diagonals]
 */
export const WINNING_COMBINATIONS: number[][] = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
];

/**
 * Create an empty board (9 cells, all null)
 */
export function createEmptyBoard(): Board {
  return Array(9).fill(null);
}

/**
 * Check if there's a winner and return the player and winning combination
 * @returns { winner: Player, combination: number[] } or null if no winner
 */
export function checkWinner(board: Board): { winner: Player; combination: number[] } | null {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        combination,
      };
    }
  }
  
  return null;
}

/**
 * Check if the board is full (draw condition)
 */
export function isBoardFull(board: Board): boolean {
  return board.every((cell) => cell !== null);
}

/**
 * Check if the game is over (win or draw)
 */
export function isGameOver(board: Board): boolean {
  return checkWinner(board) !== null || isBoardFull(board);
}

/**
 * Get all available (empty) cell indices
 */
export function getAvailableMoves(board: Board): number[] {
  return board
    .map((cell, index) => (cell === null ? index : -1))
    .filter((index) => index !== -1);
}

/**
 * Make a move on the board (immutable - returns new board)
 */
export function makeMove(board: Board, position: number, player: Player): Board {
  if (board[position] !== null) {
    throw new Error('Cell already occupied');
  }
  
  const newBoard = [...board];
  newBoard[position] = player;
  return newBoard;
}

/**
 * Get the opponent player
 */
export function getOpponent(player: Player): Player {
  if (player === 'X') return 'O';
  if (player === 'O') return 'X';
  return null;
}

/**
 * Validate if a move is legal
 */
export function isValidMove(board: Board, position: number): boolean {
  return position >= 0 && position < 9 && board[position] === null;
}
