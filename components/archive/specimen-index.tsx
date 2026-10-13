'use client'

import type { MusicianRecord } from '@/lib/musicians'
import { cn } from '@/lib/utils'

type SpecimenIndexProps = {
  records: MusicianRecord[]
  activeIndex: number
  onSelect: (index: number) => void
}

export function SpecimenIndex({ records, activeIndex, onSelect }: SpecimenIndexProps) {
  return (
    <nav id="index" aria-label="Specimen index" className="scroll-mt-6 border-t-2 border-ink">
      <ol className="grid grid-flow-col auto-cols-[minmax(11rem,1fr)] overflow-x-auto [scrollbar-width:thin] lg:grid-flow-row lg:grid-cols-8 lg:overflow-visible">
        {records.map((record, i) => {
          const active = i === activeIndex
          return (
            <li key={record.id} className="border-r-2 border-ink last:border-r-0">
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-pressed={active}
                aria-label={`Specimen ${record.index}: ${record.name}, ${record.hitTrack}, ${record.releaseYear}`}
                style={{ boxShadow: active ? `inset 0 8px 0 0 ${record.accentColor}` : undefined }}
                className={cn(
                  'flex h-full w-full flex-col items-start gap-3 px-4 pb-4 pt-6 text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-specimen',
                  active ? 'bg-ink text-paper' : 'hover:bg-[#e7dcc6]',
                )}
              >
                <span className="flex w-full items-center justify-between">
                  <span className="font-serif text-3xl font-black leading-none">{record.index}</span>
                  <span
                    aria-hidden
                    className="size-3 border-2 border-current"
                    style={{ backgroundColor: record.accentColor }}
                  />
                </span>
                <span className="font-serif text-lg font-semibold leading-tight">{record.name}</span>
                <span className="mt-auto font-mono text-[11px] uppercase tracking-[0.16em]">
                  {record.releaseYear} · {record.bpm} BPM
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
