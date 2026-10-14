'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type ArchiveImageProps = {
  src: string
  fallbackSrc: string
  alt: string
  className?: string
  priority?: boolean
}

export function ArchiveImage({ src, fallbackSrc, alt, className, priority }: ArchiveImageProps) {
  const [failed, setFailed] = useState(false)
  const ref = useRef<HTMLImageElement>(null)

  // A remote image can fail before hydration attaches onError, so check once on mount.
  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [])

  const effectiveSrc = (!src || src.trim() === '' || failed) ? fallbackSrc : src

  if (!effectiveSrc || effectiveSrc.trim() === '') {
    return <div className={cn('h-full w-full bg-paper-dark/20', className)} aria-hidden />
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={effectiveSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={cn(
        'h-full w-full object-cover',
        // Local stand-ins carry a printed matte; crop it out.
        failed && 'scale-[1.22]',
        className,
      )}
    />
  )
}
