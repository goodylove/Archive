'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Play, Pause, MapPin, Disc } from 'lucide-react'
import type { MusicianRecord } from '@/lib/musicians'
import { ArchiveImage } from './archive-image'
import { fallbackImage, textOn } from '@/lib/archive'

interface DossierCardProps {
  musician: MusicianRecord
  isPlaying: boolean
  onTogglePlay: (id: string) => void
}

// Custom heavy mechanical easing curve (Awwwards / FWA standard)
const MECHANICAL_EASE = [0.16, 1, 0.3, 1] as const

export function DossierCard({ musician, isPlaying, onTogglePlay }: DossierCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const fallback = fallbackImage(musician)
  const inkColor = textOn(musician.accentColor)

  // Calculate authentic vinyl spin duration mapped to track BPM
  // (60 / BPM) * 2 creates realistic 33 RPM / 45 RPM rotation cadence
  const spinDuration = Math.max(1.6, (60 / musician.bpm) * 2.5)

  return (
    <motion.article
      layout
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.48, ease: MECHANICAL_EASE }}
      whileHover={shouldReduceMotion ? undefined : { y: -6, x: -2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col border-2 border-ink bg-paper-bright shadow-[6px_6px_0_0_var(--ink)] transition-shadow duration-300 hover:shadow-[12px_12px_0_0_var(--ink)]"
      style={{
        ['--specimen-accent' as string]: musician.accentColor,
      }}
    >
      {/* 1. Ink-Stamp Header Impression */}
      <motion.header
        initial={shouldReduceMotion ? undefined : { scale: 1.06, opacity: 0 }}
        whileInView={shouldReduceMotion ? undefined : { scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.22, delay: 0.08, ease: MECHANICAL_EASE }}
        className="flex items-center justify-between border-b-2 border-ink bg-ink px-3.5 py-2 text-paper select-none"
      >
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] flex items-center gap-1.5">
          <span className="inline-block size-1.5 bg-paper" />
          Specimen {musician.index}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/80">
          {musician.releaseYear} · {musician.bpm} BPM
        </span>
      </motion.header>

      {/* 2. Archival Sleeve Photo & Vinyl Mechanical Slide-Out Container */}
      <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-ink bg-ink">
        {/* Main Archival Photographic Print */}
        <ArchiveImage
          src={musician.collage.heroImg}
          fallbackSrc={fallback}
          alt={`Archival photograph of ${musician.name}`}
          className="h-full w-full object-cover contrast-125 grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />

        {/* Dynamic Duotone Wash (Lifts gracefully on card hover) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0"
          style={{ backgroundColor: musician.accentColor }}
        />

        {/* Hand-Applied Masking Tape Note (Straightens mechanically on hover) */}
        <motion.p
          aria-hidden
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  rotate: isHovered ? 0 : -2.5,
                  y: isHovered ? -1 : 0,
                }
          }
          transition={{ duration: 0.3, ease: MECHANICAL_EASE }}
          className="absolute left-2.5 top-2.5 border border-ink/30 bg-paper/95 px-2.5 py-0.5 font-serif text-xs italic text-ink shadow-sm select-none"
        >
          {musician.collage.tapeNote}
        </motion.p>

        {/* 3. The Physical Vinyl Record Disc: Slide-Out & Continuous Spin Mechanics */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full border border-ink/70 vinyl-grooves opacity-90 shadow-2xl"
          animate={
            shouldReduceMotion
              ? undefined
              : isPlaying
              ? {
                  x: -30,
                  y: -10,
                  rotate: [0, 360],
                  transition: {
                    x: { duration: 0.45, ease: MECHANICAL_EASE },
                    y: { duration: 0.45, ease: MECHANICAL_EASE },
                    rotate: {
                      duration: spinDuration,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                  },
                }
              : isHovered
              ? {
                  x: -24,
                  y: -6,
                  rotate: 22,
                  transition: { duration: 0.45, ease: MECHANICAL_EASE },
                }
              : {
                  x: 0,
                  y: 0,
                  rotate: 0,
                  transition: { duration: 0.5, ease: MECHANICAL_EASE },
                }
          }
        >
          {/* Vinyl Surface Grooves & Radial Luster */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.18)_0%,transparent_50%)]" />

          {/* Record Center Label with Artist Accent Tint */}
          <div
            className="absolute inset-[30%] rounded-full border border-ink/40 shadow-inner flex flex-col items-center justify-center text-center p-1"
            style={{
              backgroundColor: musician.accentColor,
              color: inkColor,
            }}
          >
            {/* Center Spindle Hole */}
            <div className="size-2 rounded-full bg-ink border border-paper/50 mb-0.5" />
            <span className="font-mono text-[6px] font-bold uppercase tracking-widest leading-none truncate max-w-full">
              {musician.catalogNumber.split(' ')[0] || 'REC'}
            </span>
          </div>
        </motion.div>

        {/* 4. Taped Stage Polaroid Snapshot: Paper Lift & Tilt Physics */}
        <motion.figure
          animate={
            shouldReduceMotion
              ? undefined
              : isHovered
              ? {
                  rotate: -1,
                  y: -3,
                  scale: 1.05,
                }
              : {
                  rotate: -5,
                  y: 0,
                  scale: 1,
                }
          }
          transition={{ duration: 0.35, ease: MECHANICAL_EASE }}
          className="absolute bottom-2 left-2 w-16 border-[3px] border-b-[10px] border-paper-bright bg-paper-bright shadow-md transition-shadow group-hover:shadow-xl sm:w-20 select-none"
        >
          <div className="aspect-square overflow-hidden bg-ink/20">
            <ArchiveImage
              src={musician.collage.stageImg}
              fallbackSrc={fallback}
              alt={`${musician.name} on stage snapshot`}
              className="grayscale contrast-125 object-cover w-full h-full"
            />
          </div>
        </motion.figure>

        {/* 5. Tactile Mechanical Audio Play Button */}
        {musician.audio ? (
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onTogglePlay(musician.id)
            }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.1, x: -1, y: -1 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.92, x: 1, y: 1 }}
            transition={{ duration: 0.15, ease: MECHANICAL_EASE }}
            aria-label={`${isPlaying ? 'Pause' : 'Play'} master sample of ${musician.hitTrack}`}
            aria-pressed={isPlaying}
            className={`absolute bottom-2.5 right-2.5 flex size-10 items-center justify-center border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink cursor-pointer transition-colors ${
              isPlaying
                ? 'bg-ink text-paper'
                : 'bg-paper-bright text-ink hover:bg-[#e7dcc6]'
            }`}
          >
            {isPlaying ? (
              <Pause className="size-4" />
            ) : (
              <Play className="size-4 ml-0.5" />
            )}
            {/* Spinning Needle / Audio Active Beacon */}
            {isPlaying && (
              <span className="absolute -top-1 -right-1 size-2 rounded-full bg-red-600 animate-ping" />
            )}
          </motion.button>
        ) : null}
      </div>

      {/* 6. Aged Newspaper Headline & Snippet Clipping */}
      <div className="border-b-2 border-ink bg-[#ece3d1] p-3 select-none">
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-ink-soft">
          {musician.collage.newsHeadline}
        </p>
        <p className="mt-1 font-serif text-xs font-semibold leading-tight line-clamp-2 text-ink">
          {musician.collage.newsSnippet}
        </p>
      </div>

      {/* 7. Curatorial Content & Matrix Provenance Stamp */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            {musician.honorific}
          </p>
          <h3 className="mt-1 font-serif text-2xl font-bold leading-tight text-ink">
            {musician.name}
          </h3>
          <p className="mt-1 font-serif text-sm italic text-ink">
            “{musician.hitTrack}”{' '}
            <span className="not-italic text-ink-soft">— {musician.album}</span>
          </p>

          <p className="mt-3 border-l-2 border-specimen pl-2.5 font-serif text-xs italic leading-snug text-ink-soft line-clamp-3">
            “{musician.quote}”
          </p>
        </div>

        {/* Matrix Catalog & Pressing Plant Coordinates */}
        <div className="mt-4 border-t border-ink/20 pt-3">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em]">
            <span className="text-ink-soft">Matrix:</span>
            <span className="font-semibold text-ink">{musician.catalogNumber}</span>
          </div>
          <div className="mt-1.5 flex items-start gap-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft">
            <MapPin className="size-3 shrink-0 mt-0.5 text-ink-soft" />
            <span className="truncate">{musician.pressingPlant}</span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

