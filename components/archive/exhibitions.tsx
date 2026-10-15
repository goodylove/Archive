'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Disc, Play, Pause, ArrowUpRight, Filter, MapPin } from 'lucide-react'
import { LEGENDARY_MUSICIANS, type MusicianRecord } from '@/lib/musicians'
import { DossierCard } from './dossier-card'
import { useArchiveAudio } from './audio-context'

const DECADES = ['All', '1960s', '1970s', '1980s']
const GENRES = ['All Genres', 'Afrobeat', 'Highlife', 'Afro-Jùjú', 'Roots Reggae']

const PRESSING_PLANTS = [
  {
    name: 'CBS Records Nigeria Pressing Plant',
    location: 'Ikeja, Lagos',
    coordinates: '6.6018° N, 3.3515° E',
    landmark: 'Ace (Sir Shina Peters, 1989)',
    notes: 'Automated hydraulic vinyl presses capable of 20,000 units/day during the 1989 Shina Mania.',
  },
  {
    name: 'Tabansi Records Pressing Plant',
    location: 'Onitsha, Anambra State',
    coordinates: '6.1511° N, 6.7856° E',
    landmark: 'Prisoner of Conscience (Majek Fashek, 1988)',
    notes: 'Eastern Nigeria’s premier independent pressing house, self-sufficient lacquer mastering lathe.',
  },
  {
    name: 'EMI Studios / NEMI Wharf Road',
    location: 'Apapa, Lagos',
    coordinates: '6.4474° N, 3.3667° E',
    landmark: 'Roforofo Fight (Fela Kuti, 1972)',
    notes: 'State-of-the-art 16-track analog recording desk and high-density vinyl stamper foundry.',
  },
  {
    name: 'Philips West African Records',
    location: 'Lagos Island, Lagos',
    coordinates: '6.4549° N, 3.3888° E',
    landmark: 'Joromi (Sir Victor Uwaifo, 1969)',
    notes: 'Pioneered first commercial gold disc certification in West African recorded music history.',
  },
  {
    name: 'Polygram Records Nigeria',
    location: 'Lagos',
    coordinates: '6.5244° N, 3.3792° E',
    landmark: 'Osondi Owendi (Osadebe, 1984) / One Love (Onwenu, 1986)',
    notes: 'Synthesizer-era high-definition pressing facility for nationwide crossover masterings.',
  },
]

