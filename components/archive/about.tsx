'use client'

import { motion } from 'motion/react'
import { ArrowUp, Disc, BookOpen, Layers, Cpu, Award } from 'lucide-react'

const GLOSSARY_ITEMS = [
  {
    term: 'Lacquer Lathe Mastering',
    sub: 'Mechanical Transcription',
    description:
      'Before pressing, master tapes were routed to high-precision Neumann or Scully lathes where a heated sapphire stylus cut sound waves directly into nitrocellulose lacquer discs.',
  },
  {
    term: 'Dead Wax & Matrix Etching',
    sub: 'Run-Out Groove Typography',
    description:
      'The blank space between the final track and the center label where mastering engineers hand-scribed catalog numbers, pressing dates, and plant identifiers (e.g. CBS-NIG, EMI-APAPA).',
  },
  {
    term: '2-Inch Multi-Track Tape',
    sub: 'Analog Magnetic Saturation',
    description:
      'Recorded at 15 or 30 inches per second on Ampex and Studer machines, producing the natural harmonic warmth, room acoustic depth, and tape compression iconic to 1970s Afrobeat.',
  },
  {
    term: 'Poly-Rhythmic Friction',
    sub: 'West African Sonic Architecture',
    description:
      'The dense rhythmic counterpoint between Yoruba Gángan (talking drum), Sekere, highlife horn sections, and interlocking electric guitars that defined the golden era of Nigerian groove.',
  },
]

const INSTITUTIONS = [
  {
    name: 'EMI Studios / NEMI Wharf Road',
    city: 'Apapa, Lagos',
    role: 'Primary multitrack recording and vinyl stamper casting facility.',
  },
  {
    name: 'Philips West African Records',
    city: 'Lagos Island, Lagos',
    role: 'Originator of Nigeria’s first commercially certified Gold Disc awards.',
  },
  {
    name: 'Tabansi Records Pressing Works',
    city: 'Onitsha, Anambra',
    role: 'Autonomous eastern Nigerian mastering lathe and high-volume press.',
  },
  {
    name: 'CBS Records Nigeria Ltd.',
    city: 'Ikeja, Lagos',
    role: 'Industrial steam-powered hydraulic presses capable of 20,000 LPs/day.',
  },
]

