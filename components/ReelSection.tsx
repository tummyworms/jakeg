"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ScrambleText from "./ScrambleText";

const LATEST_VIMEO_ID = "1186778498";
const LATEST_VIMEO_HASH = "";

export default function ReelSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-15% 0px",
  });
  const [playing, setPlaying] = useState(false);

  return (
    <section id="reel" ref={ref} className="relative section-gutter py-32 w-full overflow-hidden">
      {/* Ghost section number */}
      <div
        className="absolute -top-4 right-0 select-none pointer-events-none"
        aria-hidden
      >
        <span
          className="font-bebas text-black leading-none"
          style={{ fontSize: "28vw", opacity: 0.03, letterSpacing: "-0.02em" }}
        >
          01
        </span>
      </div>

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-10"
      >
        <ScrambleText
          text="[ LATEST ]"
          tag="span"
          className="font-space text-xs tracking-[0.3em] text-black/40"
          triggerOnView
          cyclesPerChar={6}
          staggerMs={35}
        />
        <div className="flex-1 h-px bg-black/10" />
        <span className="font-space text-[10px] text-black/20 tracking-widest">002</span>
      </motion.div>

      {/* Video title */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-4"
      >
        <ScrambleText
          text="EDITING REEL 2026"
          tag="h3"
          className="font-bebas text-2xl md:text-3xl tracking-wide text-black/70"
          triggerOnView
          cyclesPerChar={7}
          staggerMs={28}
        />
        <p className="font-cormorant italic text-black/35 text-sm mt-1">
          A showcase of editing work across film and narrative projects.
        </p>
      </motion.div>

      {/* Video container */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full border-t-2"
        style={{
          aspectRatio: "16/9",
          borderColor: "rgba(210,30,30,0.4)",
          boxShadow: "0 0 60px rgba(210,30,30,0.06), 0 8px 60px rgba(0,0,0,0.1)",
        }}
      >
        {!playing ? (
          <button
            className="absolute inset-0 w-full h-full group"
            onClick={() => setPlaying(true)}
            data-cursor-expand
          >
            <img
              src={`https://i.vimeocdn.com/video/2150553168-507ab4ca90bd3d23833fef5dc7bd200b5947e3c231ea0735a13147494c09e9d2-d_640`}
              alt="Editing Reel 2026"
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(20%) brightness(0.85)" }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" />
            {/* Play label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="px-8 py-3 transition-all duration-300"
                style={{
                  border: "1px solid rgba(210,30,30,0.45)",
                  boxShadow: "0 0 20px rgba(210,30,30,0.08)",
                }}
              >
                <span className="font-space text-xs tracking-[0.35em] text-white/90 group-hover:text-white transition-colors duration-300">
                  ▶ PLAY
                </span>
              </div>
            </div>
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/20" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/20" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/20" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/20" />
            {/* REC indicator on thumbnail */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 animate-pulse" />
              <span className="font-space text-[8px] tracking-[0.2em] text-white/50">REC</span>
            </div>
          </button>
        ) : (
          <iframe
            src={`https://player.vimeo.com/video/${LATEST_VIMEO_ID}?autoplay=1&title=0&byline=0&portrait=0&color=ffffff`}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )}
      </motion.div>

      {/* Film metadata + Vimeo credit */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-3 flex items-center justify-between"
      >
        <span className="font-space text-[9px] tracking-[0.2em] text-black/20">
          2.39:1 — 24FPS — S16
        </span>
        <a
          href="https://vimeo.com/user187552757"
          target="_blank"
          rel="noopener noreferrer"
          className="font-space text-[9px] tracking-[0.25em] text-black/20 hover:text-black/50 transition-colors duration-300"
          data-cursor-expand
        >
          VIMEO ↗
        </a>
      </motion.div>
    </section>
  );
}
