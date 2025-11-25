'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiEffectProps {
  trigger: boolean;
  winner?: 'X' | 'O';
}

export default function ConfettiEffect({ trigger, winner }: ConfettiEffectProps) {
  useEffect(() => {
    if (!trigger) return;

    const colors = winner === 'X' ? ['#00D9FF', '#0CFFE1'] : ['#F472B6', '#FB7185'];

    // Confetti burst from center
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
    });

    // Additional side bursts
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
    }, 200);
  }, [trigger, winner]);

  return null;
}
