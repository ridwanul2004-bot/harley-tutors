"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal - fades/slides children in once they cross into the viewport.
 * Respects prefers-reduced-motion by rendering fully visible immediately.
 */
export function Reveal({
  children,
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/**
 * CountUp - animates a number from 0 to `value` once visible.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1400
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(Math.round(eased * value));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/**
 * FloatingSymbols - advanced maths/physics notation drifting faintly in the
 * hero background. Kept short so each glyph reads cleanly at small sizes.
 */
export function FloatingSymbols() {
  const symbols = ["∫", "∇·B=0", "∂²y/∂x²", "Σ", "dx/dt", "λ"];
  return (
    <div className="floating-symbols" aria-hidden="true">
      {symbols.map((sym, i) => (
        <span key={sym} className={`floating-symbol fs-${i}`}>
          {sym}
        </span>
      ))}
    </div>
  );
}

/**
 * DrawnHorn - depicts Gabriel's Horn as a clean, textbook-style 3D solid of
 * revolution (y = 1/x spun around the x-axis, x=1 to infinity): a smoothly
 * shaded tapering tube, a highlighted red curve tracing y = 1/x along its
 * visible top surface, and arrowed x/y axes - matching how this is actually
 * plotted in maths software, rather than a wireframe of rings and spokes.
 * On reveal: the body outline draws in, the red curve traces itself along
 * the top, then the shading and axes fade in.
 */
export function DrawnHorn() {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDrawn(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="horn-scene">
      <svg
        ref={ref}
        viewBox="0 0 220 90"
        className={`horn-svg ${drawn ? "horn-drawn" : ""}`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="horn-gradient" x1="0" y1="0" x2="1" y2="0.15">
            <stop offset="0%" stopColor="#1c3a5c" />
            <stop offset="55%" stopColor="#8b98a6" />
            <stop offset="100%" stopColor="#e2c288" />
          </linearGradient>
          <marker id="horn-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 Z" fill="#9aa5b1" />
          </marker>
          <marker id="horn-arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 Z" fill="#c0473c" />
          </marker>
        </defs>

        {/* body outline: the surface of revolution's silhouette */}
        <path
          d="M 26 8 C 58 8, 62 10, 80 24 C 120 36, 160 40, 206 46"
          className="horn-outline horn-outline-top"
        />
        <path
          d="M 26 84 C 58 84, 62 82, 80 68 C 120 56, 160 52, 206 46"
          className="horn-outline horn-outline-bottom"
        />
        <path
          d="M 26 8 C 58 8, 62 10, 80 24 C 120 36, 160 40, 206 46 C 160 52, 120 56, 80 68 C 62 82, 58 84, 26 84 Z"
          className="horn-fill"
        />
        {/* open mouth, suggesting the near circular face of the tube */}
        <ellipse cx="26" cy="46" rx="6" ry="38" className="horn-mouth-ring" />
        {/* a faint highlight along the upper surface, for a lit-tube feel */}
        <path
          d="M 34 16 C 64 15, 100 22, 150 32"
          className="horn-highlight"
        />

        {/* the y = 1/x curve, traced along the top of the surface */}
        <path
          d="M 40 18 C 66 20, 96 27, 138 37"
          className="horn-curve"
        />
        <text x="40" y="10" className="horn-curve-label">y = 1/x</text>

        {/* axes with arrowheads, matching how this is plotted in maths software */}
        <g className="horn-axes">
          <line x1="26" y1="86" x2="26" y2="4" className="horn-axis-line" markerEnd="url(#horn-arrow)" />
          <line x1="8" y1="46" x2="212" y2="46" className="horn-axis-line" markerEnd="url(#horn-arrow)" />
          <text x="18" y="2" className="horn-axis-label">y</text>
          <text x="200" y="58" className="horn-axis-label">x</text>
          <line x1="206" y1="46" x2="218" y2="46" className="horn-axis-continue" markerEnd="url(#horn-arrow-red)" />
        </g>
      </svg>
    </div>
  );
}

/**
 * SubNav - slim sticky wayfinding bar. Sits in the flow after the hero, so
 * it only starts sticking once the (separately-positioned) main header has
 * already scrolled away. Highlights the section currently in view.
 */
const NAV_SECTIONS = [
  { id: "top", label: "Overview" },
  { id: "subjects", label: "Subjects" },
  { id: "about", label: "Meet us" },
  { id: "inside-a-lesson", label: "See a lesson" },
  { id: "reviews", label: "Reviews" }
];

export function SubNav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="subnav" aria-label="Section navigation">
      <div className="subnav-inner">
        {NAV_SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className={active === s.id ? "subnav-active" : ""}>
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/**
 * ScrollRail - minimal desktop-only dot rail showing reading progress
 * through the same sections as SubNav, clickable to jump.
 */
export function ScrollRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="scroll-rail" aria-hidden="true">
      {NAV_SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`scroll-rail-dot ${active === s.id ? "scroll-rail-active" : ""}`}
          title={s.label}
        />
      ))}
    </div>
  );
}

/**
 * PosterFlip - small fixed corner icon; click opens a card, click the card
 * to flip it. Front shows the real Harley Tutors poster; back is a quick
 * contact panel. Swap posterSrc when a new poster is ready.
 */
export function PosterFlip() {
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="poster-flip-widget">
      {open && (
        <div className="poster-card">
          <div className={`poster-inner ${flipped ? "poster-flipped" : ""}`}>
            <div
              className="poster-face poster-front"
              onClick={() => setFlipped(true)}
            >
              <img src="/poster-front.jpg" alt="Harley Tutors poster" />
              <span className="poster-tap-hint">Tap to flip</span>
            </div>
            <div className="poster-face poster-back" onClick={() => setFlipped(false)}>
              <span className="poster-eyebrow">GET IN TOUCH</span>
              <p>Maths, Science, English and 11+ tutoring. One-to-one or small group, online.</p>
              <a
                className="poster-whatsapp"
                href="https://wa.me/447517246948?text=Hi%20Harley%20Tutors%2C%20I%27d%20like%20to%20ask%20about%20tuition."
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                Message on WhatsApp
              </a>
              <span className="poster-tap-hint">Tap to flip back</span>
            </div>
          </div>
        </div>
      )}
      <button
        className="poster-toggle"
        aria-label="Open free poster preview"
        onClick={() => setOpen((o) => !o)}
      >
        <img src="/harley-logo.png" alt="" />
      </button>
    </div>
  );
}
