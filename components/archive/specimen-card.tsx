'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { MusicianRecord } from '@/lib/musicians'
import { fallbackImage } from '@/lib/archive'
import { ArchiveImage } from './archive-image'
import { AudioSample } from './audio-sample'

type SpecimenCardProps = {
  record: MusicianRecord
  total: number
  isPlaying?: boolean
  onTogglePlay?: () => void
}

export function SpecimenCard({ record, total, isPlaying, onTogglePlay }: SpecimenCardProps) {
  const reduceMotion = useReducedMotion()
  const fallback = fallbackImage(record)
  const spinSeconds = ((60 / record.bpm) * 8).toFixed(2)

  return (
    <div className="relative mx-auto w-full max-w-[34rem] pt-10 sm:pt-14 lg:max-w-none">
      {/* Vinyl peeks out from behind the card; rotation speed is derived from the record's BPM. */}
      {/* <div
        aria-hidden
        className="vinyl-spin vinyl-grooves absolute -top-2 right-[-6%] z-0 aspect-square w-[62%] rounded-full shadow-[0_10px_30px_rgba(18,17,16,0.35)] sm:-top-4"
        style={{ ['--spin' as string]: `${spinSeconds}s` }}
      >
        <div className="absolute inset-[33%] flex items-center justify-center rounded-full bg-specimen text-on-specimen transition-colors duration-500">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] sm:text-[11px]">
            {record.index} / {total.toString().padStart(2, '0')}
          </span>
          <span className="absolute size-2 rounded-full bg-ink" />
        </div>
      </div> */}

      <AnimatePresence mode="wait">
        <motion.article
          key={record.id}
          aria-labelledby="specimen-name"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: reduceMotion ? 0 : -1.5 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16, rotate: 2 }}
          whileHover={reduceMotion ? undefined : { rotate: 0, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="group relative z-10 border-2 border-ink bg-paper-bright shadow-[10px_10px_0_0_var(--ink)]"
        >
          <header className="flex items-center justify-between bg-ink px-4 py-2.5 text-paper">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em]">
              Specimen {record.index}
            </p>
            <p className="truncate pl-4 font-mono text-[11px] uppercase tracking-[0.14em]">
              {record.badgeText.split('//')[0].trim()}
            </p>
          </header>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-ink bg-ink sm:aspect-[3/3]">
              <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                <ArchiveImage
                  key={record.collage.heroImg}
                  src={record.collage.heroImg}
                  fallbackSrc={fallback}
                  alt={`Archival portrait of ${record.name}`}
                  priority
                  className="contrast-125 grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                />
              </div>
              {/* Duotone wash — lifts on hover to reveal the original print. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-specimen mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"
              />

              <p
                aria-hidden
                className="absolute -left-2 top-5 -rotate-3 bg-paper/90 px-5 py-1.5 font-serif text-lg italic text-ink shadow-sm sm:text-xl"
              >
                {record.collage.tapeNote}
              </p>

              <p
                aria-hidden
                className="absolute bottom-3 right-4 font-serif text-[clamp(4.5rem,14vw,9rem)] font-black leading-none text-paper mix-blend-difference"
              >
                {record.index}
              </p>

              <figure className="absolute bottom-4 left-4 hidden w-28 rotate-[-6deg] border-[6px] border-b-[18px] border-paper-bright bg-paper-bright shadow-lg transition-transform duration-500 group-hover:rotate-[-2deg] sm:block lg:w-32">
                <div className="aspect-square overflow-hidden">
                  <ArchiveImage
                    key={record.collage.stageImg}
                    src={record.collage.stageImg}
                    fallbackSrc={fallback}
                    alt={`${record.name} on stage`}
                    className="grayscale"
                  />
                </div>
                <figcaption className="sr-only">Stage photograph</figcaption>
              </figure>
            </div>

            <aside
              aria-label="Press clipping"
              className="relative mx-4 -mt-6 rotate-1 border border-ink bg-[#e9dfc9] p-3 shadow-md transition-transform duration-500 group-hover:rotate-0 sm:absolute sm:-right-6 sm:bottom-10 sm:mx-0 sm:mt-0 sm:w-56 lg:-right-8 xl:w-64"
            >
              <p className="border-b border-ink pb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                {record.collage.newsHeadline}
              </p>
              <p className="pt-2 font-serif text-sm font-semibold leading-snug">
                {record.collage.newsSnippet}
              </p>
            </aside>
          </div>

          <div className="px-4 pb-4 pt-4 sm:px-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">{record.honorific}</p>
            <h2 id="specimen-name" className="mt-1 text-balance font-serif text-3xl font-bold leading-[0.95] sm:text-4xl">
              {record.name}
            </h2>
            <p className="mt-1 font-serif text-lg italic">
              {'“'}
              {record.hitTrack}
              {'”'} <span className="not-italic text-ink-soft">— {record.album}</span>
            </p>

            <dl className="mt-2 grid grid-cols-3 border-l-2 border-t-2 border-ink">
              {[
                ['Year', record.releaseYear],
                ['BPM', record.bpm],
                ['Decade', record.decade],
                ['Genre', record.genre],
                ['Cat. No.', record.catalogNumber],
              ].map(([label, value], i) => (
                <div
                  key={label}
                  className={`border-b-2 border-r-2 border-ink px-3 py-2 ${i >= 3 ? 'col-span-3 sm:col-span-1 sm:[&:nth-child(5)]:col-span-2' : ''}`}
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">{label}</dt>
                  <dd className="mt-0.5 font-mono text-sm font-semibold uppercase">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
              <p className="max-w-[22rem] font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-ink-soft">
                <span className="text-ink">Pressed at:</span> {record.pressingPlant}
              </p>
              {record.audio ? (
                <AudioSample
                  key={record.id}
                  src={record.audio}
                  track={record.hitTrack}
                  isPlaying={isPlaying}
                  onTogglePlay={onTogglePlay}
                />
              ) : null}
            </div>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  )
}
