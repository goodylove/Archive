'use client'

import { useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

type AudioSampleProps = {
  src: string
  track: string
  isPlaying?: boolean
  onTogglePlay?: () => void
  onPlayChange?: (playing: boolean) => void
}

export function AudioSample({
  src,
  track,
  isPlaying: controlledPlaying,
  onTogglePlay,
  onPlayChange,
}: AudioSampleProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [internalPlaying, setInternalPlaying] = useState(false)

  const isControlled = controlledPlaying !== undefined
  const playing = isControlled ? controlledPlaying : internalPlaying

  function toggle() {
    if (onTogglePlay) {
      onTogglePlay()
      return
    }
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(() => {
        setInternalPlaying(false)
        onPlayChange?.(false)
      })
    } else {
      audio.pause()
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        className="group/play inline-flex items-center gap-2.5 border-2 border-ink bg-paper-bright px-2.5 py-1.5 sm:px-3 sm:py-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink cursor-pointer"
      >
        <span className="flex size-5 sm:size-6 items-center justify-center bg-ink text-paper group-hover/play:bg-paper group-hover/play:text-ink">
          {playing ? <Pause className="size-3 sm:size-3.5" aria-hidden /> : <Play className="size-3 sm:size-3.5" aria-hidden />}
        </span>
        <span>
          {playing ? 'Pause' : 'Play'} sample
          <span className="sr-only">{` of ${track}`}</span>
        </span>
      </button>
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onPlay={() => {
          setInternalPlaying(true)
          onPlayChange?.(true)
        }}
        onPause={() => {
          setInternalPlaying(false)
          onPlayChange?.(false)
        }}
        onEnded={() => {
          setInternalPlaying(false)
          onPlayChange?.(false)
        }}
      />
    </>
  )
}

