'use client'

import { motion, useReducedMotion } from 'motion/react'

interface PolyRhythmEqualizerProps {
  bpm: number
  isPlaying: boolean
  barCount?: number
  className?: string
  barClassName?: string
}

// Prime rhythm poly-rhythmic ratios authentic to West African drumming counterpoints
// (talking drum, sekere, highlife horns, bassline pulse)
const POLY_RATIOS = [0.25, 0.5, 0.75, 1.0, 1.33, 0.66, 0.5] as const
const PEAK_HEIGHTS = ['85%', '100%', '65%', '95%', '70%', '90%', '60%'] as const

export function PolyRhythmEqualizer({
  bpm,
  isPlaying,
  barCount = 6,
  className = 'h-4',
  barClassName = 'w-1 bg-ink',
}: PolyRhythmEqualizerProps) {
  const shouldReduceMotion = useReducedMotion()

  // Dynamic beat duration calculated from the record's primary tempo
  // beatDuration = 60 / BPM (e.g. 132 BPM => ~0.45s; 76 BPM => ~0.79s)
  const beatDuration = Math.max(0.3, 60 / Math.max(bpm, 60))

  const bars = Array.from({ length: Math.min(barCount, POLY_RATIOS.length) })

  return (
    <div
      aria-hidden="true"
      className={`flex items-end gap-1 select-none ${className}`}
      title={`Poly-rhythmic frequency meter (${bpm} BPM)`}
    >
      {bars.map((_, i) => {
        const ratio = POLY_RATIOS[i % POLY_RATIOS.length]
        const peak = PEAK_HEIGHTS[i % PEAK_HEIGHTS.length]
        const duration = beatDuration * ratio

        return (
          <motion.span
            key={i}
            className={`origin-bottom rounded-xs ${barClassName}`}
            animate={
              shouldReduceMotion
                ? { height: isPlaying ? '70%' : '25%', opacity: isPlaying ? 1 : 0.5 }
                : isPlaying
                ? {
                    height: ['20%', peak, '28%'],
                    opacity: [0.75, 1, 0.85],
                  }
                : {
                    height: `${((i % 4) + 1) * 22}%`,
                    opacity: 0.5,
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.1 }
                : isPlaying
                ? {
                    duration: Math.max(0.2, duration),
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                    delay: i * 0.05,
                  }
                : { duration: 0.3, ease: 'easeOut' }
            }
          />
        )
      })}
    </div>
  )
}

