'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, Tv, Volume2, VolumeX, Power } from 'lucide-react'

// YouTube video ID: M7rFzXUjsH0, starts at 10 seconds
const YOUTUBE_VIDEO_ID = "F2epz22qOzM"
const START_SECONDS = 10


const MECHANICAL_EASE = [0.16, 1, 0.3, 1] as const

type VintageTvGatewayProps = {
  onComplete?: () => void
}

export function VintageTvGateway({ onComplete }: VintageTvGatewayProps) {
  const [isDismissed, setIsDismissed] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [tvPositioned, setTvPositioned] = useState(false)
  const [screenPowered, setScreenPowered] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)

  // Trigger CRT screen power-on after the TV finishes its rotational entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setTvPositioned(true)
      // Slight delay after landing before the CRT tube flashes on
      const crtTimer = setTimeout(() => {
        setScreenPowered(true)
      }, 350)
      return () => clearTimeout(crtTimer)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  // Dismiss TV with vintage CRT shutdown effect
  const handleEnterMuseum = () => {
    setIsExiting(true)
    onComplete?.()
    setTimeout(() => {
      setIsDismissed(true)
    }, 850)
  }

  const handleUnmute = () => {
    setIsMuted(false)
    setUserInteracted(true)
  }

  if (isDismissed) return null

  // YouTube embed URL with start=10 and autoplay
  const embedUrl = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=${isMuted ? 1 : 0
    }&start=${START_SECONDS}&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          key="vintage-tv-stage"
          initial={{ opacity: 1 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: MECHANICAL_EASE }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#080706] px-4 py-5 sm:px-8 sm:py-7 select-none overflow-hidden text-[#F3ECDD] font-mono"
        >
          {/* Background Ambient Dark Vignette & Paper Grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(#F3ECDD_1px,transparent_1px)] [background-size:20px_20px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,163,115,0.06)_0%,rgba(0,0,0,0.92)_100%)]"
          />

          {/* TOP BAR: Archival TV Metadata & Skip Control */}
          <header className="relative z-30 flex w-full max-w-5xl items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#A69E8D]">
              <Tv className="size-4 text-[#C82A2A] animate-pulse" />
              <span>NTA BROADCAST</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMuted((m) => !m)}
                className="flex items-center gap-1.5 border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[#D2C8B5] hover:border-[#F3ECDD] hover:text-[#F3ECDD] transition-colors cursor-pointer"
                title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              >
                {isMuted ? <VolumeX className="size-3.5 text-[#C82A2A]" /> : <Volume2 className="size-3.5 text-[#4ade80]" />}
                <span className="hidden sm:inline">{isMuted ? 'Sound Off' : 'Sound On'}</span>
              </button>

              <button
                type="button"
                onClick={handleEnterMuseum}
                className="group flex items-center gap-2 border-2 border-[#F3ECDD] bg-[#F3ECDD] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#080706] transition-all hover:bg-transparent hover:text-[#F3ECDD] cursor-pointer shadow-[3px_3px_0_0_#C82A2A]"
              >
                <span>Enter Archive</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </header>

          {/* =========================================================================
              CENTER STAGE: THE ROTATING VINTAGE TELEVISION
              ========================================================================= */}
          <main className="relative z-20 flex flex-1 w-full max-w-4xl items-center justify-center py-4">
            <div className="relative flex w-full flex-col items-center">
              {/* THE TV CHASSIS WITH ROTATIONAL ENTRANCE ANIMATION */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.65,
                  rotate: -18,
                  y: -70,
                }}
                animate={{
                  opacity: isExiting ? 0 : 1,
                  scale: isExiting ? 0.9 : 1,
                  rotate: isExiting ? 6 : 0,
                  y: isExiting ? 40 : 0,
                }}
                transition={{
                  duration: isExiting ? 0.7 : 1.25,
                  ease: MECHANICAL_EASE,
                }}
                className="relative aspect-[475/421] w-full max-w-[520px] sm:max-w-[580px] lg:max-w-[620px] drop-shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
              >
                {/* 1. CRT SCREEN HOUSING (Sits inside the television bezel) */}
                <div
                  className="absolute overflow-hidden bg-black"
                  style={{
                    left: '14.1%',
                    top: '15.0%',
                    width: '68.4%',
                    height: '60.2%',
                    borderRadius: '24px',
                  }}
                >
                  {/* CRT POWER-ON FLASH / VIDEO CONTAINER */}
                  <AnimatePresence>
                    {screenPowered ? (
                      <motion.div
                        key="crt-screen-active"
                        initial={{ scaleY: 0.02, opacity: 0.95 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="relative h-full w-full overflow-hidden bg-black origin-center"
                      >
                        {/* Live YouTube Iframe Video Player */}
                        <iframe
                          key={`yt-player-${isMuted ? 'muted' : 'unmuted'}`}
                          src={embedUrl}
                          title="National Anthem of Nigeria - 1960 Historical Broadcast"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="h-full w-full border-0 object-cover scale-[1.08] pointer-events-auto"
                        />

                        {/* Analog CRT Scanlines Overlay */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(rgba(0,0,0,0)_0px,rgba(0,0,0,0)_2px,rgba(0,0,0,0.38)_3px,rgba(0,0,0,0.38)_4px)] opacity-60 mix-blend-overlay"
                        />

                        {/* Curved CRT Screen Tube Vignette Shadow */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 rounded-[20px] shadow-[inset_0_0_40px_rgba(0,0,0,0.85)]"
                        />

                        {/* CRT Tube Specular Light Reflection */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 rounded-[20px] bg-[radial-gradient(ellipse_at_35%_25%,rgba(255,255,255,0.18)_0%,transparent_55%)]"
                        />

                        {/* Vintage CRT On-Screen Channel Indicator (Green Phosphor) */}
                        <div className="pointer-events-none absolute top-3 left-4 flex items-center gap-2 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#39FF14] drop-shadow-[0_0_8px_#39FF14]">
                          <span className="animate-pulse">● CH 03</span>
                          <span>NTA-2 LAGOS // 1960</span>
                        </div>

                        {/* Unmute Prompt if muted by browser autoplay policy */}
                        {isMuted && (
                          <div className="absolute bottom-3 inset-x-3 flex justify-center">
                            <button
                              type="button"
                              onClick={handleUnmute}
                              className="group flex items-center gap-2 rounded border border-[#39FF14]/70 bg-black/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#39FF14] hover:bg-[#39FF14] hover:text-black transition-colors cursor-pointer shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                            >
                              <Volume2 className="size-3 animate-bounce" />
                              <span>Click TV to Unmute Audio</span>
                            </button>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      /* Standby Black Glass before CRT powers on */
                      <div className="flex h-full w-full items-center justify-center bg-[#0d0d0d]">
                        {tvPositioned && (
                          <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="h-[2px] w-full bg-white shadow-[0_0_12px_#fff]"
                          />
                        )}
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. THE AUTHENTIC TV BEZEL OVERLAY (Transparent cut-out sits on top of video) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/tv-transparent.png"
                  alt="Vintage Television"
                  className="pointer-events-none absolute inset-0 h-full w-full object-contain z-20 drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
                />

                {/* 3. PHYSICAL POWER INDICATOR LED ON TV CHASSIS */}
                <div
                  className={`pointer-events-none absolute z-30 size-2 rounded-full transition-all duration-500 ${screenPowered
                      ? 'bg-[#39FF14] shadow-[0_0_10px_#39FF14,0_0_20px_#39FF14]'
                      : 'bg-[#C82A2A] opacity-75'
                    }`}
                  style={{
                    left: '37.8%',
                    bottom: '9.4%',
                  }}
                />
              </motion.div>

              {/* TELEVISION CONTROLS & CAPTION */}
              <div className="mt-5 flex flex-col items-center gap-2 text-center font-mono">
                {/* <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#A69E8D]">
                  {screenPowered
                    ? '● 
                    : 'POSITIONING TELEVISION RECEIVER...'}
                </p> */}

                <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleEnterMuseum}
                    className="group inline-flex items-center gap-2 border-2 border-[#D4A373] bg-[#D4A373] px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#080706] shadow-[4px_4px_0_0_#C82A2A] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#C82A2A] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all cursor-pointer"
                  >
                    <span>Proceed to Museum Platter</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={handleEnterMuseum}
                    className="inline-flex items-center gap-1.5 border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-[#D2C8B5] hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  >
                    <Power className="size-3.5 text-[#C82A2A]" />
                    <span>Turn Off TV</span>
                  </button>
                </div>
              </div>
            </div>
          </main>

          {/* BOTTOM TELEMETRY FOOTER */}
          <footer className="relative z-30 border-t border-white/10 pt-3 w-full max-w-5xl text-center text-[10px] uppercase tracking-[0.22em] text-[#8C806F]">
            NATIONAL ANTHEM OF NIGERIA 2024
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

