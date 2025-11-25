/**
 * LocalStorage Utilities
 * 
 * Type-safe localStorage operations with error handling
 */

import { GameSettings } from '../game/gameTypes';

const SCORES_KEY = 'tictactoe_scores';
const SETTINGS_KEY = 'tictactoe_settings';

export interface StoredScores {
  X: number;
  O: number;
  draws: number;
}

/**
 * Save scores to localStorage
 */
export function saveScores(scores: StoredScores): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
  } catch (error) {
    console.error('Failed to save scores:', error);
  }
}

/**
 * Load scores from localStorage
 */
export function loadScores(): StoredScores {
  if (typeof window === 'undefined') {
    return { X: 0, O: 0, draws: 0 };
  }
  try {
    const stored = localStorage.getItem(SCORES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load scores:', error);
  }
  
  // Return default scores
  return { X: 0, O: 0, draws: 0 };
}

/**
 * Reset scores in localStorage
 */
export function resetScores(): void {
  saveScores({ X: 0, O: 0, draws: 0 });
}

/**
 * Save settings to localStorage
 */
export function saveSettings(settings: GameSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

/**
 * Load settings from localStorage
 */
export function loadSettings(): GameSettings {
  if (typeof window === 'undefined') {
    return {
      soundEnabled: true,
      theme: 'system',
      difficulty: 'hard',
    };
  }
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
   if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
  
  // Return default settings
  return {
    soundEnabled: true,
    theme: 'system',
    difficulty: 'hard',
  };
}
