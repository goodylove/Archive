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
      {isTvActive && <VintageTvGateway onComplete={() => setIsTvActive(false)} />}
      <main className="relative">
        <ScrollNeedle />
        <Hero isEntranceTriggered={!isTvActive} />
        <Exhibitions />
        <SonicIndex />
        <About />
      </main>
    </AudioProvider>
  )
}
