'use client'

import { createContext, useContext, useState, useRef, useEffect, useCallback, type ReactNode } from 'react'
import type { MusicianRecord } from '@/lib/musicians'

export type AudioOrigin = 'hero' | 'exhibitions' | 'index'

interface ArchiveAudioContextType {
  activeTrack: MusicianRecord | null
  activeTrackId: string | null
  isPlaying: boolean
  origin: AudioOrigin | null
  playTrack: (record: MusicianRecord, origin?: AudioOrigin) => void
  pauseTrack: () => void
  toggleTrack: (record: MusicianRecord, origin?: AudioOrigin) => void
  stopTrack: () => void
}

const ArchiveAudioContext = createContext<ArchiveAudioContextType | null>(null)

export function AudioProvider({ children }: { children: ReactNode }) {
  const [activeTrack, setActiveTrack] = useState<MusicianRecord | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [origin, setOrigin] = useState<AudioOrigin | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const stopTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsPlaying(false)
    setActiveTrack(null)
    setOrigin(null)
  }, [])

  const pauseTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setIsPlaying(false)
  }, [])

  const playTrack = useCallback(
    (record: MusicianRecord, newOrigin: AudioOrigin = 'exhibitions') => {
      if (!record.audio) return
      const audio = audioRef.current
      if (!audio) return

      // If already on this track, resume
      if (activeTrack?.id === record.id) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true)
            setOrigin(newOrigin)
          })
          .catch(() => setIsPlaying(false))
        return
      }

      // Switch to new track
      audio.pause()
      audio.src = record.audio
      audio.load()
      setActiveTrack(record)
      setOrigin(newOrigin)

      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    },
    [activeTrack]
  )

  const toggleTrack = useCallback(
    (record: MusicianRecord, newOrigin: AudioOrigin = 'exhibitions') => {
      if (!record.audio) return

      if (activeTrack?.id === record.id && isPlaying) {
        pauseTrack()
      } else {
        playTrack(record, newOrigin)
      }
    },
    [activeTrack, isPlaying, pauseTrack, playTrack]
  )

  return (
    <ArchiveAudioContext.Provider
      value={{
        activeTrack,
        activeTrackId: isPlaying && activeTrack ? activeTrack.id : null,
        isPlaying,
        origin,
        playTrack,
        pauseTrack,
        toggleTrack,
        stopTrack,
      }}
    >
      {children}

      {/* The Single Master Audio Channel for the entire digital museum */}
      <audio
        ref={audioRef}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false)
        }}
      />
    </ArchiveAudioContext.Provider>
  )
}

export function useArchiveAudio() {
  const context = useContext(ArchiveAudioContext)
  if (!context) {
    throw new Error('useArchiveAudio must be used within an AudioProvider')
  }
  return context
}

