'use client'

import { useState } from 'react'
import { AudioProvider } from '@/components/archive/audio-context'
import { VintageTvGateway } from '@/components/archive/vintage-tv-gateway'
import { Hero } from '@/components/archive/hero'
import { Exhibitions } from '@/components/archive/exhibitions'
import { SonicIndex } from '@/components/archive/sonic-index'
import { About } from '@/components/archive/about'
import { ScrollNeedle } from '@/components/archive/scroll-needle'

export default function Page() {
  const [isTvActive, setIsTvActive] = useState(true)

  return (
    <AudioProvider>
      {/* Accessible Skip Link for Screen Readers & Keyboard Navigation */}
      <a
        href="#main-content"
        onClick={() => setIsTvActive(false)}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:border-2 focus:border-ink focus:bg-paper focus:px-4 focus:py-2.5 focus:font-mono focus:text-xs focus:font-bold focus:uppercase focus:tracking-[0.2em] focus:text-ink focus:shadow-[4px_4px_0_0_var(--ink)] focus:outline-none"
      >
        Skip to main exhibition
      </a>

      {isTvActive && <VintageTvGateway onComplete={() => setIsTvActive(false)} />}
      <main id="main-content" tabIndex={-1} className="relative outline-none">
        <ScrollNeedle />
        <Hero isEntranceTriggered={!isTvActive} />
        <Exhibitions />
        <SonicIndex />
        <About />
      </main>
    </AudioProvider>
  )
}
