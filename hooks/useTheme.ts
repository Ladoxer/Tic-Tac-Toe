/**
 * Theme Hook
 * 
 * React hook for managing light/dark theme
 */

'use client';

import { useEffect, useState } from 'react';
import { loadSettings, saveSettings } from '@/lib/storage/localStorage';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system');

  useEffect(() => {
    // Load theme preference
    const settings = loadSettings();
    setThemeState(settings.theme);
    applyTheme(settings.theme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(newTheme);
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);

    // Save to localStorage
    const settings = loadSettings();
    settings.theme = newTheme;
    saveSettings(settings);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
}
