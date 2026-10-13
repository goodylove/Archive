'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { MusicianRecord } from '@/lib/musicians'

type VinylTonearmProps = {
  record: MusicianRecord
  total: number
  isPlaying?: boolean
  onTogglePlay?: () => void
}

export function VinylTonearm({
  record,
  total,
  isPlaying = false,
  onTogglePlay,
}: VinylTonearmProps) {
  const reduceMotion = useReducedMotion()
  const spinSeconds = ((60 / record.bpm) * 8).toFixed(2)

  return (
    <div
      className="pointer-events-auto relative select-none"
      onClick={onTogglePlay}
      role={onTogglePlay ? 'button' : undefined}
      tabIndex={onTogglePlay ? 0 : undefined}
      onKeyDown={(e) => {
        if (onTogglePlay && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onTogglePlay()
        }
      }}
      aria-label={`Vinyl record for ${record.name}: ${record.hitTrack}. Click to toggle playback.`}
      title={onTogglePlay ? (isPlaying ? 'Pause sample' : 'Play sample') : undefined}
    >
      {/* Vinyl Disc Platter */}
      <div
        aria-hidden
        className="vinyl-spin vinyl-grooves relative aspect-square w-full rounded-full shadow-[0_18px_45px_rgba(18,17,16,0.45)] border border-[#262320]"
        style={{ ['--spin' as string]: `${spinSeconds}s` }}
      >
        {/* Subtle analog vinyl luster & reflection */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.15)_0%,transparent_48%),radial-gradient(ellipse_at_75%_80%,rgba(255,255,255,0.08)_0%,transparent_50%)]"
        />

        {/* Lead-in groove rim */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[3%] rounded-full border border-ink/40"
        />

        {/* Inner run-out groove area */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[27%] rounded-full border border-ink/60 bg-[#161514]/90"
        />

        {/* Center Record Label */}
        <div className="absolute inset-[32%] flex flex-col items-center justify-center rounded-full bg-specimen text-on-specimen shadow-inner transition-colors duration-500 border border-ink/30 px-2 text-center">
          <span className="font-mono text-[8px] sm:text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.16em] truncate max-w-full leading-tight">
            {record.index} / {total.toString().padStart(2, '0')}
          </span>

          {/* Turntable Spindle Hole */}
          <span className="relative my-0.5 sm:my-1 flex size-3 items-center justify-center rounded-full bg-ink border border-paper/40 shadow-sm">
            <span className="size-1 rounded-full bg-paper" />
          </span>

          <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-[0.12em] opacity-90 truncate max-w-full leading-tight">
            {record.bpm} BPM
          </span>
        </div>
      </div>

      {/* Analog Audiophile Tonearm Assembly */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 -right-6 sm:-top-10 sm:-right-8 lg:-top-11 lg:-right-9 xl:-top-12 xl:-right-10 z-20 w-[62%] aspect-[150/220]"
      >
        <svg
          viewBox="0 0 150 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full drop-shadow-[0_8px_16px_rgba(18,17,16,0.35)]"
        >
          {/* Tonearm Base / Gimbal Turret (Fixed Mount) */}
          <g id="tonearm-base">
            {/* Outer mounting chassis */}
            <circle cx="118" cy="36" r="22" fill="#1e1c1a" stroke="var(--ink)" strokeWidth="2.5" />
            <circle cx="118" cy="36" r="17" fill="#2d2925" stroke="#4a433c" strokeWidth="1" />
            {/* Gimbal bearing collar */}
            <circle cx="118" cy="36" r="11" fill="#121110" stroke="var(--accent-color)" strokeWidth="1.5" />
            {/* Pivot center jewel */}
            <circle cx="118" cy="36" r="4.5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />
            <circle cx="118" cy="36" r="1.5" fill="var(--ink)" />

            {/* Anti-skate dial / calibration marks */}
            <line x1="102" y1="26" x2="100" y2="24" stroke="#8a8073" strokeWidth="1" />
            <line x1="104" y1="22" x2="102" y2="19" stroke="#8a8073" strokeWidth="1" />
            <line x1="108" y1="18" x2="107" y2="15" stroke="#8a8073" strokeWidth="1" />

            {/* Cueing lift lever */}
            <line x1="98" y1="44" x2="88" y2="52" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="87" cy="53" r="2" fill="var(--accent-color)" />
          </g>

          {/* Pivoting Tonearm Wand + Counterweight + Headshell */}
          <motion.g
            id="tonearm-wand"
            initial={false}
            animate={
              reduceMotion
                ? undefined
                : {
                    rotate: isPlaying ? 5.5 : 0,
                  }
            }
            transition={{ type: 'spring', stiffness: 140, damping: 16 }}
            style={{ transformOrigin: '118px 36px' }}
          >
            {/* Rear Counterweight Stub */}
            <line x1="118" y1="36" x2="136" y2="18" stroke="var(--ink)" strokeWidth="4.5" strokeLinecap="round" />
            {/* Cylindrical Counterweight */}
            <g transform="translate(132, 14) rotate(-45)">
              <rect x="-5" y="-9" width="10" height="18" rx="2" fill="#2b2724" stroke="var(--ink)" strokeWidth="2" />
              {/* Gram markings on counterweight */}
              <line x1="-5" y1="-3" x2="5" y2="-3" stroke="#8a8073" strokeWidth="1" />
              <line x1="-5" y1="0" x2="5" y2="0" stroke="var(--paper)" strokeWidth="1.2" />
              <line x1="-5" y1="3" x2="5" y2="3" stroke="#8a8073" strokeWidth="1" />
            </g>

            {/* Main Tonearm S-Curve Wand */}
            {/* Base shadow stroke */}
            <path
              d="M 118 36 C 96 74, 76 112, 68 146 C 62 168, 52 182, 42 198"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Metallic chrome highlight stroke */}
            <path
              d="M 118 36 C 96 74, 76 112, 68 146 C 62 168, 52 182, 42 198"
              fill="none"
              stroke="#e2dbcb"
              strokeWidth="1.75"
              strokeLinecap="round"
            />

            {/* Headshell Connector Ring */}
            <circle cx="42" cy="198" r="3.5" fill="var(--ink)" stroke="#e2dbcb" strokeWidth="1" />

            {/* Classic Perforated Audiophile Headshell */}
            <g transform="translate(42, 198) rotate(22)">
              {/* Headshell chassis */}
              <polygon
                points="-3,0 4,-2 10,22 1,25 -5,14"
                fill="#1e1c1a"
                stroke="var(--ink)"
                strokeWidth="1.5"
              />
              {/* Headshell weight slots */}
              <line x1="1" y1="6" x2="4" y2="6" stroke="#4a433c" strokeWidth="1" />
              <line x1="2" y1="11" x2="5" y2="11" stroke="#4a433c" strokeWidth="1" />
              <line x1="3" y1="16" x2="6" y2="16" stroke="#4a433c" strokeWidth="1" />

              {/* Headshell finger lift hook */}
              <path
                d="M 5 2 C 10 2, 14 6, 12 11"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="1.75"
                strokeLinecap="round"
              />

              {/* Cartridge Body */}
              <rect x="-2" y="16" width="7" height="9" rx="1" fill="var(--ink)" stroke="var(--accent-color)" strokeWidth="1" />

              {/* Stylus Cantilever & Diamond Tip Needle */}
              <line x1="1.5" y1="25" x2="1" y2="29" stroke="var(--paper)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="1" cy="29.5" r="1.5" fill="var(--accent-color)" />

              {/* Stylus tracking active indicator */}
              {isPlaying ? (
                <circle cx="1" cy="29.5" r="3.5" fill="var(--accent-color)" opacity="0.4" className="animate-ping" />
              ) : null}
            </g>
          </motion.g>
        </svg>
      </div>
    </div>
  )
}

