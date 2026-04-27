"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useScramble } from "@/hooks/useScramble";

interface ScrambleTextProps {
  text: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  triggerOnView?: boolean;
  triggerOnMount?: boolean;
  hoverScramble?: boolean;
  cyclesPerChar?: number;
  staggerMs?: number;
  ambient?: boolean;
  ambientIntervalMs?: number;
}

export default function ScrambleText({
  text,
  className = "",
  tag: Tag = "span",
  triggerOnView = false,
  triggerOnMount = false,
  hoverScramble = false,
  cyclesPerChar = 8,
  staggerMs = 40,
  ambient = false,
  ambientIntervalMs = 4000,
}: ScrambleTextProps) {
  const ref = useRef<Element>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-10% 0px",
  });

  const [trigger, setTrigger] = useState(false);

  const { display, run } = useScramble(text, trigger, {
    cyclesPerChar,
    staggerMs,
  });

  useEffect(() => {
    if (triggerOnMount) setTrigger(true);
  }, [triggerOnMount]);

  useEffect(() => {
    if (triggerOnView && isInView) setTrigger(true);
  }, [triggerOnView, isInView]);

  useEffect(() => {
    if (!ambient) return;
    const id = setInterval(() => run(), ambientIntervalMs);
    return () => clearInterval(id);
  }, [ambient, ambientIntervalMs, run]);

  const handleMouseEnter = () => {
    if (hoverScramble) run();
  };

  return (
    <Tag
      ref={ref as never}
      className={className}
      onMouseEnter={handleMouseEnter}
    >
      {display}
    </Tag>
  );
}
