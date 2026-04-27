"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ScrambleText from "./ScrambleText";
import AmbientNoise from "./AmbientNoise";
import NumberHoverText from "./NumberHoverText";

const roles = ["VIDEOGRAPHER", "FILMMAKER"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleTrigger, setRoleTrigger] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 80, mass: 1 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  const jacobX = useTransform(smoothX, [-1, 1], [-18, 18]);
  const jacobY = useTransform(smoothY, [-1, 1], [-10, 10]);

  const gaertnerX = useTransform(smoothX, [-1, 1], [12, -12]);
  const gaertnerY = useTransform(smoothY, [-1, 1], [6, -6]);

  const noiseX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const noiseY = useTransform(smoothY, [-1, 1], [-4, 4]);

  const lineX = useTransform(smoothX, [-1, 1], [8, -8]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      rawX.set((e.clientX - cx) / (rect.width / 2));
      rawY.set((e.clientY - cy) / (rect.height / 2));
    };

    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [rawX, rawY]);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
      setRoleTrigger((n) => n + 1);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex flex-col justify-center items-center min-h-screen section-gutter overflow-hidden"
      style={{ perspective: "800px" }}
    >
      {/* Ghost JG monogram */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        aria-hidden
      >
        <span
          className="font-bebas text-black leading-none"
          style={{ fontSize: "62vw", opacity: 0.03, letterSpacing: "-0.04em" }}
        >
          JG
        </span>
      </div>

      {/* Warm red cinematic light blob */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 52%, rgba(210,30,30,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Left edge coordinate text */}
      <div
        className="absolute left-6 top-1/2 select-none pointer-events-none"
        aria-hidden
        style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
      >
        <span className="font-space text-[9px] tracking-[0.35em] text-black/15">
          PITTSBURGH, PA — 40.4406° N
        </span>
      </div>

      {/* Top-right REC / timecode / take */}
      <div className="absolute top-6 right-6 select-none pointer-events-none flex flex-col items-end gap-1.5" aria-hidden>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600/80 animate-pulse" />
          <span className="font-space text-[9px] tracking-[0.25em] text-black/30">REC</span>
        </div>
        <span className="font-space text-[9px] tracking-[0.15em] text-black/18">
          00:00:00:00
        </span>
        <span className="font-space text-[9px] tracking-[0.15em] text-rec">
          TAKE 001
        </span>
      </div>

      {/* Corner registration marks */}
      <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-black/10 pointer-events-none" aria-hidden />
      <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-black/10 pointer-events-none" aria-hidden />
      <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-black/10 pointer-events-none" aria-hidden />

      {/* Top-left index */}
      <div className="absolute top-20 left-6 font-space text-[10px] text-black/20 tracking-widest select-none">
        <div>JG.001</div>
        <div className="mt-1 text-black/10">PORTFOLIO</div>
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="font-space text-[10px] tracking-[0.4em] text-black/30 mb-6 select-none"
        >
          &#9632;&nbsp;&nbsp;EST. 2020
        </motion.div>

        <div className="relative flex flex-col items-center">
          <motion.div style={{ x: jacobX, y: jacobY }}>
            <NumberHoverText
              text="JACOB"
              tag="h1"
              className="font-bebas text-[clamp(72px,14vw,200px)] leading-[0.9] tracking-tight text-black block cursor-none"
            />
          </motion.div>

          <motion.div style={{ x: gaertnerX, y: gaertnerY }}>
            <NumberHoverText
              text="GAERTNER"
              tag="h1"
              className="font-bebas text-[clamp(72px,14vw,200px)] leading-[0.9] tracking-tight text-black block cursor-none"
            />
          </motion.div>
        </div>

        {/* Role cycling */}
        <div className="mt-5 h-6 overflow-hidden relative w-full flex justify-center">
          <ScrambleText
            key={roleTrigger}
            text={roles[roleIndex]}
            tag="p"
            className="font-space text-sm tracking-[0.35em] text-black/40"
            triggerOnMount
            cyclesPerChar={5}
            staggerMs={22}
          />
        </div>

        {/* Separator */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.3, duration: 1.2, ease: "easeInOut" }}
          className="mt-8 w-px h-14 bg-black/12 origin-top"
        />
      </div>

      {/* Bottom-left ambient noise */}
      <motion.div
        className="absolute bottom-8 left-6"
        style={{ x: noiseX, y: noiseY }}
      >
        <AmbientNoise lines={5} lineLength={14} />
      </motion.div>

      {/* Bottom-right scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 right-6 flex flex-col items-end gap-1 select-none"
      >
        <span className="font-space text-[10px] tracking-[0.3em] text-black/30">
          SCROLL
        </span>
        <span className="font-space text-[10px] tracking-[0.3em] text-black/20">
          ↓ 001
        </span>
      </motion.div>

      {/* Vertical accent line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
        className="absolute top-0 right-[15%] w-px h-[30vh] bg-black/5 origin-top"
        style={{ x: lineX }}
      />

      {/* Red vertical accent — left of name */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.0, duration: 1.2, ease: "easeInOut" }}
        className="absolute top-[20%] left-[18%] w-px h-[20vh] origin-top"
        style={{ background: "rgba(210,30,30,0.25)" }}
      />
    </section>
  );
}
