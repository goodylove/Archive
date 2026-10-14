import { AudioProvider } from '@/components/archive/audio-context'
import { Hero } from '@/components/archive/hero'
import { Exhibitions } from '@/components/archive/exhibitions'
import { SonicIndex } from '@/components/archive/sonic-index'
import { About } from '@/components/archive/about'
import { ScrollNeedle } from '@/components/archive/scroll-needle'

export default function Page() {
  return (
    <AudioProvider>
      <main className="relative">
        <ScrollNeedle />
        <Hero />
        <Exhibitions />
        <SonicIndex />
        <About />
      </main>
    </AudioProvider>
  )
}
