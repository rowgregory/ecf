'use client'

import { useReducedMotion } from 'framer-motion'

/**
 * Inline animated text element designed to live *inside* a parent heading.
 * Inherits font-size from its parent so it scales together with surrounding
 * text. Stops the fill animation when user prefers reduced motion.
 */
export default function AnimatedTextFill() {
  const reduceMotion = useReducedMotion()

  return (
    <>
      <style>{baseStyles}</style>
      <span className={reduceMotion ? 'fill-static' : 'fill-animate'}>Education</span>
    </>
  )
}

const baseStyles = `
  @keyframes ecfFillRetract {
    0%   { background-size: 0% 100%; }
    33%  { background-size: 100% 100%; }
    66%  { background-size: 100% 100%; }
    100% { background-size: 0% 100%; }
  }

  /* Shared base — inherits font-size from parent heading so it matches the
     surrounding text rather than defining its own clamp(). */
  .fill-animate, .fill-static {
    font: inherit;
    font-weight: 900;
    letter-spacing: -0.02em;
    line-height: inherit;
    -webkit-text-stroke: clamp(1px, 0.15vw, 2px) rgba(255, 255, 255, 0.8);
    paint-order: stroke fill;
    background-position: left center;
    background-repeat: no-repeat;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: white;
  }

  .fill-animate {
    background: linear-gradient(90deg, var(--color-primary-light) 0%, var(--color-primary-light) 100%);
    background-size: 0% 100%;
    background-position: left center;
    background-repeat: no-repeat;
    background-clip: text;
    -webkit-background-clip: text;
    animation: ecfFillRetract 5s ease-in-out infinite;
  }

  /* Static fallback for reduced-motion users: fully filled, no animation. */
  .fill-static {
    background: var(--color-primary-light);
    background-clip: text;
    -webkit-background-clip: text;
  }

  @media (prefers-color-scheme: dark) {
    .fill-animate, .fill-static {
      -webkit-text-stroke: clamp(1px, 0.15vw, 2px) rgba(255, 255, 255, 0.6);
    }
  }

  /* Fallback for browsers that ignore prefers-reduced-motion via JS but
     honor the CSS query — pause animation at filled state. */
  @media (prefers-reduced-motion: reduce) {
    .fill-animate {
      animation: none;
      background-size: 100% 100%;
    }
  }
`
