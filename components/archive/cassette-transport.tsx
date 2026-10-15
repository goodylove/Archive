'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Play, Pause, Square, Disc, MapPin } from 'lucide-react'
import type { MusicianRecord } from '@/lib/musicians'
import { PolyRhythmEqualizer } from './poly-rhythm-equalizer'

interface CassetteTransportProps {
  record: MusicianRecord | null
  isPlaying: boolean
  onTogglePlay: () => void
  onStop: () => void
}

const MECHANICAL_EASE = [0.16, 1, 0.3, 1] as const

export function CassetteTransport({
  record,
  isPlaying,
  onTogglePlay,
  onStop,
}: CassetteTransportProps) {
  const shouldReduceMotion = useReducedMotion()

  if (!record || !record.audio) return null

  // Calculate reel spin duration mapped to track BPM
  const reelSpinDuration = Math.max(1.8, (60 / record.bpm) * 3)

  return (
    <motion.aside
      role="region"
      aria-label="Analog Cassette Master Transport"
      initial={shouldReduceMotion ? { opacity: 0 } : { y: '120%', opacity: 0 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1 }
          : {
              y: '0%',
              opacity: 1,
              // Physical needle drop / cassette latch click frame shake
              x: [0, -3, 3, -2, 2, 0],
            }
      }
      exit={shouldReduceMotion ? { opacity: 0 } : { y: '120%', opacity: 0 }}
      transition={{
        duration: 0.45,
        ease: MECHANICAL_EASE,
        x: { duration: 0.22, ease: 'easeOut' },
      }}
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl border-2 border-ink bg-paper-bright p-3 shadow-[8px_8px_0_0_var(--ink)] sm:p-4 select-none"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Cassette Tape Reels & Pioneer Info */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Dual Analog Cassette Spools */}
          <div className="flex items-center gap-1.5 border-2 border-ink bg-paper p-1.5 shadow-[2px_2px_0_0_var(--ink)]">
            {/* Supply Reel */}
            <motion.div
              aria-hidden="true"
              className="relative size-6 sm:size-7 rounded-full border border-ink/80 flex items-center justify-center bg-ink/10"
              animate={
                isPlaying && !shouldReduceMotion
                  ? { rotate: 360 }
                  : { rotate: 0 }
              }
              transition={{
                duration: reelSpinDuration,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div className="size-2 rounded-full bg-ink" />
              {/* Spoke Teeth */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-[1.5px] bg-ink/40" />
                <div className="w-full h-[1.5px] bg-ink/40 absolute" />
              </div>
            </motion.div>

            {/* Tape Bridge */}
            <div className="h-[2px] w-3 sm:w-4 bg-ink/60" />

            {/* Take-up Reel */}
            <motion.div
              aria-hidden="true"
              className="relative size-6 sm:size-7 rounded-full border border-ink/80 flex items-center justify-center bg-ink/10"
              animate={
                isPlaying && !shouldReduceMotion
                  ? { rotate: 360 }
                  : { rotate: 0 }
              }
              transition={{
                duration: reelSpinDuration,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div className="size-2 rounded-full bg-ink" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-[1.5px] bg-ink/40" />
                <div className="w-full h-[1.5px] bg-ink/40 absolute" />
              </div>
            </motion.div>
          </div>

          {/* Master Tape Metadata */}
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-red-600 animate-ping" />
              <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">
                TAPE TRANSPORT LATCHED // {record.bpm} BPM
              </span>
            </div>
            <h4 className="font-serif text-sm sm:text-base font-bold text-ink leading-tight">
              {record.name}
              <span className="font-normal italic text-ink-soft"> — “{record.hitTrack}”</span>
            </h4>
            <p className="hidden sm:block font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft/80">
              {record.catalogNumber} · {record.pressingPlant.split(',')[0]}
            </p>
          </div>
        </div>

        {/* Center / Right: Poly-Rhythmic Equalizer & Mechanical Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-5 border-t border-ink/20 pt-2 sm:border-t-0 sm:pt-0">
          {/* Real-time BPM-Driven Poly-Rhythm Equalizer */}
          <div className="flex items-center gap-2 border border-ink/30 bg-paper px-2.5 py-1.5 shadow-xs">
            <span className="hidden md:inline font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft">
              VU FREQ:
            </span>
            <PolyRhythmEqualizer
              bpm={record.bpm}
              isPlaying={isPlaying}
              barCount={7}
              className="h-5"
              barClassName="w-1 bg-ink"
            />
          </div>

          {/* Tactile Transport Buttons */}
          <div className="flex items-center gap-2">
            {/* Play / Pause Toggle Button */}
            <motion.button
              type="button"
              onClick={onTogglePlay}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.06, x: -1, y: -1 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.92, x: 1, y: 1 }}
              transition={{ duration: 0.15, ease: MECHANICAL_EASE }}
              aria-label={isPlaying ? 'Pause tape transport' : 'Resume tape transport'}
              className="flex size-9 sm:size-10 items-center justify-center border-2 border-ink bg-ink text-paper shadow-[2px_2px_0_0_var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink cursor-pointer hover:bg-ink-soft"
            >
              {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
            </motion.button>

            {/* Eject / Stop Button */}
            <motion.button
              type="button"
              onClick={onStop}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.06, x: -1, y: -1 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.92, x: 1, y: 1 }}
              transition={{ duration: 0.15, ease: MECHANICAL_EASE }}
              aria-label="Stop and unlatch tape carriage"
              className="flex items-center gap-1.5 border-2 border-ink bg-paper-bright px-3 py-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.16em] text-ink shadow-[2px_2px_0_0_var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink cursor-pointer hover:bg-[#e7dcc6]"
            >
              <Square className="size-3 fill-ink" />
              <span>Eject</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}