export function Exhibitions() {
  const [selectedDecade, setSelectedDecade] = useState('All')
  const [selectedGenre, setSelectedGenre] = useState('All Genres')
  const { activeTrackId, toggleTrack } = useArchiveAudio()
  const playingId = activeTrackId

  const filteredMusicians = LEGENDARY_MUSICIANS.filter((m) => {
    const matchesDecade = selectedDecade === 'All' || m.decade === selectedDecade
    const matchesGenre =
      selectedGenre === 'All Genres' ||
      m.genre.toLowerCase().includes(selectedGenre.toLowerCase().replace('roots ', ''))
    return matchesDecade && matchesGenre
  })

  function toggleAudio(id: string) {
    const musician = LEGENDARY_MUSICIANS.find((m) => m.id === id)
    if (musician) {
      toggleTrack(musician, 'exhibitions')
    }
  }

  return (
    <section
      id="exhibitions"
      aria-labelledby="exhibitions-heading"
      className="relative z-10 border-b-2 border-ink bg-paper py-16 sm:py-20 lg:py-24 scroll-mt-8"
    >
      <div className="mx-auto max-w-[2200px] px-5 sm:px-8 lg:px-12">
        {/* Curatorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border-b-2 border-ink pb-8"
        >
          <motion.div
            initial={{ scale: 1.06, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft sm:text-xs"
          >
            <span className="flex items-center gap-2">
              <span className="inline-block size-2 bg-ink" />
              EXHIBITION NO. 01 · CURATORIAL SELECTION
            </span>
            <span>LAGOS · ONITSHA · BENIN · APAPA</span>
          </motion.div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8 overflow-hidden">
              <motion.h2
                id="exhibitions-heading"
                initial={{ clipPath: 'inset(0 0 100% 0)', y: 40, opacity: 0 }}
                whileInView={{ clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[clamp(2.5rem,5.5vw,6rem)] font-black uppercase leading-[0.9] tracking-[-0.03em]"
              >
                The Archive.
                <span className="block text-ink-soft [font-variation-settings:'opsz'_144,'SOFT'_100,'WONK'_1]">
                  Pressing Plants & Master Tapes
                </span>
              </motion.h2>
            </div>
            <div className="lg:col-span-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-base leading-relaxed text-ink-soft sm:text-lg"
              >
                Before the digital era, Nigeria operated the most prolific independent vinyl pressing
                industry in the Global South. From the steam presses of Ikeja to the lacquer lathes of Onitsha,
                these primary pressings forged modern African sound.
              </motion.p>
            </div>
          </div>

          {/* Interactive Filter Matrix */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink pt-6">
            <div role="tablist" aria-label="Filter specimens by decade" className="flex flex-wrap items-center gap-2">
              <span className="mr-2 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                <Filter className="size-3.5" aria-hidden="true" /> Decade:
              </span>
              {DECADES.map((decade) => {
                const active = selectedDecade === decade
                return (
                  <button
                    key={decade}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`Filter by decade: ${decade}`}
                    onClick={() => setSelectedDecade(decade)}
                    className={`border-2 border-ink px-3 py-1 font-mono text-xs uppercase tracking-[0.16em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink cursor-pointer ${
                      active ? 'bg-ink text-paper' : 'bg-paper-bright hover:bg-[#e7dcc6]'
                    }`}
                  >
                    {decade}
                  </button>
                )
              })}
            </div>

            <div role="tablist" aria-label="Filter specimens by genre" className="flex flex-wrap items-center gap-2">
              <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                Genre:
              </span>
              {GENRES.map((genre) => {
                const active = selectedGenre === genre
                return (
                  <button
                    key={genre}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`Filter by genre: ${genre}`}
                    onClick={() => setSelectedGenre(genre)}
                    className={`border-2 border-ink px-3 py-1 font-mono text-xs uppercase tracking-[0.16em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink cursor-pointer ${
                      active ? 'bg-ink text-paper' : 'bg-paper-bright hover:bg-[#e7dcc6]'
                    }`}
                  >
                    {genre}
                  </button>
                )
              })}
            </div>

            <p aria-live="polite" className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
              Showing {filteredMusicians.length} of {LEGENDARY_MUSICIANS.length} Specimens
            </p>
          </div>
        </motion.div>

        {/* Exhibition Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredMusicians.map((musician) => (
              <DossierCard
                key={musician.id}
                musician={musician}
                isPlaying={playingId === musician.id}
                onTogglePlay={toggleAudio}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Industrial Pressing Plants Directory */}
        <div className="mt-20 border-2 border-ink bg-paper-bright p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
                Industrial Heritage
              </span>
              <h3 className="mt-1 font-serif text-3xl font-black uppercase sm:text-4xl">
                The Primary Pressing Plants of Nigeria
              </h3>
            </div>
            <p className="max-w-md font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
              Verified vinyl lacquer mastering & pressing matrices from 1969 to 1989
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PRESSING_PLANTS.map((plant, index) => (
              <motion.div
                key={plant.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, x: -2 }}
                className="flex flex-col justify-between border-2 border-ink bg-paper p-5 shadow-[4px_4px_0_0_var(--ink)] hover:shadow-[8px_8px_0_0_var(--ink)] transition-shadow cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-ink/30 pb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                    <span>Plant 0{index + 1}</span>
                    <span>{plant.coordinates}</span>
                  </div>
                  <h4 className="mt-3 font-serif text-lg font-bold leading-snug">{plant.name}</h4>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
                    📍 {plant.location}
                  </p>
                  <p className="mt-3 font-serif text-xs leading-relaxed text-ink/80">{plant.notes}</p>
                </div>

                <div className="mt-4 border-t border-ink/20 pt-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">
                    Key Pressing:
                  </p>
                  <p className="font-serif text-xs font-semibold">{plant.landmark}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

