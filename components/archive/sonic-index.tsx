'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Search,
  ArrowUpDown,
  Play,
  Pause,
  Disc3,
  SlidersHorizontal,
  MapPin,
  Sparkles,
  Volume2,
} from 'lucide-react'
import { LEGENDARY_MUSICIANS, type MusicianRecord } from '@/lib/musicians'
import { ArchiveImage } from './archive-image'
import { fallbackImage, textOn } from '@/lib/archive'
import { PolyRhythmEqualizer } from './poly-rhythm-equalizer'
import { CassetteTransport } from './cassette-transport'
import { useArchiveAudio } from './audio-context'

type SortField = 'year' | 'bpm' | 'index' | 'name'
type SortOrder = 'asc' | 'desc'

export function SonicIndex() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('year')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [selectedDecade, setSelectedDecade] = useState('All')
  const [hoveredMusician, setHoveredMusician] = useState<MusicianRecord | null>(null)

  const { activeTrack, activeTrackId, isPlaying, toggleTrack, stopTrack } = useArchiveAudio()
  const playingId = activeTrackId

  // Filter & sort entries
  const processedRecords = useMemo(() => {
    let records = [...LEGENDARY_MUSICIANS]

    // Decade filter
    if (selectedDecade !== 'All') {
      records = records.filter((m) => m.decade === selectedDecade)
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      records = records.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.hitTrack.toLowerCase().includes(q) ||
          m.album.toLowerCase().includes(q) ||
          m.genre.toLowerCase().includes(q) ||
          m.catalogNumber.toLowerCase().includes(q) ||
          m.pressingPlant.toLowerCase().includes(q) ||
          (m.honorific && m.honorific.toLowerCase().includes(q)),
      )
    }

    // Sort
    records.sort((a, b) => {
      let comparison = 0
      if (sortField === 'year') {
        comparison = a.releaseYear - b.releaseYear
      } else if (sortField === 'bpm') {
        comparison = a.bpm - b.bpm
      } else if (sortField === 'index') {
        comparison = parseInt(a.index, 10) - parseInt(b.index, 10)
      } else if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name)
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return records
  }, [searchQuery, sortField, sortOrder, selectedDecade])

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  function toggleAudio(id: string) {
    const musician = LEGENDARY_MUSICIANS.find((m) => m.id === id)
    if (musician) {
      toggleTrack(musician, 'index')
    }
  }

  return (
    <section
      id="index"
      aria-labelledby="index-heading"
      className="relative z-10 border-b-2 border-ink bg-paper py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[2200px] px-5 sm:px-8 lg:px-12">
        {/* Registry Masthead */}
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
              REGISTRY NO. NG-6989 · COMPLETE DISCOGRAPHIC LEDGER
            </span>
            <span>FORMAT: 12&quot; VINYL LACQUER MASTER</span>
          </motion.div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8 overflow-hidden">
              <motion.h2
                id="index-heading"
                initial={{ clipPath: 'inset(0 0 100% 0)', y: 40, opacity: 0 }}
                whileInView={{ clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[clamp(2.5rem,5.5vw,6rem)] font-black uppercase leading-[0.9] tracking-[-0.03em]"
              >
                The Master Index.
                <span className="block text-ink-soft [font-variation-settings:'opsz'_144,'SOFT'_100,'WONK'_1]">
                  Matrices, Tempos & Accessions
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
                Complete chronological ledger of primary discographic accessions. Every record has been
                cross-referenced against original pressing matrices, poly-rhythmic tempos, and regional tape lathes.
              </motion.p>
            </div>
          </div>

          {/* Analog Telemetry Readout Bar */}
          <div className="mt-10 grid grid-cols-2 border-t-2 border-ink pt-6 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            <div className="border-l-2 border-ink pl-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Registered Masters</p>
              <p className="font-serif text-2xl font-black text-ink">08 Specimens</p>
            </div>
            <div className="border-l-2 border-ink pl-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Chronological Span</p>
              <p className="font-serif text-2xl font-black text-ink">1969 — 1989</p>
            </div>
            <div className="border-l-2 border-ink pl-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Tempo Envelope</p>
              <p className="font-serif text-2xl font-black text-ink">76 — 132 BPM</p>
            </div>
            <div className="border-l-2 border-ink pl-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Pressing Lathes</p>
              <p className="font-serif text-2xl font-black text-ink">5 Industrial Sites</p>
            </div>
            <div className="hidden border-l-2 border-ink pl-3 lg:block">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Mastering Standard</p>
              <p className="font-serif text-2xl font-black text-ink">AAA Analog Lacquer</p>
            </div>
          </div>
        </motion.div>

        {/* Search, Filter & Sort Transport Controls */}
        <div className="mt-8 flex flex-col gap-4 border-b-2 border-ink pb-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by pioneer, track, matrix code, or plant..."
              className="w-full border-2 border-ink bg-paper-bright py-2.5 pl-10 pr-4 font-mono text-xs uppercase tracking-[0.12em] text-ink placeholder:text-ink-soft/60 focus:bg-paper focus:outline-none focus:ring-2 focus:ring-ink"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft hover:text-ink cursor-pointer"
              >
                [Clear]
              </button>
            )}
          </div>

          {/* Decade Filters & Sorting Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft mr-1">
                Decade:
              </span>
              {['All', '1960s', '1970s', '1980s'].map((decade) => {
                const active = selectedDecade === decade
                return (
                  <button
                    key={decade}
                    type="button"
                    onClick={() => setSelectedDecade(decade)}
                    className={`border-2 border-ink px-2.5 py-1 font-mono text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                      active ? 'bg-ink text-paper' : 'bg-paper-bright hover:bg-[#e7dcc6]'
                    }`}
                  >
                    {decade}
                  </button>
                )
              })}
            </div>

            <div className="h-6 w-[2px] bg-ink/30 hidden sm:block" />

            {/* Quick Sort Options */}
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft mr-1">
                Sort:
              </span>
              <button
                type="button"
                onClick={() => toggleSort('year')}
                className={`flex items-center gap-1 border-2 border-ink px-2.5 py-1 font-mono text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                  sortField === 'year' ? 'bg-ink text-paper' : 'bg-paper-bright hover:bg-[#e7dcc6]'
                }`}
              >
                Year {sortField === 'year' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button
                type="button"
                onClick={() => toggleSort('bpm')}
                className={`flex items-center gap-1 border-2 border-ink px-2.5 py-1 font-mono text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                  sortField === 'bpm' ? 'bg-ink text-paper' : 'bg-paper-bright hover:bg-[#e7dcc6]'
                }`}
              >
                BPM {sortField === 'bpm' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button
                type="button"
                onClick={() => toggleSort('name')}
                className={`flex items-center gap-1 border-2 border-ink px-2.5 py-1 font-mono text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                  sortField === 'name' ? 'bg-ink text-paper' : 'bg-paper-bright hover:bg-[#e7dcc6]'
                }`}
              >
                Artist {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Master Ledger Table (Desktop Layout) */}
        <div className="mt-8 hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse border-2 border-ink text-left font-mono">
            <thead>
              <tr className="border-b-2 border-ink bg-ink text-paper text-[11px] uppercase tracking-[0.18em]">
                <th className="py-3 px-4 w-24">Acc.</th>
                <th
                  onClick={() => toggleSort('year')}
                  className="py-3 px-4 w-28 cursor-pointer select-none hover:bg-ink/80"
                >
                  <span className="flex items-center gap-1">
                    Year {sortField === 'year' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                  </span>
                </th>
                <th
                  onClick={() => toggleSort('name')}
                  className="py-3 px-4 cursor-pointer select-none hover:bg-ink/80"
                >
                  <span className="flex items-center gap-1">
                    Pioneer / Creator {sortField === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                  </span>
                </th>
                <th className="py-3 px-4">Master Recording</th>
                <th className="py-3 px-4">Genre</th>
                <th
                  onClick={() => toggleSort('bpm')}
                  className="py-3 px-4 w-40 cursor-pointer select-none hover:bg-ink/80"
                >
                  <span className="flex items-center gap-1">
                    Tempo {sortField === 'bpm' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                  </span>
                </th>
                <th className="py-3 px-4">Matrix / Plant</th>
                <th className="py-3 px-4 w-36 text-right">Tape Transport</th>
              </tr>
            </thead>
            <tbody>
              {processedRecords.map((musician, idx) => {
                const isPlaying = playingId === musician.id
                const isHovered = hoveredMusician?.id === musician.id

                return (
                  <tr
                    key={musician.id}
                    onMouseEnter={() => setHoveredMusician(musician)}
                    onMouseLeave={() => setHoveredMusician(null)}
                    className={`border-b border-ink/40 transition-colors ${
                      isPlaying
                        ? 'bg-[#ece3d1]'
                        : idx % 2 === 0
                        ? 'bg-paper'
                        : 'bg-paper-bright'
                    } hover:bg-[#e7dcc6]`}
                  >
                    {/* Accession ID */}
                    <td className="py-4 px-4 font-mono text-xs font-bold text-ink-soft">
                      #{musician.index}
                    </td>

                    {/* Release Year */}
                    <td className="py-4 px-4">
                      <span className="border border-ink/40 bg-paper px-2 py-0.5 font-mono text-xs font-semibold">
                        {musician.releaseYear}
                      </span>
                    </td>

                    {/* Pioneer Name & Honorific */}
                    <td className="py-4 px-4">
                      <div className="font-serif text-lg font-bold text-ink">
                        {musician.name}
                      </div>
                      {musician.honorific && (
                        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                          {musician.honorific}
                        </div>
                      )}
                    </td>

                    {/* Hit Track & Landmark Album */}
                    <td className="py-4 px-4">
                      <div className="font-serif text-sm font-semibold italic text-ink">
                        “{musician.hitTrack}”
                      </div>
                      <div className="font-mono text-[11px] text-ink-soft">
                        {musician.album}
                      </div>
                    </td>

                    {/* Genre */}
                    <td className="py-4 px-4">
                      <span
                        className="inline-block border border-ink/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em]"
                        style={{
                          backgroundColor: `${musician.accentColor}18`,
                          borderColor: musician.accentColor,
                        }}
                      >
                        {musician.genre}
                      </span>
                    </td>

                    {/* BPM & Visualizer Pulse */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold">{musician.bpm} BPM</span>
                        <PolyRhythmEqualizer
                          bpm={musician.bpm}
                          isPlaying={isPlaying}
                          barCount={6}
                          className="h-3.5"
                          barClassName="w-1 bg-ink"
                        />
                      </div>
                    </td>

                    {/* Matrix Code & Pressing Plant */}
                    <td className="py-4 px-4">
                      <div className="font-mono text-[11px] font-semibold text-ink">
                        {musician.catalogNumber}
                      </div>
                      <div className="flex items-center gap-1 font-mono text-[10px] text-ink-soft">
                        <MapPin className="size-2.5 shrink-0" />
                        <span className="truncate max-w-[200px]">{musician.pressingPlant}</span>
                      </div>
                    </td>

                    {/* Tape Transport Play Trigger */}
                    <td className="py-4 px-4 text-right">
                      {musician.audio ? (
                        <button
                          type="button"
                          onClick={() => toggleAudio(musician.id)}
                          className={`inline-flex items-center gap-1.5 border-2 border-ink px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] transition-all cursor-pointer shadow-[2px_2px_0_0_var(--ink)] active:translate-x-0.5 active:translate-y-0.5 ${
                            isPlaying
                              ? 'bg-ink text-paper'
                              : 'bg-paper-bright hover:bg-[#e7dcc6] text-ink'
                          }`}
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="size-3" />
                              <span>Stop</span>
                            </>
                          ) : (
                            <>
                              <Play className="size-3" />
                              <span>Listen</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="font-mono text-[10px] uppercase text-ink-soft/60">
                          Tape Vaulted
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Responsive Cards Layout */}
        <div className="mt-8 grid grid-cols-1 gap-4 lg:hidden sm:grid-cols-2">
          {processedRecords.map((musician) => {
            const isPlaying = playingId === musician.id
            const fallback = fallbackImage(musician)

            return (
              <div
                key={musician.id}
                className="border-2 border-ink bg-paper-bright p-4 shadow-[4px_4px_0_0_var(--ink)]"
              >
                <div className="flex items-center justify-between border-b border-ink/30 pb-2">
                  <span className="font-mono text-[11px] font-bold text-ink-soft">
                    #{musician.index} · {musician.releaseYear}
                  </span>
                  <span
                    className="border border-ink/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em]"
                    style={{ backgroundColor: `${musician.accentColor}20` }}
                  >
                    {musician.genre}
                  </span>
                </div>

                <div className="mt-3">
                  <h4 className="font-serif text-xl font-bold leading-tight">{musician.name}</h4>
                  {musician.honorific && (
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                      {musician.honorific}
                    </p>
                  )}
                  <p className="mt-1 font-serif text-sm italic">
                    “{musician.hitTrack}” — <span className="not-italic text-ink-soft">{musician.album}</span>
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-ink/20 pt-2 font-mono text-[10px] uppercase text-ink-soft">
                  <span>Matrix: {musician.catalogNumber}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-ink">{musician.bpm} BPM</span>
                    <PolyRhythmEqualizer
                      bpm={musician.bpm}
                      isPlaying={isPlaying}
                      barCount={4}
                      className="h-3"
                    />
                  </div>
                </div>

                <div className="mt-1.5 flex items-center gap-1 font-mono text-[9px] uppercase text-ink-soft">
                  <MapPin className="size-2.5 shrink-0" />
                  <span className="truncate">{musician.pressingPlant}</span>
                </div>

                {musician.audio && (
                  <button
                    type="button"
                    onClick={() => toggleAudio(musician.id)}
                    className={`mt-4 w-full flex items-center justify-center gap-2 border-2 border-ink py-2 font-mono text-xs uppercase tracking-[0.14em] cursor-pointer shadow-[2px_2px_0_0_var(--ink)] active:translate-x-0.5 active:translate-y-0.5 ${
                      isPlaying ? 'bg-ink text-paper' : 'bg-paper hover:bg-[#e7dcc6] text-ink'
                    }`}
                  >
                    {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                    <span>{isPlaying ? 'Pause Master Tape' : 'Play Master Tape'}</span>
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* Global Row Audio Player (Active when playing) */}
        {/* Analog Cassette Master Transport Drawer with Latch Spring & Click Shake */}
        <AnimatePresence>
          {playingId && activeTrack && (
            <CassetteTransport
              record={activeTrack}
              isPlaying={isPlaying}
              onTogglePlay={() => toggleTrack(activeTrack, 'index')}
              onStop={stopTrack}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

