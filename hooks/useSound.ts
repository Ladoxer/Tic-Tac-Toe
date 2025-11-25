/**
 * Sound Hook
 * 
 * React hook for managing sound effects
 */

'use client';

import { useEffect, useState } from 'react';
import { soundManager } from '@/lib/sound/soundManager';
import { loadSettings, saveSettings } from '@/lib/storage/localStorage';

export function useSound() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    // Load sound preference from localStorage
    const settings = loadSettings();
    setSoundEnabled(settings.soundEnabled);
    soundManager.setMuted(!settings.soundEnabled);
  }, []);

  const toggleSound = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    soundManager.setMuted(!newValue);

    // Save to localStorage
    const settings = loadSettings();
    settings.soundEnabled = newValue;
    saveSettings(settings);
  };

  return {
    soundEnabled,
    toggleSound,
  };
}
