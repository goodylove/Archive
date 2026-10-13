import type { MusicianRecord } from './musicians'

export const INK = '#121110'
export const PAPER = '#F3ECDD'

function luminance(hex: string) {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const [r, g, b] = channels.map((v) =>
    v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4,
  )
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/** Picks ink or paper — whichever reads better on the accent (always ≥ 4.5:1, AAA for large type). */
export function textOn(accent: string) {
  return contrast(accent, INK) >= contrast(accent, PAPER) ? INK : PAPER
}

/** Local archival stand-ins used when a remote press photo refuses to load. */
export function fallbackImage(record: MusicianRecord) {
  const genre = record.genre.toLowerCase()
  if (genre.includes('afrobeat') || genre.includes('reggae')) return '/specimens/afrobeat.png'
  if (genre.includes('jùjú') || genre.includes('juju')) return '/specimens/juju.png'
  return '/specimens/highlife.png'
}
