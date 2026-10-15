# ARCHIVE — The Pulse of the Soil
### *A Digital Museum of Nigerian Musical Architecture (1960 — Present)*

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)

[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Framer_Motion-motion%2Freact-FF0055?style=for-the-badge&logo=framer)](https://motion.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

## ✦ Overview

**ARCHIVE** is a high-end, brutalist digital museum dedicated to the preservation, documentation, and sonic architecture of Nigeria's foundational musical heritage—spanning **Highlife**, **Afrobeat**, **Afro-Jùjú**, and early **Afro-Pop**.

Rejecting generic, floaty SaaS web aesthetics, the platform is engineered around a **1970s/80s West African analog hardware philosophy**: vinyl lacquers pulling from printed sleeves, tonearm needle drops, physical paper dossiers, and CRT phosphor scans.

---

## ✦ Key Experiences & Features

### 1. The Vintage CRT Television Gateway
- **Rotational 3D Entrance**: On page load, an authentic vintage CRT television (*SHARP cathode-ray tube*) glides into perspective with a dramatic physical rotation before settling into center alignment (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Cathode Ray Tube Power-On**: A classic horizontal electron beam flashes across the screen and expands vertically to simulate physical tube warmup.
- **Synchronized Video Feed**: Streams the historical broadcast of the Nigerian National Anthem commencing at `0:10` inside the bezel.
- **Authentic CRT Shaders**: Layered with analog scanline interlace patterns, curved tube vignette shadows, and a green phosphor On-Screen Display (`● CH 03 // NTA-2 LAGOS 1960`).
- **Seamless Museum Handoff**: Powers down the CRT tube and folds away to trigger the Hero section's kinetic entrance.

### 2. The Audiophile Turntable & Kinetic Hero
- **Interactive Turntable Deck**: Realistic vinyl record with lead-in grooves, center label stamping, and microgroove luster sheen.
- **Pivoting Audiophile Tonearm**: An articulated S-curve tonearm with counterweight, anti-skate dial, cueing lever, and cartridge that physically drops its stylus needle onto the vinyl groove upon playback.
- **Kinetic Mask Reveals**: Editorial headings reveal line-by-line using high-speed overflow masks (`clip-path: inset(0 0 100% 0) → inset(0 0 0% 0)`), while specimen badges stamp down with micro-scale physical impact.
- **Auto-Rotation Slideshow**: Automatically previews legendary musicians with a synchronized linear progress ticker.

### 3. Tactile Dossier Cards (`#exhibitions`)
- **Vinyl Pull-Out Mechanism**: Hovering over a record card physically pulls the vinyl disc 28px out of its cardboard sleeve with a slight rotational tilt.
- **Continuous BPM Spin**: When a track is playing, the record slides out and spins at a duration mathematically derived from its real BPM:
  $$\text{spinDuration} = \frac{60}{\text{BPM}} \times 8$$
- **Polaroid Lift & Hard Shadow Displacement**: Stage photography tilts with a paper-lift effect, and brutalist drop shadows expand from `4px 4px` to `10px 10px`.
- **Industrial Pressing Directory**: Cross-referenced with historical pressing plants (*Decca West Africa, EMI Ikeja, Tabansi Records Onitsha, Afrodisia Lagos*).

### 4. The Master Index & Poly-Rhythmic Equalizer (`#index`)
- **Discographical Ledger**: Complete specimen table with real-time text search and multi-column sorting (Artist, Track, Year, BPM, Decades, Plant).
- **Prime-Ratio Poly-Rhythmic Equalizer**: Live visualizer bars driven by West African poly-rhythmic delay ratios (`0.25x`, `0.5x`, `0.75x`, `1.33x`).
- **Floating Cassette Player Drawer**: A sticky bottom audio transport drawer that slides up (`y: 100% → 0%`) with a mechanical frame shake mimicking a physical cassette latch click.

### 5. The "Analog Groove Meter" & Interactive Stylus Jump Navigation
- A fixed vertical groove meter mapped to total scroll depth via Framer Motion `useScroll` and `useTransform`.
- Tracks your position like a phonograph needle traveling from the outer 12" lead-in rim down to the dead-wax run-out colophon (`XX% // 33⅓ RPM`).
- **Interactive Section Jump**: Each concentric groove tick (`12" RIM`, `GROOVE 01`, `MID-DISC`, `INNER BAND`, `DEAD WAX`) is directly clickable with smooth scrolling, keyboard accessibility, and a quick back-to-top dead wax shortcut.

### 6. Natural Gesture & Scroll-Through Entry
- Scrolling down (mousewheel, touchpad, touch swipe up on mobile, or PageDown/ArrowDown) smoothly passes through the vintage television gateway into the active museum exhibition.
- An animated scroll indicator guides the user on arrival (`↓ Scroll down or press Enter to visit archive`).

### 7. Accessibility Architecture (WCAG 2.1 AA Compliant)
- **Accessible Skip Link**: Screen-reader and keyboard-friendly "Skip to main exhibition" link (`#main-content`).
- **Full Keyboard Navigation**: Every interactive control (turntable platter, stylus ticks, filter matrix, audio sample buttons, cassette transport) responds cleanly to `Tab`, `Enter`, `Space`, and `Arrow` keys.
- **Shortcuts**: `M` toggles TV audio, `Escape`/`Enter`/`Space`/`ArrowDown`/`PageDown` enters the museum.
- **Screen Reader Announcements**: Semantic ARIA live regions (`aria-live="polite"`) announce track changes, TV status, and filter updates.
- **Accessible Landmarks**: Strict semantic landmark hierarchy (`<main id="main-content">`, `<header>`, `<nav>`, `<aside>`, `<footer>`, `<section aria-labelledby>`).
- **Reduced Motion Support**: Complete graceful fallback for users with vestibular sensitivities (`useReducedMotion` and `@media (prefers-reduced-motion)`).

### 8. The Master Audio Bus
- A unified global audio context ensures **only ONE audio stream ever plays site-wide**, automatically synchronizing playback states across the Hero Turntable, Dossier Cards, and Master Index.

---

## ✦ Curated Specimens

| Specimen | Legend | Landmark Track | Year | Genre | BPM | Pressing Plant |
|---|---|---|---|---|---|---|
| **01** | **Fela Anikulapo Kuti** | *Roforofo Fight* | 1972 | Afrobeat | 118 | EMI Records (West Africa) Ltd, Ikeja |
| **02** | **King Sunny Adé** | *Ja Funmi* | 1982 | Jùjú | 124 | Sunny Alade Records / Island, Lagos |
| **03** | **Chief Stephen Osita Osadebe** | *Osandi Owendi* | 1984 | Highlife | 102 | PolyGram Records Ltd, Ikeja |
| **04** | **Sir Victor Uwaifo** | *Joromi* | 1969 | Ekassa / Highlife | 128 | Philips West African Records, Lagos |
| **05** | **Majek Fashek** | *Send Down the Rain* | 1988 | Prisoners of Conscience | 84 | Tabansi Records, Onitsha |
| **06** | **Sir Shina Peters** | *Ijo Shina (Ace)* | 1989 | Afro-Jùjú | 134 | CBS Nigeria / Sony Music, Lagos |
| **07** | **Chief Oliver De Coque** | *Identity* | 1980 | Ogene Highlife | 112 | Olumo Records, Lagos |
| **08** | **Onyeka Onwenu** | *One Love* | 1986 | Afro-Pop | 116 | Ayollo Records, Lagos |
| **09** | **Innocent "2Baba" Idibia** | *African Queen* | 2004 | Contemporary Afro-Pop | 94 | Kennis Music, Lagos |

---

## ✦ Design System & Typography

- **Display Serif**: `Fraunces` (Variable font with optical sizing, softness, and wonk axes)
- **Technical Monospace**: `IBM Plex Mono` (Archival cataloging, pressing codes, and audio telemetry)
- **Archival Color Palette**:
  - `Paper Base`: `#F3ECDD` / `Paper Bright`: `#FAF6EE` / `Paper Dark`: `#E4D8C1`
  - `Ink`: `#121110` / `Ink Soft`: `#403B35`
  - `Wax Stamp Crimson`: `#C82A2A`
  - `Terracotta / Brass`: `#D45D3A` / `#C89B55`

---

## ✦ Getting Started

### Prerequisites
- **Node.js** >= 18.18.0
- **pnpm** (recommended) or **npm**

### Installation
```bash
# Clone the repository
git clone https://github.com/goodylove/nigerian-musical-archive.git

# Enter project directory
cd nigerian-musical-archive

# Install dependencies
pnpm install
```

### Running Locally
```bash
pnpm dev
```
Open **`http://localhost:3000`** in your browser to experience the archive.

### Production Build
```bash
pnpm build
pnpm start
```

---

## ✦ Project Structure

```text
├── app/
│   ├── layout.tsx                # Root layout, typography variables & SVG favicon config
│   ├── page.tsx                  # Main orchestration & entrance handoff
│   ├── globals.css               # Paper textures, analog scanlines, vinyl groove styles
│   └── icon.svg                  # Archival 33⅓ RPM vinyl favicon
├── components/
│   └── archive/
│       ├── vintage-tv-gateway.tsx    # 3D rotating CRT television & video broadcast
│       ├── hero.tsx                  # Turntable deck, tonearm, & kinetic editorial title
│       ├── specimen-card.tsx         # Tactile hero specimen card
│       ├── exhibitions.tsx           # Dossier cards gallery & plant index
│       ├── dossier-card.tsx          # Physical vinyl slide-out & continuous spin
│       ├── sonic-index.tsx           # Full discographic ledger with search & sorting
│       ├── poly-rhythm-equalizer.tsx # West African poly-rhythmic frequency equalizer
│       ├── cassette-transport.tsx    # Sticky transport drawer with physical latch click
│       ├── scroll-needle.tsx         # Analog groove depth meter
│       ├── about.tsx                 # Archival manifesto & technical colophon
│       ├── site-nav.tsx              # Museum navigation & live coordinate bar
│       ├── audio-context.tsx         # Unified single master audio bus
│       └── archive-image.tsx         # Hardened image loader with matte crop fallbacks
├── lib/
│   ├── musicians.ts              # Canonical dataset of legendary Nigerian musicians
│   ├── archive.ts                # Archival helpers, image fallbacks, contrast math
│   └── utils.ts                  # Classname merger (clsx + twMerge)
└── public/
    ├── audio/                    # Primary archival recordings (.mp3)
    ├── tv.png                    # Original CRT television asset
    ├── tv-transparent.png        # Precision screen-cutout TV bezel overlay
    └── icon.svg                  # SVG vinyl platter tab favicon
```

---

## ✦ Accessibility & Motion Safeguards
- All motion components integrate Framer Motion's `useReducedMotion()`. When `prefers-reduced-motion: reduce` is detected in the operating system, spatial transforms instantly collapse to immediate opacity reveals.
- Full keyboard navigation support (Enter / Space bar cued on the turntable deck and transport controls).
- ARIA live regions and semantic headings across all museum ledgers.




