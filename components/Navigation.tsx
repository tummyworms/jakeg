"use client";

import { useEffect, useState } from "react";
import ScrambleText from "./ScrambleText";

const navLinks = [
  { label: "WORK", href: "#work" },
  { label: "REEL", href: "#reel" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between section-gutter py-5 transition-all duration-500"
      style={{
        borderBottom: scrolled
          ? "1px solid rgba(12,10,7,0.08)"
          : "1px solid transparent",
        background: scrolled ? "rgba(247,244,239,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <a href="#" onClick={(e) => handleClick(e, "body")} className="flex items-center gap-2">
        {/* Red recording dot */}
        <span className="w-1.5 h-1.5 rounded-full bg-red-600/70 animate-pulse" />
        <ScrambleText
          text="JG"
          tag="span"
          className="font-bebas text-2xl tracking-widest cursor-pointer"
          hoverScramble
          triggerOnMount
          cyclesPerChar={6}
          staggerMs={80}
        />
      </a>

      <div className="flex items-center gap-8">
        {navLinks.map(({ label, href }, i) => (
          <a
            key={label}
            href={href}
            onClick={(e) => handleClick(e, href)}
            className="group relative flex items-center gap-2"
            data-cursor-expand
          >
            <span className="font-space text-[8px] text-black/20 tracking-widest">
              {String(i + 1).padStart(2, "0")}
            </span>
            <ScrambleText
              text={label}
              tag="span"
              className="font-space text-[11px] tracking-[0.2em] text-black/55 hover:text-black transition-colors duration-200 cursor-pointer"
              hoverScramble
              cyclesPerChar={5}
              staggerMs={30}
            />
          </a>
        ))}
      </div>
    </nav>
  );
}
