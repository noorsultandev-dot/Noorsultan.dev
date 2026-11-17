"use client";

// Very quiet synthesized key clicks. Off by default; nothing plays until the
// visitor turns sound on, and the AudioContext is only created on that click.
let enabled = false;
let ctx: AudioContext | null = null;
const listeners = new Set<(on: boolean) => void>();

export function isSoundOn() {
  return enabled;
}

export function setSound(on: boolean) {
  enabled = on;
  if (on && !ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AC) ctx = new AC();
  }
  listeners.forEach((l) => l(on));
}

export function onSoundChange(fn: (on: boolean) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

let lastClick = 0;
export function keyClick() {
  if (!enabled || !ctx) return;
  const now = performance.now();
  if (now - lastClick < 35) return;
  lastClick = now;
  const t = ctx.currentTime;
  const len = 0.025;
  const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * len), ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 3);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1800 + Math.random() * 1400;
  const gain = ctx.createGain();
  gain.gain.value = 0.05;
  src.connect(filter).connect(gain).connect(ctx.destination);
  src.start(t);
}
