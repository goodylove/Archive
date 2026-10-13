import { LEGENDARY_MUSICIANS } from '@/lib/musicians'

const ENTRIES = LEGENDARY_MUSICIANS.map(
  (m) => `${m.hitTrack} — ${m.releaseYear} — ${m.catalogNumber} — ${m.pressingPlant.split(',').slice(-1)[0].trim()}`,
)

function Run({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {ENTRIES.map((entry) => (
        <li key={entry} className="flex items-center whitespace-nowrap">
          <span className="px-5 sm:px-6 font-mono text-xs sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.18em]">{entry}</span>
          <span aria-hidden className="size-2 sm:size-2.5 rotate-45 bg-specimen transition-colors duration-500" />
        </li>
      ))}
    </ul>
  )
}

export function ArchiveMarquee() {
  return (
    <div className="marquee relative shrink-0 overflow-hidden border-y-2 border-ink bg-ink py-2 sm:py-2.5 text-paper">
      <p className="sr-only">Catalogue tape: eight landmark pressings from 1969 to 1989.</p>
      <div className="marquee-track flex w-max">
        <Run />
        <Run hidden />
      </div>
    </div>
  )
}
