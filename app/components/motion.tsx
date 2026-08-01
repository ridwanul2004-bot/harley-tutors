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
 * DrawnHorn - depicts Gabriel's Horn as an actual solid of revolution
 * (y = 1/x spun 360deg around the x-axis, x=1 to infinity), not just a flat
 * silhouette. Elliptical cross-section rings at intervals along the horn are
 * the standard textbook device for showing "this outline is really a tube
 * of circles spinning in 3D" - combined with small y/z axis marks at the
 * mouth. Outline draws in, rings fade in left-to-right, then the body fills.
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
    <svg
      ref={ref}
      viewBox="0 0 220 90"
      className={`horn-svg ${drawn ? "horn-drawn" : ""}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="horn-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#112e4d" />
          <stop offset="100%" stopColor="#e89b20" />
        </linearGradient>
      </defs>

      {/* x-axis, running the length of the horn */}
      <line x1="6" y1="46" x2="212" y2="46" className="parabola-axis" />

      {/* horn body: top and bottom profile of y = 1/x from x=1 outward */}
      <path
        d="M 30 12 C 64 12, 64 12, 84 27 C 124 39, 164 43, 210 46"
        className="horn-outline horn-outline-top"
      />
      <path
        d="M 30 80 C 64 80, 64 80, 84 65 C 124 53, 164 49, 210 46"
        className="horn-outline horn-outline-bottom"
      />
      <path
        d="M 30 12 C 64 12, 64 12, 84 27 C 124 39, 164 43, 210 46 C 164 49, 124 53, 84 65 C 64 80, 64 80, 30 80 Z"
        className="horn-fill"
      />

      {/* cross-section rings, tilted into ellipses to sell the 3D revolution */}
      <ellipse cx="30" cy="46" rx="7" ry="34" className="horn-ring horn-ring-1" />
      <ellipse cx="84" cy="46" rx="5" ry="19" className="horn-ring horn-ring-2" />
      <ellipse cx="140" cy="46" rx="3.5" ry="9" className="horn-ring horn-ring-3" />

      {/* y/z axis markers at the mouth, to signal this is a 3D revolution, not a flat curve */}
      <g className="horn-axes">
        <line x1="30" y1="46" x2="30" y2="10" className="horn-axis-line" />
        <line x1="30" y1="46" x2="14" y2="34" className="horn-axis-line" />
        <text x="24" y="6" className="horn-axis-label">y</text>
        <text x="4" y="32" className="horn-axis-label">z</text>
        <text x="200" y="58" className="horn-axis-label">x</text>
      </g>
    </svg>
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
