"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useScramble } from "@/hooks/useScramble";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const { display: titleDisplay, run: runTitle } = useScramble(
    project.title,
    false,
    { cyclesPerChar: 6, staggerMs: 28 }
  );

  const handleEnter = () => {
    setHovered(true);
    runTitle();
  };

  return (
    <a
      href={`https://vimeo.com/${project.vimeoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative overflow-hidden group"
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHovered(false)}
      data-cursor-expand
      style={{
        boxShadow: hovered ? "0 4px 40px rgba(0,0,0,0.1)" : "none",
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* Thumbnail */}
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 700px"
          className="object-cover"
          style={{
            filter: "grayscale(25%) brightness(0.9)",
            transition: "filter 0.5s ease",
          }}
        />

        {/* Permanent vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 100%, rgba(0,0,0,0.5) 0%, transparent 65%), radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,0,0,0.25) 0%, transparent 60%)",
          }}
        />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.3)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Play indicator on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <span
            className="font-space text-[10px] tracking-[0.35em] text-white/90 px-4 py-2"
            style={{ border: "1px solid rgba(210,30,30,0.55)" }}
          >
            WATCH ↗
          </span>
        </motion.div>

        {/* Corner accents — red on hover */}
        <div
          className="absolute top-0 left-0 w-5 h-5 border-t border-l transition-all duration-300"
          style={{
            borderColor: hovered ? "rgba(210,30,30,0.7)" : "rgba(0,0,0,0.2)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-5 h-5 border-b border-r transition-all duration-300"
          style={{
            borderColor: hovered ? "rgba(210,30,30,0.7)" : "rgba(0,0,0,0.2)",
          }}
        />

        {/* Index */}
        <div className="absolute top-3 right-3 font-space text-[9px] tracking-widest text-white/30">
          {project.index}
        </div>
      </div>

      {/* Info row */}
      <div className="px-0 py-3 border-t border-black/8 flex items-end justify-between gap-4">
        <div>
          <div className="font-bebas text-xl tracking-wide text-black leading-none">
            {titleDisplay}
          </div>
          <div className="font-cormorant italic text-black/40 text-sm mt-0.5 leading-tight line-clamp-1">
            {project.subtitle}
          </div>
        </div>
        <div className="flex flex-col items-end gap-0.5 shrink-0">
          <span className="font-space text-[9px] tracking-[0.2em] text-black/30">
            {project.category}
          </span>
          <span className="font-space text-[9px] tracking-[0.2em] text-black/20">
            {project.year}
          </span>
        </div>
      </div>
    </a>
  );
}
