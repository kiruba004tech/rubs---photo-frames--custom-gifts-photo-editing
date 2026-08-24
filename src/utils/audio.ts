/**
 * Web Audio API based tactile sound effects
 * Provides instantaneous, zero-asset haptic feedback
 */

export const playPopSound = () => {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    
    // Resume context if browser suspended it
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    // Organic tactile pop: rapid frequency decay from 560Hz to 160Hz
    osc.type = 'sine';
    osc.frequency.setValueAtTime(560, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.055);

    // Subtle volume curve: quick punch and soft exponential decay
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);

    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 100);
  } catch {
    // Silently continue if audio permissions or platform restrictions prevent audio playback
  }
};
