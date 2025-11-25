/**
 * Player Stats and Streak Tracking Types
 */

export interface PlayerStats {
  totalGames: number;
  winRate: number;
  currentStreak: number;
  bestStreak: number;
  lastResult: 'win' | 'loss' | 'draw' | null;
}

export interface StreakBadge {
  level: number;
  title: string;
  emoji: string;
  description: string;
}

export const STREAK_BADGES: StreakBadge[] = [
  { level: 3, title: 'Hot Streak', emoji: '🔥', description: '3 wins in a row!' },
  { level: 5, title: 'Dominating', emoji: '⚡', description: '5 wins in a row!' },
  { level: 7, title: 'Unstoppable', emoji: '💪', description: '7 wins in a row!' },
  { level: 10, title: 'Legendary', emoji: '👑', description: '10 wins in a row!' },
];

export function getStreakBadge(streak: number): StreakBadge | null {
  const badges = STREAK_BADGES.filter(b => streak >= b.level);
  return badges.length > 0 ? badges[badges.length - 1] : null;
}

export function calculateWinRate(wins: number, total: number): number {
  return total > 0 ? Math.round((wins / total) * 100) : 0;
}
