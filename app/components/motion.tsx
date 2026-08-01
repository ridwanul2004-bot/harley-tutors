"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal — fades/slides children in once they cross into the viewport.
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
 * CountUp — animates a number from 0 to `value` once visible.
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
 * FloatingSymbols — a handful of faint maths glyphs drifting in the hero background.
 * Purely decorative; pointer-events disabled.
 */
export function FloatingSymbols() {
  const symbols = ["π", "√x", "∑", "x²", "∞", "θ"];
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
 * DrawnParabola — an SVG parabola that draws itself in once visible.
 * Thematically tied to the "Solving quadratics" lesson preview.
 */
export function DrawnParabola() {
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
      viewBox="0 0 220 120"
      className={`parabola-svg ${drawn ? "parabola-drawn" : ""}`}
      aria-hidden="true"
    >
      <line x1="0" y1="100" x2="220" y2="100" className="parabola-axis" />
      <line x1="20" y1="0" x2="20" y2="120" className="parabola-axis" />
      <path d="M 30 20 Q 110 140 200 20" className="parabola-curve" />
      <circle cx="70" cy="100" r="3" className="parabola-root" />
      <circle cx="110" cy="100" r="3" className="parabola-root" />
    </svg>
  );
}

/**
 * PosterFlip — small fixed corner icon; click flips a card to reveal both
 * faces of the (placeholder) downloadable poster. Swap the two face
 * children for real poster artwork when it's ready.
 */
export function PosterFlip() {
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="poster-flip-widget">
      {open && (
        <div className="poster-card" onClick={() => setFlipped((f) => !f)}>
          <div className={`poster-inner ${flipped ? "poster-flipped" : ""}`}>
            <div className="poster-face poster-front">
              <span className="poster-eyebrow">FREE DOWNLOAD</span>
              <h4>GCSE Maths
                <br />Formula Poster</h4>
              <p>Tap to flip</p>
            </div>
            <div className="poster-face poster-back">
              <span className="poster-eyebrow">COMING SOON</span>
              <p>Print-ready A3 poster covering every GCSE formula you need to know.</p>
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
