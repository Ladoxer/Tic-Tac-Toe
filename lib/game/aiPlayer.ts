/**
 * AI Player using Minimax Algorithm with Alpha-Beta Pruning
 * 
 * Implements an unbeatable AI for Tic Tac Toe using the minimax algorithm.
 * Includes difficulty levels:
 * - 'hard': Makes optimal moves 80% of the time, random moves 20%
 * - 'impossible': Always makes the optimal move (unbeatable)
 */

import { Player, Board, Difficulty } from './gameTypes';
import {
  checkWinner,
  isBoardFull,
  getAvailableMoves,
  makeMove,
  getOpponent,
} from './gameLogic';

/**
 * Evaluate the board score from AI perspective
 * @param board - Current board state
 * @param aiPlayer - The AI player ('X' or 'O')
 * @returns Score: +10 for AI win, -10 for human win, 0 for draw/ongoing
 */
function evaluateBoard(board: Board, aiPlayer: Player): number {
  const result = checkWinner(board);
  
  if (result) {
    if (result.winner === aiPlayer) return 10;
    if (result.winner === getOpponent(aiPlayer)) return -10;
  }
  
  return 0; // Draw or game still ongoing
}

/**
 * Minimax algorithm with alpha-beta pruning
 * 
 * This is a recursive algorithm that explores all possible game states
 * to find the optimal move. Alpha-beta pruning reduces the number of
 * nodes evaluated by eliminating branches that won't affect the final decision.
 * 
 * @param board - Current board state
 * @param depth - Current recursion depth (starts at 0)
 * @param isMaximizing - True if AI is maximizing, false if minimizing
 * @param alpha - Best value maximizer can guarantee (alpha pruning cutoff)
 * @param beta - Best value minimizer can guarantee (beta pruning cutoff)
 * @param aiPlayer - The AI player ('X' or 'O')
 * @returns The best score for the current position
 */
function minimax(
  board: Board,
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number,
  aiPlayer: Player
): number {
  const score = evaluateBoard(board, aiPlayer);
  
  // Terminal states: If game is over, return the score adjusted by depth
  // (prefer wins in fewer moves, losses in more moves)
  if (score === 10) return score - depth;
  if (score === -10) return score + depth;
  if (isBoardFull(board)) return 0;
  
  const availableMoves = getAvailableMoves(board);
  
  // Maximizing player (AI's turn)
  if (isMaximizing) {
    let maxScore = -Infinity;
    
    for (const move of availableMoves) {
      const newBoard = makeMove(board, move, aiPlayer);
      const currentScore = minimax(newBoard, depth + 1, false, alpha, beta, aiPlayer);
      maxScore = Math.max(maxScore, currentScore);
      
      // Alpha-beta pruning: if maxScore >= beta, the minimizer won't allow this branch
      alpha = Math.max(alpha, maxScore);
      if (beta <= alpha) break; // Beta cutoff
    }
    
    return maxScore;
  } 
  // Minimizing player (Human's turn)
  else {
    let minScore = Infinity;
    const humanPlayer = getOpponent(aiPlayer);
    
    for (const move of availableMoves) {
      const newBoard = makeMove(board, move, humanPlayer);
      const currentScore = minimax(newBoard, depth + 1, true, alpha, beta, aiPlayer);
      minScore = Math.min(minScore, currentScore);
      
      // Alpha-beta pruning: if minScore <= alpha, the maximizer won't allow this branch
      beta = Math.min(beta, minScore);
      if (beta <= alpha) break; // Alpha cutoff
    }
    
    return minScore;
  }
}

/**
 * Find the best move for the AI using minimax algorithm
 * @param board - Current board state
 * @param aiPlayer - The AI player ('X' or 'O')
 * @returns The index of the best move
 */
function findBestMove(board: Board, aiPlayer: Player): number {
  let bestMove = -1;
  let bestScore = -Infinity;
  const availableMoves = getAvailableMoves(board);
  
  // Try all available moves and pick the one with highest score
  for (const move of availableMoves) {
    const newBoard = makeMove(board, move, aiPlayer);
    const score = minimax(newBoard, 0, false, -Infinity, Infinity, aiPlayer);
    
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  
  return bestMove;
}

/**
 * Get a random move from available moves
 */
function getRandomMove(board: Board): number {
  const availableMoves = getAvailableMoves(board);
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
}

/**
 * Get the AI's move based on difficulty level
 * 
 * @param board - Current board state
 * @param aiPlayer - The AI player ('X' or 'O')
 * @param difficulty - Difficulty level ('easy', 'medium', 'hard', or 'impossible')
 * @returns The index of the AI's chosen move
 */
export function getAIMove(board: Board, aiPlayer: Player, difficulty: Difficulty): number {
  const availableMoves = getAvailableMoves(board);
  
  if (availableMoves.length === 0) {
    throw new Error('No available moves');
  }
  
  // Special case: first move - pick center or corner for variety
  if (availableMoves.length === 9) {
    const preferredMoves = [4, 0, 2, 6, 8]; // Center or corners
    return preferredMoves[Math.floor(Math.random() * preferredMoves.length)];
  }
  
  // Difficulty-based strategy
  let optimalChance = 0;
  
  switch (difficulty) {
    case 'easy':
      optimalChance = 0.5; // 50% optimal, 50% random (very beatable)
      break;
    case 'medium':
      optimalChance = 0.7; // 70% optimal, 30% random (moderately challenging)
      break;
    case 'hard':
      optimalChance = 0.8; // 80% optimal, 20% random (challenging but beatable)
      break;
    case 'impossible':
      optimalChance = 1.0; // 100% optimal (unbeatable)
      break;
  }
  
  const shouldMakeOptimalMove = Math.random() < optimalChance;
  
  if (shouldMakeOptimalMove || difficulty === 'impossible') {
    return findBestMove(board, aiPlayer);
  } else {
    return getRandomMove(board);
  }
}
