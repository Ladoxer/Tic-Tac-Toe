/**
 * Sound Manager
 * 
 * Manages sound effects using Web Audio API
 */

class SoundManager {
  private audioContext: AudioContext | null = null;
  private muted: boolean = false;

  /**
   * Initialize audio context (must be called after user interaction)
   */
  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  /**
   * Play click sound effect
   */
  playClick(): void {
    if (this.muted) return;

    try {
      const ctx = this.getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch (error) {
      console.error('Error playing click sound:', error);
    }
  }

  /**
   * Play victory sound effect (ascending notes)
   */
  playVictory(): void {
    if (this.muted) return;

    try {
      const ctx = this.getAudioContext();
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      notes.forEach((frequency, index) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        const startTime = ctx.currentTime + index * 0.15;
        gainNode.gain.setValueAtTime(0.2, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.3);
      });
    } catch (error) {
      console.error('Error playing victory sound:', error);
    }
  }

  /**
   * Play draw sound effect (neutral tone)
   */
  playDraw(): void {
    if (this.muted) return;

    try {
      const ctx = this.getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = 440; // A4
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.5);
    } catch (error) {
      console.error('Error playing draw sound:', error);
    }
  }

  /**
   * Play dopamine-triggering success sound (good move feedback)
   * 200ms duration, pleasant tone
   */
  playGoodMove(): void {
    if (this.muted) return;

    try {
      const ctx = this.getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Pleasant "ding" sound - C6
      oscillator.frequency.value = 1046.5;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.2);
    } catch (error) {
      console.error('Error playing good move sound:', error);
    }
  }

  /**
   * Play streak celebration sound (win streak achievement)
   */
  playStreak(): void {
    if (this.muted) return;

    try {
      const ctx = this.getAudioContext();
      // Three ascending tones for streak
      const notes = [659.25, 783.99, 1046.5]; // E5, G5, C6

      notes.forEach((frequency, index) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'triangle'; // Softer sound

        const startTime = ctx.currentTime + index * 0.1;
        gainNode.gain.setValueAtTime(0.2, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.25);
      });
    } catch (error) {
      console.error('Error playing streak sound:', error);
    }
  }

  /**
   * Set muted state
   */
  setMuted(muted: boolean): void {
    this.muted = muted;
  }

  /**
   * Get muted state
   */
  isMuted(): boolean {
    return this.muted;
  }
}

// Export singleton instance
export const soundManager = new SoundManager();
