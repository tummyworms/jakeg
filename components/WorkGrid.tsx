"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrambleText from "./ScrambleText";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/projects";

export default function WorkGrid() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-15% 0px",
  });

  return (
    <section
      id="work"
      ref={ref}
      className="relative section-gutter py-32 w-full overflow-hidden"
    >
      {/* Ghost section number */}
      <div
        className="absolute -top-8 right-0 select-none pointer-events-none"
        aria-hidden
      >
        <span
          className="font-bebas text-black leading-none"
          style={{ fontSize: "28vw", opacity: 0.03, letterSpacing: "-0.02em" }}
        >
          02
        </span>
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-baseline justify-between mb-12"
      >
        <div className="flex items-baseline gap-4">
          <ScrambleText
            text="SELECTED WORK"
            tag="h2"
            className="font-bebas text-4xl md:text-5xl tracking-wide text-black"
            triggerOnView
            cyclesPerChar={8}
            staggerMs={30}
          />
        </div>
        <span className="font-space text-[11px] tracking-[0.3em] text-black/25 hidden sm:block">
          ( 00{projects.length} )
        </span>
      </motion.div>

      {/* Grid */}
      <div className="flex flex-col gap-4">
        {/* 001 — full */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <ProjectCard project={projects[0]} />
        </motion.div>

        {/* 002 + 003 — two column */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <ProjectCard project={projects[1]} />
          <ProjectCard project={projects[2]} />
        </motion.div>

        {/* 004 — full */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <ProjectCard project={projects[3]} />
        </motion.div>

        {/* 005 — full */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <ProjectCard project={projects[4]} />
        </motion.div>
      </div>
    </section>
  );
}
