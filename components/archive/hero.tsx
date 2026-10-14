'use client'

import { useState, useRef, useEffect, type CSSProperties } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { LEGENDARY_MUSICIANS } from '@/lib/musicians'
import { textOn } from '@/lib/archive'
import { SiteNav } from './site-nav'
import { SpecimenCard } from './specimen-card'
import { ArchiveMarquee } from './archive-marquee'

import { useArchiveAudio } from './audio-context'

const RECORDS = LEGENDARY_MUSICIANS
const YEARS = RECORDS.map((r) => r.releaseYear)
const FIRST_YEAR = Math.min(...YEARS)
const LAST_YEAR = Math.max(...YEARS)
// Default to Fela — the brief's reference specimen.
const INITIAL = Math.max(0, RECORDS.findIndex((r) => r.id === 'fela-kuti'))

export function Hero() {
  const [active, setActive] = useState(INITIAL)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const record = RECORDS[active]

  const {
    activeTrackId,
    isPlaying: isGlobalPlaying,
    origin: audioOrigin,
    playTrack,
    toggleTrack,
  } = useArchiveAudio()

  // Turntable needle drops and vinyl platter spins ONLY when this specific record is playing
  const isPlaying = isGlobalPlaying && activeTrackId === record.id

  const AUTO_ADVANCE_MS = 7000
  const spinSeconds = ((60 / record.bpm) * 8).toFixed(2)

  const go = (delta: number) => setActive((i) => (i + delta + RECORDS.length) % RECORDS.length)

  // Automatically cycle through musicians when not playing or hovered
  useEffect(() => {
    if (!isAutoPlay || isPlaying || isHovered) return

    const timer = setInterval(() => {
      setActive((i) => (i + 1) % RECORDS.length)
    }, AUTO_ADVANCE_MS)

    return () => clearInterval(timer)
  }, [isAutoPlay, isPlaying, isHovered, active])

  const togglePlay = () => {
    toggleTrack(record, 'hero')
  }

  // Switch audio track seamlessly when active specimen changes IF Hero was actively playing
  const prevActiveRef = useRef(active)
  useEffect(() => {
    if (prevActiveRef.current !== active) {
      prevActiveRef.current = active
      if (isGlobalPlaying && audioOrigin === 'hero') {
        playTrack(record, 'hero')
      }
    }
  }, [active, isGlobalPlaying, audioOrigin, playTrack, record])

  const themeVars = {
    '--accent-color': record.accentColor,
    '--accent-ink': textOn(record.accentColor),
  } as CSSProperties

  return (
    <div style={themeVars} className="flex min-h-[80vh] flex-col overflow-x-clip">
      <SiteNav />

      <main className="relative flex flex-1 flex-col">
        <section
          aria-labelledby="hero-title"
          className="relative mx-auto grid w-full max-w-[2200px] flex-1 grid-cols-1 gap-x-10 gap-y-14 px-5 pb-14 pt-8 sm:px-8 lg:grid-cols-12 lg:px-12 lg:pb-16 lg:pt-12"
        >
          {/* Running spine: the active record's provenance, set like a book's edge. */}
          <p
            aria-hidden
            className="pointer-events-none absolute left-2 top-1/2 hidden origin-center -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-ink-soft 2xl:block"
            style={{ left: '1.5rem' }}
          >
            {record.pressingPlant} — {record.catalogNumber}
          </p>

          <div className="relative z-10 flex flex-col lg:col-span-7">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b-2 border-ink pb-3 font-mono text-[11px] uppercase tracking-[0.2em] sm:text-xs">
              <span className="bg-ink px-2 py-1 text-paper">Vol. I</span>
              <span>Sonic Architecture</span>
              <span aria-label={`${FIRST_YEAR} to ${LAST_YEAR}`}>
                {FIRST_YEAR} → {LAST_YEAR}
              </span>
              <span className="text-ink-soft">6.5244° N, 3.3792° E</span>
            </div>

            <h1
              id="hero-title"
              className="mt-8 font-serif text-[clamp(3.4rem,8.6vw,13.5rem)] font-black uppercase leading-[0.84] tracking-[-0.035em] [word-spacing:0.14em] [font-variation-settings:'opsz'_144,'SOFT'_30]"
            >
              <span className="block">The pulse</span>
              <span className="block pl-[0.6em]">of the</span>
              <span className="mt-2 inline-flex items-baseline gap-4">
                <span className="relative inline-block bg-specimen px-[0.12em] pb-[0.06em] lowercase italic text-on-specimen transition-colors duration-500 [font-variation-settings:'opsz'_144,'SOFT'_100,'WONK'_1]">
                  soil.
                </span>
                <span
                  aria-hidden
                  className="hidden font-mono text-xs font-normal normal-case tracking-[0.18em] sm:inline"
                >
                  fig. {record.index}
                </span>
              </span>
            </h1>

            {/* Midsection: Editorial Description, Archival Quote & Interactive Turntable Deck */}
            <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-6 lg:gap-x-8 xl:gap-x-10 items-center">
              {/* Description & Archival Quote Column */}
              <div className="md:col-span-7 xl:col-span-7 flex flex-col gap-6 sm:gap-7">
                <p className="max-w-[34ch] text-pretty font-serif text-lg sm:text-xl xl:text-2xl leading-snug">
                  Documenting the sonic architecture of Nigeria. A digital museum of Highlife, Afrobeat, and
                  Afro-Jùjú.
                </p>

                <figure aria-live="polite" className="border-l-4 border-specimen pl-4 transition-colors duration-500">
                  <blockquote className="font-serif text-base sm:text-lg italic leading-snug text-pretty">
                    {'“'}
                    {record.quote}
                    {'”'}
                  </blockquote>
                  <figcaption className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
                    — {record.quoteAttribution}
                  </figcaption>
                </figure>
              </div>

              {/* Interactive Vinyl Record & Analog Audiophile Tonearm Column */}
              <div className="md:col-span-5 xl:col-span-5 flex justify-center md:justify-end py-2 sm:py-4 md:py-0">
                <div
                  className="group/turntable relative aspect-square w-52 sm:w-60 md:w-56 lg:w-64 xl:w-72 2xl:w-80 cursor-pointer select-none transition-transform duration-300 hover:scale-[1.02]"
                  onClick={togglePlay}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      togglePlay()
                    }
                  }}
                  aria-label={`Interactive Turntable: ${isPlaying ? 'Pause' : 'Play'} ${record.hitTrack} by ${record.name}`}
                  title={isPlaying ? 'Click to lift needle (pause)' : 'Click to drop needle (play)'}
                >
                  {/* Vinyl Platter Disc */}
                  <div
                    aria-hidden
                    className={cn(
                      'vinyl-grooves relative aspect-square w-full rounded-full shadow-[0_16px_40px_rgba(18,17,16,0.45)] border border-[#2b2724] transition-all',
                      isPlaying
                        ? 'vinyl-spin'
                        : 'vinyl-spin [animation-play-state:paused] group-hover/turntable:[animation-play-state:running]'
                    )}
                    style={{ ['--spin' as string]: `${spinSeconds}s` }}
                  >
                    {/* Luster Sheen */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.15)_0%,transparent_48%),radial-gradient(ellipse_at_75%_80%,rgba(255,255,255,0.08)_0%,transparent_50%)]"
                    />

                    {/* Lead-in groove rim */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-[3%] rounded-full border border-ink/40"
                    />

                    {/* Run-out groove */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-[27%] rounded-full border border-ink/60 bg-[#161514]/90"
                    />

                    {/* Center Record Label */}
                    <div className="absolute inset-[32%] flex flex-col items-center justify-center rounded-full bg-specimen text-on-specimen shadow-inner transition-colors duration-500 border border-ink/30 px-2 text-center">
                      <span className="font-mono text-[8px] sm:text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.16em] truncate max-w-full leading-tight">
                        {record.index} / {String(RECORDS.length).padStart(2, '0')}
                      </span>

                      {/* Turntable Spindle Hole */}
                      <span className="relative my-0.5 sm:my-1 flex size-2.5 sm:size-3 items-center justify-center rounded-full bg-ink border border-paper/40 shadow-sm">
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
                    className="pointer-events-none absolute -top-[14%] -right-[12%] z-20 w-[64%] aspect-[150/220]"
                  >
                    <svg
                      viewBox="0 0 150 220"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-full w-full drop-shadow-[0_8px_18px_rgba(18,17,16,0.38)]"
                    >
                      {/* Tonearm Base / Gimbal Turret (Fixed Mount) */}
                      <g id="tonearm-base">
                        <circle cx="118" cy="36" r="22" fill="#1e1c1a" stroke="var(--ink)" strokeWidth="2.5" />
                        <circle cx="118" cy="36" r="17" fill="#2d2925" stroke="#4a433c" strokeWidth="1" />
                        <circle cx="118" cy="36" r="11" fill="#121110" stroke="var(--accent-color)" strokeWidth="1.5" />
                        <circle cx="118" cy="36" r="4.5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />
                        <circle cx="118" cy="36" r="1.5" fill="var(--ink)" />
                        {/* Anti-skate dial */}
                        <line x1="102" y1="26" x2="100" y2="24" stroke="#8a8073" strokeWidth="1" />
                        <line x1="104" y1="22" x2="102" y2="19" stroke="#8a8073" strokeWidth="1" />
                        <line x1="108" y1="18" x2="107" y2="15" stroke="#8a8073" strokeWidth="1" />
                        {/* Cueing lever */}
                        <line x1="98" y1="44" x2="88" y2="52" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="87" cy="53" r="2" fill="var(--accent-color)" />
                      </g>

                      {/* Pivoting Tonearm Wand + Counterweight + Cartridge */}
                      <motion.g
                        id="tonearm-wand"
                        initial={false}
                        animate={{
                          rotate: isPlaying ? 16 : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                        style={{ transformOrigin: '118px 36px' }}
                      >
                        {/* Counterweight Stub */}
                        <line x1="118" y1="36" x2="136" y2="18" stroke="var(--ink)" strokeWidth="4.5" strokeLinecap="round" />
                        <g transform="translate(132, 14) rotate(-45)">
                          <rect x="-5" y="-9" width="10" height="18" rx="2" fill="#2b2724" stroke="var(--ink)" strokeWidth="2" />
                          <line x1="-5" y1="-3" x2="5" y2="-3" stroke="#8a8073" strokeWidth="1" />
                          <line x1="-5" y1="0" x2="5" y2="0" stroke="var(--paper)" strokeWidth="1.2" />
                          <line x1="-5" y1="3" x2="5" y2="3" stroke="#8a8073" strokeWidth="1" />
                        </g>

                        {/* Classic S-Curve Wand */}
                        <path
                          d="M 118 36 C 96 74, 76 112, 68 146 C 62 168, 52 182, 42 198"
                          fill="none"
                          stroke="var(--ink)"
                          strokeWidth="4.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 118 36 C 96 74, 76 112, 68 146 C 62 168, 52 182, 42 198"
                          fill="none"
                          stroke="#e2dbcb"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                        />

                        <circle cx="42" cy="198" r="3.5" fill="var(--ink)" stroke="#e2dbcb" strokeWidth="1" />

                        {/* Perforated Headshell & Cartridge */}
                        <g transform="translate(42, 198) rotate(22)">
                          <polygon
                            points="-3,0 4,-2 10,22 1,25 -5,14"
                            fill="#1e1c1a"
                            stroke="var(--ink)"
                            strokeWidth="1.5"
                          />
                          <line x1="1" y1="6" x2="4" y2="6" stroke="#4a433c" strokeWidth="1" />
                          <line x1="2" y1="11" x2="5" y2="11" stroke="#4a433c" strokeWidth="1" />
                          <line x1="3" y1="16" x2="6" y2="16" stroke="#4a433c" strokeWidth="1" />

                          {/* Finger lift hook */}
                          <path
                            d="M 5 2 C 10 2, 14 6, 12 11"
                            fill="none"
                            stroke="var(--ink)"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                          />

                          {/* Cartridge */}
                          <rect x="-2" y="16" width="7" height="9" rx="1" fill="var(--ink)" stroke="var(--accent-color)" strokeWidth="1" />

                          {/* Stylus needle */}
                          <line x1="1.5" y1="25" x2="1" y2="29" stroke="var(--paper)" strokeWidth="1.5" strokeLinecap="round" />
                          <circle cx="1" cy="29.5" r="1.5" fill="var(--accent-color)" />

                          {/* Active tracking indicator */}
                          {isPlaying ? (
                            <circle cx="1" cy="29.5" r="4" fill="var(--accent-color)" opacity="0.5" className="animate-ping" />
                          ) : null}
                        </g>
                      </motion.g>
                    </svg>
                  </div>

                  {/* Interactive Cue Status Badge */}
                  <div className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap border border-ink bg-paper-bright px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink shadow-[2px_2px_0_0_var(--ink)] opacity-0 transition-opacity duration-300 group-hover/turntable:opacity-100 sm:opacity-100">
                    <span
                      className="inline-block size-1.5 rounded-full mr-1.5 align-middle"
                      style={{ backgroundColor: isPlaying ? 'var(--accent-color)' : '#8a8073' }}
                    />
                    {isPlaying ? 'Now playing sample' : 'Click to drop needle'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-5 pt-12">
              <a
                href="#exhibitions"
                className="group/cta relative inline-flex items-center border-2 border-ink bg-ink px-6 py-4 font-mono text-sm font-semibold uppercase tracking-[0.22em] text-paper shadow-[6px_6px_0_0_var(--accent-color)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0_0_var(--accent-color)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:text-base"
              >
                <span aria-hidden>[&nbsp;</span>
                Enter the archive
                <span aria-hidden>&nbsp;]</span>
                <ArrowRight
                  aria-hidden
                  className="ml-3 size-4 transition-transform group-hover/cta:translate-x-1"
                />
              </a>
              <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-ink-soft">
                {RECORDS.length} specimens · {new Set(RECORDS.map((r) => r.decade)).size} decades
                <br />
                Verified against primary pressings
              </p>
            </div>
          </div>

          <div
            className="relative flex flex-col lg:col-span-5 lg:-ml-6 xl:-ml-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <SpecimenCard
              record={record}
              total={RECORDS.length}
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
            />

            <div className="mt-8 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.18em]">
              <button
                type="button"
                onClick={() => go(-1)}
                className="inline-flex items-center gap-2 border-2 border-ink px-3 py-2 transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink cursor-pointer"
              >
                <ArrowLeft aria-hidden className="size-4" />
                Prev
              </button>

              <div className="flex flex-col items-center gap-1.5">
                <p aria-live="polite" className="text-center">
                  <span className="sr-only">Now showing </span>
                  {record.index} <span className="text-ink-soft">/ {String(RECORDS.length).padStart(2, '0')}</span>
                  <span className="sr-only">: {record.name}</span>
                </p>

                {/* Auto-rotation linear progress ticker */}
                <div className="relative h-1 w-20 overflow-hidden bg-ink/10 border border-ink/20">
                  <motion.div
                    key={`${active}-${!isPlaying && !isHovered && isAutoPlay}`}
                    initial={{ width: '0%' }}
                    animate={{ width: !isPlaying && !isHovered && isAutoPlay ? '100%' : '0%' }}
                    transition={{
                      duration: !isPlaying && !isHovered && isAutoPlay ? 7 : 0,
                      ease: 'linear',
                    }}
                    className="h-full bg-specimen transition-colors duration-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setIsAutoPlay((a) => !a)}
                  className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft hover:text-ink transition-colors cursor-pointer"
                  title="Toggle automatic specimen slideshow"
                >
                  {isAutoPlay ? (isHovered ? 'Paused' : isPlaying ? 'Playing' : 'Auto: On') : 'Auto: Off'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => go(1)}
                className="inline-flex items-center gap-2 border-2 border-ink px-3 py-2 transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink cursor-pointer"
              >
                Next
                <ArrowRight aria-hidden className="size-4" />
              </button>
            </div>
          </div>
        </section>

        <ArchiveMarquee />
        {/* <SpecimenIndex records={RECORDS} activeIndex={active} onSelect={setActive} /> */}
      </main>
    </div>
  )
}
