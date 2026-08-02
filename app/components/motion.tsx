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
  const symbols = ["∫", "∇·B=0", "Ĥψ=Eψ", "Σ", "dx/dt", "λ", "∇×E=-∂B/∂t", "e^(iπ)+1=0"];
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
 * DrawnHorn - depicts Gabriel's Horn as a solid of revolution (y = 1/x spun
 * around the x-axis, x=1 to infinity): a smoothly shaded tapering tube, a
 * highlighted red curve tracing y = 1/x along its surface, and arrowed x/y
 * axes - matching how this is plotted in maths software.
 *
 * Deliberately flat 2D SVG, not a CSS `rotateX/rotateY` 3D transform: a real
 * 3D rotation of the whole plane skews and compresses text unpredictably
 * (that's what caused the garbled, overlapping labels in the previous
 * version). The sense of angle/depth comes from the artwork itself - a
 * genuinely tilted mouth ellipse and shaded body - not from physically
 * rotating the drawing, so every label stays crisp and correctly spaced
 * regardless of viewport.
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
        viewBox="0 0 220 94"
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
          d="M 32 10 C 62 10, 66 13, 82 26 C 122 37, 162 41, 208 48"
          className="horn-outline horn-outline-top"
        />
        <path
          d="M 32 86 C 62 86, 66 83, 82 70 C 122 59, 162 55, 208 48"
          className="horn-outline horn-outline-bottom"
        />
        <path
          d="M 32 10 C 62 10, 66 13, 82 26 C 122 37, 162 41, 208 48 C 162 55, 122 59, 82 70 C 66 83, 62 86, 32 86 Z"
          className="horn-fill"
        />
        {/* open mouth: a genuinely tilted ellipse, drawn with real perspective
            in the artwork itself rather than a CSS 3D rotation */}
        <ellipse cx="30" cy="48" rx="11" ry="37" className="horn-mouth-ring" />
        {/* a faint highlight along the upper surface, for a lit-tube feel */}
        <path
          d="M 40 18 C 70 17, 106 24, 156 34" className="horn-highlight" />

        {/* the y = 1/x curve, traced along the top of the surface */}
        <path
          d="M 46 20 C 72 22, 102 29, 144 39"
          className="horn-curve"
        />
        <text x="72" y="14" className="horn-curve-label">y = 1/x</text>

        {/* axes with arrowheads, matching how this is plotted in maths software */}
        <g className="horn-axes">
          <line x1="30" y1="88" x2="30" y2="4" className="horn-axis-line" markerEnd="url(#horn-arrow)" />
          <line x1="10" y1="48" x2="212" y2="48" className="horn-axis-line" markerEnd="url(#horn-arrow)" />
          <text x="20" y="2" className="horn-axis-label">y</text>
          <text x="188" y="66" className="horn-axis-label">x</text>
          <line x1="210" y1="48" x2="222" y2="48" className="horn-axis-continue" markerEnd="url(#horn-arrow-red)" />
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
  { id: "inside-a-lesson", label: "Lesson" },
  { id: "approach", label: "How it works" },
  { id: "pricing", label: "Pricing" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" }
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
 * SectionSidebar - a floating desktop-only navigator. Collapsed, it's a
 * slim tab with just a dot per section; hover or click expands it into a
 * labelled panel, active section highlighted, closing again on link click
 * or mouse-leave. Keyboard-focusable so it can be expanded without a mouse.
 */
export function SectionSidebar() {
  const [active, setActive] = useState("top");
  const [expanded, setExpanded] = useState(false);

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
    <div
      className={`section-sidebar ${expanded ? "section-sidebar-expanded" : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setExpanded(false);
      }}
    >
      <nav className="section-sidebar-panel" aria-label="Jump to section">
        {NAV_SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`section-sidebar-link ${active === s.id ? "section-sidebar-active" : ""}`}
            onClick={() => setExpanded(false)}
          >
            <span className="section-sidebar-dot" />
            <span className="section-sidebar-label">{s.label}</span>
          </a>
        ))}
      </nav>
      <button
        className="section-sidebar-toggle"
        aria-label={expanded ? "Collapse section navigation" : "Expand section navigation"}
        onClick={() => setExpanded((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
    </div>
  );
}

/**
 * PosterFlip - small fixed corner icon; click opens a card, click the card
 * to flip it. Front and back both show the real Harley Tutors poster
 * artwork; a WhatsApp CTA overlays the back so it stays a useful action,
 * not just a picture.
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
              <img src="/poster-back.jpg" alt="Harley Tutors poster, reverse side" />
              <a
                className="poster-whatsapp poster-whatsapp-overlay"
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
