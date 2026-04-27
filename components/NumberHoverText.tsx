"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Props {
  text: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}

export default function NumberHoverText({ text, className = "", tag: Tag = "span" }: Props) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoveredRef = useRef(false);

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const enter = useCallback(() => {
    stop();
    hoveredRef.current = true;
    const chars = text.split("");
    const nonSpaceIndices = chars.map((c, i) => (c !== " " ? i : -1)).filter((i) => i >= 0);

    intervalRef.current = setInterval(() => {
      if (!hoveredRef.current) return;
      // Pick one random character position and swap it to a digit
      const idx = nonSpaceIndices[Math.floor(Math.random() * nonSpaceIndices.length)];
      setDisplay(
        chars.map((c, i) => (i === idx ? String(Math.floor(Math.random() * 10)) : c)).join("")
      );
    }, 90);
  }, [text, stop]);

  const leave = useCallback(() => {
    hoveredRef.current = false;
    stop();
    setDisplay(text);
  }, [text, stop]);

  useEffect(() => () => stop(), [stop]);

  return (
    <Tag className={className} onMouseEnter={enter} onMouseLeave={leave} data-cursor-expand>
      {display}
    </Tag>
  );
}
