"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrambleText from "./ScrambleText";
import NumberHoverText from "./NumberHoverText";

const socials = [
  { label: "VIMEO", href: "https://vimeo.com/user187552757" },
  { label: "INSTAGRAM", href: "#" },
  { label: "BEHANCE", href: "#" },
];

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-15% 0px",
  });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative section-gutter py-40 w-full overflow-hidden"
    >
      {/* Ghost section number */}
      <div
        className="absolute -top-4 right-0 select-none pointer-events-none"
        aria-hidden
      >
        <span
          className="font-bebas text-black leading-none"
          style={{ fontSize: "28vw", opacity: 0.03, letterSpacing: "-0.02em" }}
        >
          04
        </span>
      </div>

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-20"
      >
        <ScrambleText
          text="[ CONTACT ]"
          tag="span"
          className="font-space text-xs tracking-[0.3em] text-black/40"
          triggerOnView
          cyclesPerChar={6}
          staggerMs={35}
        />
        <div className="flex-1 h-px bg-black/10" />
        <span className="font-space text-[10px] text-black/20 tracking-widest">004</span>
      </motion.div>

      <div className="flex flex-col md:flex-row md:items-center gap-16 md:gap-24">
        {/* Left: heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="shrink-0"
        >
          <NumberHoverText
            text="GET IN TOUCH"
            tag="h2"
            className="font-bebas text-[clamp(48px,6.5vw,110px)] leading-none text-black block cursor-none"
          />
        </motion.div>

        {/* Vertical divider — desktop only */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeInOut" }}
          className="hidden md:block w-px self-stretch origin-top"
          style={{ background: "rgba(210,30,30,0.35)" }}
        />

        {/* Right: contact info centered */}
        <div className="flex flex-col items-center text-center flex-1 gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-cormorant italic text-black/35 text-xl md:text-2xl leading-relaxed"
          >
            Crafting visual experiences that transcend the frame.
          </motion.p>

          <motion.a
            href="mailto:jacobgaertner27@gmail.com"
            data-cursor-expand
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="font-space text-sm tracking-wider text-black/55 hover:text-black transition-colors duration-300 border-b pb-0.5"
            style={{ borderColor: "rgba(0,0,0,0.12)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(210,30,30,0.45)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)")}
          >
            jacobgaertner27@gmail.com
          </motion.a>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex items-center gap-8"
          >
            {socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                data-cursor-expand
                className="font-space text-[10px] tracking-[0.3em] text-black/25 hover:text-black/65 transition-colors duration-300"
              >
                {label}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-24 pt-6 border-t border-black/6 flex items-center justify-between"
      >
        <span className="font-space text-[9px] tracking-[0.3em] text-black/15">
          © {new Date().getFullYear()} JACOB GAERTNER
        </span>
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-red-600/50" />
          <span className="font-space text-[9px] tracking-[0.3em] text-black/12">
            VIDEOGRAPHER — FILMMAKER
          </span>
        </div>
      </motion.div>
    </section>
  );
}
