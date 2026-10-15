'use client'

import { useState } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent, useReducedMotion } from 'motion/react'

// Custom mechanical easing
const MECHANICAL_EASE = [0.16, 1, 0.3, 1] as const

const GROOVE_MARKS = [
  { label: '12" RIM', top: '0%', target: '#hero', title: 'Jump to Turntable Platter' },
  { label: 'GROOVE 01', top: '25%', target: '#exhibitions', title: 'Jump to Exhibitions & Pressing Plants' },
  { label: 'MID-DISC', top: '50%', target: '#exhibitions', title: 'Jump to Curatorial Selection' },
  { label: 'INNER BAND', top: '75%', target: '#index', title: 'Jump to Sonic Index Catalog' },
  { label: 'DEAD WAX', top: '100%', target: '#about', title: 'Jump to About & Colophon' },
]

export function ScrollNeedle() {
  const [percent, setPercent] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  })

  // Listen to live stylus movement
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    setPercent(Math.round(Math.min(100, Math.max(0, latest * 100))))
  })

  // Stylus diamond head position mapped along the grooved track
  const needleTop = useTransform(smoothProgress, [0, 1], ['0%', 'calc(100% - 14px)'])

  const scrollToSection = (target: string) => {
    const el = document.querySelector(target)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* 1. Global Micro-Groove Top Track (Visible on all viewports) */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-ink/15 pointer-events-none"
      >
        <motion.div
          className="h-full bg-ink origin-left"
          style={{ scaleX: smoothProgress }}
        />
      </div>

      {/* 2. Audiophile Vertical Groove Meter (Desktop Marginal Widget) */}
      <aside
        aria-label="Analog Stylus Scroll Tracker and Section Navigator"
        className="fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center select-none"
      >
        {/* Top Groove Masthead Header */}
        <div className="mb-3 flex flex-col items-center gap-0.5 pointer-events-none">
          <span className="font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-ink-soft">
            GROOVE TRACKER
          </span>
          <span
            aria-live="off"
            className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink border border-ink/40 bg-paper px-1.5 py-0.2 shadow-xs"
          >
            {percent}% // 33⅓ RPM
          </span>
        </div>

        {/* The Concentric Calibrated Groove Rail */}
        <div className="relative h-56 w-14 flex justify-center">
          {/* Central Vinyl Run Groove Rail */}
          <div className="relative h-full w-[2px] bg-ink/20 pointer-events-none">
            {/* Smooth Ink Progress Fill */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-ink origin-top"
              style={{ height: '100%', scaleY: smoothProgress }}
            />

            {/* Tonearm Stylus Diamond Head Cartridge */}
            <motion.div
              className="absolute -left-[7px] size-4 border-2 border-ink bg-paper-bright shadow-[2px_2px_0_0_var(--ink)] flex items-center justify-center transition-shadow"
              style={{ top: needleTop }}
            >
              <div className="size-1.5 bg-ink" />
              {/* Micro Tonearm Cantilever needle tip */}
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-[1.5px] bg-ink" />
            </motion.div>
          </div>

          {/* Calibrated Concentric Micro-Ticks along the Rail (Interactive Jump Navigation) */}
          {GROOVE_MARKS.map((mark) => (
            <button
              key={mark.label}
              type="button"
              onClick={() => scrollToSection(mark.target)}
              title={mark.title}
              aria-label={`${mark.label}: ${mark.title}`}
              className="group absolute left-7 flex items-center gap-1 font-mono text-[7px] uppercase tracking-[0.12em] text-ink-soft/70 hover:text-ink hover:font-bold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink transition-all cursor-pointer whitespace-nowrap"
              style={{ top: mark.top, transform: 'translateY(-50%)' }}
            >
              <span className="w-1.5 h-[1px] bg-ink/50 group-hover:w-3 group-hover:bg-ink transition-all" />
              <span>{mark.label}</span>
            </button>
          ))}
        </div>

        {/* Bottom Dead Wax Colophon Mark */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Scroll back to top"
          aria-label="Scroll back to top of museum"
          className="mt-3 flex flex-col items-center font-mono text-[7px] uppercase tracking-[0.16em] text-ink-soft/80 hover:text-ink focus-visible:outline-none focus-visible:underline transition-colors cursor-pointer"
        >
          <span>RUN-OUT GROOVE</span>
          <span className="underline">TOP ↑</span>
        </button>
      </aside>
    </>
  )
}
