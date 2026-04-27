"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const CHARSET =
  "!@#$%^&*<>/\\|{}[]0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ†‡§¶∆Ω∑≠≈ψ∈∩∪⊕∂∇";

interface ScrambleOptions {
  cyclesPerChar?: number;
  staggerMs?: number;
  onComplete?: () => void;
}

export function useScramble(
  text: string,
  trigger: boolean,
  options: ScrambleOptions = {}
) {
  const { cyclesPerChar = 8, staggerMs = 40, onComplete } = options;
  const [display, setDisplay] = useState(text);
  const [scrambling, setScrambling] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  const run = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setScrambling(true);
    startRef.current = performance.now();

    const chars = text.split("");
    const charDurationMs = cyclesPerChar * 50;

    const tick = (now: number) => {
      const elapsed = now - startRef.current;

      const result = chars.map((char, i) => {
        if (char === " ") return " ";
        const charStart = i * staggerMs;
        const charEnd = charStart + charDurationMs;
        if (elapsed >= charEnd) return char;
        return CHARSET[Math.floor(Math.random() * CHARSET.length)];
      });

      setDisplay(result.join(""));

      const totalDuration = (chars.length - 1) * staggerMs + charDurationMs;
      if (elapsed >= totalDuration) {
        setDisplay(text);
        setScrambling(false);
        onComplete?.();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [text, cyclesPerChar, staggerMs, onComplete]);

  useEffect(() => {
    if (trigger) run();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, run]);

  return { display, scrambling, run };
}
