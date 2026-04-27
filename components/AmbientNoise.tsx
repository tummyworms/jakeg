"use client";

import { useEffect, useState } from "react";

const CHARSET =
  "!@#$%^&*<>/\\|{}[]0123456789†‡§¶∆Ω∑≠≈ψ∈∩∪⊕∂∇ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

function randomLine(len: number) {
  return Array.from({ length: len }, randomChar).join("");
}

export default function AmbientNoise({
  lines = 4,
  lineLength = 18,
  className = "",
}: {
  lines?: number;
  lineLength?: number;
  className?: string;
}) {
  const [rows, setRows] = useState<string[]>([]);

  useEffect(() => {
    setRows(Array.from({ length: lines }, () => randomLine(lineLength)));
    const id = setInterval(() => {
      setRows(Array.from({ length: lines }, () => randomLine(lineLength)));
    }, 120);
    return () => clearInterval(id);
  }, [lines, lineLength]);

  return (
    <div
      className={`font-space text-[10px] leading-5 text-black/20 select-none ${className}`}
      aria-hidden
    >
      {rows.map((row, i) => (
        <div key={i}>{row}</div>
      ))}
    </div>
  );
}