export function About() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      id="about"
      aria-labelledby="about-heading"
      className="relative z-10 bg-paper py-16 sm:py-20 lg:py-24 scroll-mt-8"
    >
      <div className="mx-auto max-w-[2200px] px-5 sm:px-8 lg:px-12">
        {/* Curatorial Masthead */}
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
              MANIFESTO & COLOPHON · CURATORIAL NOTE NO. 04
            </span>
            <span>NATIONAL ARCHIVE OF RECORDED SOUND</span>
          </motion.div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8 overflow-hidden">
              <motion.h2
                id="about-heading"
                initial={{ clipPath: 'inset(0 0 100% 0)', y: 40, opacity: 0 }}
                whileInView={{ clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[clamp(2.5rem,5.5vw,6rem)] font-black uppercase leading-[0.9] tracking-[-0.03em]"
              >
                The Sonic Manifesto.
                <span className="block text-ink-soft [font-variation-settings:'opsz'_144,'SOFT'_100,'WONK'_1]">
                  Preserving The Pulse of the Soil
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
                ARCHIVE is an open digital repository dedicated to the primary sources, tape matrices,
                and industrial pressing history of Nigerian musical pioneers between 1969 and 1989.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Curatorial Essay: Two-Column Editorial Spread */}
        <div className="mt-12 grid grid-cols-1 gap-10 border-b-2 border-ink pb-16 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
              Chapter I · The Soil & The Needle
            </span>
            <h3 className="mt-2 font-serif text-2xl font-bold leading-tight sm:text-3xl">
              From post-colonial liberation to the fever of Shina Mania.
            </h3>
            <p className="mt-4 font-serif text-base leading-relaxed text-ink/90 sm:text-lg">
              Between 1969 and 1989, Nigeria birthed one of the most creatively autonomous musical
              movements on earth. In the aftermath of independence, musicians did not merely compose songs—they
              architected soundscapes of national identity, spiritual defiance, and communal joy.
            </p>
            <p className="mt-4 font-serif text-base leading-relaxed text-ink/90 sm:text-lg">
              Sir Victor Uwaifo fused traditional Edo folklore with electric guitar virtuosity in Benin City;
              Fela Anikulapo-Kuti turned the Africa 70 rehearsal space into an anti-imperialist fortress in
              Lagos; Chief Commander Ebenezer Obey and King Sunny Adé elevated Jùjú music into an intricate,
              philosophical marathon; while Onyeka Onwenu and Majek Fashek proved that pop and reggae could
              carry the urgent moral conscience of the nation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
              Chapter II · The Physicality of Vinyl
            </span>
            <h3 className="mt-2 font-serif text-2xl font-bold leading-tight sm:text-3xl">
              Before the cloud: The industrial weight of lacquer and steam.
            </h3>
            <p className="mt-4 font-serif text-base leading-relaxed text-ink/90 sm:text-lg">
              Unlike the ephemeral streams of today, every note in this archive was physically stamped
              into heavy vinyl by Nigerian factory workers operating steam-heated presses in Ikeja, Apapa,
              and Onitsha. Nigeria was not an importer of culture—it was an exporter of high-fidelity,
              self-sufficient sound.
            </p>
            <p className="mt-4 font-serif text-base leading-relaxed text-ink/90 sm:text-lg">
              This museum preserves that physical lineage: the exact matrix serial numbers etched in the dead
              wax, the original cover artwork collages, the tempo measurements of living dancefloors, and
              the uncompressed analog breath of master magnetic tapes.
            </p>
          </motion.div>
        </div>

        {/* Technical Glossary Matrix */}
        <div className="mt-16 border-b-2 border-ink pb-16">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
                Engineering Lexicon
              </span>
              <h3 className="mt-1 font-serif text-3xl font-black uppercase sm:text-4xl">
                Analog Sound Technology
              </h3>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft max-w-sm">
              The mechanical and acoustic technologies that forged the West African golden era
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GLOSSARY_ITEMS.map((item, index) => (
              <motion.div
                key={item.term}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, x: -2 }}
                className="flex flex-col justify-between border-2 border-ink bg-paper-bright p-5 shadow-[4px_4px_0_0_var(--ink)] hover:shadow-[8px_8px_0_0_var(--ink)] transition-shadow cursor-default"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                    Glossary Entry 0{index + 1}
                  </span>
                  <h4 className="mt-2 font-serif text-lg font-bold leading-tight">{item.term}</h4>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                    {item.sub}
                  </p>
                  <p className="mt-3 font-serif text-xs leading-relaxed text-ink/80">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Provenance & Preservation Acknowledgments */}
        <div className="mt-16 border-b-2 border-ink pb-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
                Institutional Provenance
              </span>
              <h3 className="mt-1 font-serif text-3xl font-black uppercase sm:text-4xl">
                Historical Record Houses
              </h3>
              <p className="mt-4 font-serif text-sm leading-relaxed text-ink/90 sm:text-base">
                All recordings, press clippings, catalog serials, and historical attributions documented
                in this archive were cross-referenced against original physical pressings from Nigeria’s
                chartered recording houses.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {INSTITUTIONS.map((inst, index) => (
                <motion.div
                  key={inst.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, x: -2 }}
                  className="border-2 border-ink bg-paper p-4 shadow-[3px_3px_0_0_var(--ink)] hover:shadow-[6px_6px_0_0_var(--ink)] transition-shadow cursor-default"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                    📍 {inst.city}
                  </p>
                  <h5 className="mt-1 font-serif text-base font-bold leading-snug">{inst.name}</h5>
                  <p className="mt-2 font-serif text-xs text-ink/80">{inst.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* The Digital Colophon & Site Footer */}
        <div className="mt-16 pt-4">
          <div className="grid grid-cols-1 gap-8 border-2 border-ink bg-ink p-6 text-paper sm:p-8 lg:grid-cols-12 lg:items-center">
            {/* Colophon Left */}
            <div className="lg:col-span-5">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-black tracking-tight sm:text-4xl">
                  ARCHIVE
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper/70">
                  NG / SONIC REPOSITORY
                </span>
              </div>
              <p className="mt-3 font-serif text-xs leading-relaxed text-paper/80 sm:text-sm">
                A permanent digital monument documenting the sonic architecture of Nigeria. Built with
                fidelity, respect for primary master recordings, and reverence for the pioneers.
              </p>
            </div>

            {/* Colophon Middle: Typography & Spec */}
            <div className="lg:col-span-4 border-t border-paper/30 pt-4 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60">
                Specification Colophon
              </p>
              <ul className="mt-2 space-y-1 font-mono text-[11px] text-paper/90">
                <li>• Display: Fraunces (Variable Serif by Charles & Zimbardi)</li>
                <li>• Data & Matrix: IBM Plex Mono (Mike Abbink)</li>
                <li>• Palette: Archival Paper (#F3ECDD) & Carbon Ink (#121110)</li>
                <li>• Audio Engine: Web Audio Master Player (44.1kHz Stereo)</li>
              </ul>
            </div>

            {/* Colophon Right: Back to top / Turntable button */}
            <div className="lg:col-span-3 flex flex-col items-start lg:items-end justify-center border-t border-paper/30 pt-4 lg:border-t-0 lg:pt-0">
              <motion.button
                type="button"
                onClick={scrollToTop}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Return to turntable platter at top of museum"
                className="flex items-center gap-2 border-2 border-paper bg-paper text-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] transition-colors hover:bg-transparent hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper cursor-pointer shadow-[3px_3px_0_0_#ffffff]"
              >
                <ArrowUp className="size-3.5" aria-hidden="true" />
                <span>Return to Platter</span>
              </motion.button>
              <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-paper/60">
                1969 — 1989 · All Rights Preserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
