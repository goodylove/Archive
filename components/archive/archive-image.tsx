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

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={failed ? fallbackSrc : src}
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
