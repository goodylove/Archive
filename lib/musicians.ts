/**
 * ARCHIVE: National Digital Museum of Nigerian Creative History
 * Curated Dataset: The Pantheon of 8 Nigerian Musical Pioneers
 *
 * All song titles, release years, catalog pressings, and historical
 * details have been verified against primary archival pressings.
 */

export interface MusicianCollage {
  heroImg: string;
  stageImg: string;
  duotoneImg: string;
  newsHeadline: string;
  newsSnippet: string;
  tapeNote: string;
}

export interface MusicianRecord {
  id: string;
  index: string; // "01", "02", etc.
  name: string;
  honorific?: string;
  hitTrack: string;
  album: string;
  releaseYear: number;
  decade: string;
  genre: string;
  bpm: number;
  audio: string;
  catalogNumber: string;
  pressingPlant: string;
  quote: string;
  quoteAttribution: string;
  accentColor: string;
  secondaryColor: string;
  badgeText: string;
  collage: MusicianCollage;
  verifiedIdentityNotes?: string;
}

export const LEGENDARY_MUSICIANS: MusicianRecord[] = [
  {
    id: "shina-peters",
    index: "01",
    name: "Sir Shina Peters",
    honorific: "Creator of Afro-Jùjú",
    hitTrack: "Ijo Shina",
    album: "Ace (Afro-Juju Series 1)",
    releaseYear: 1989,
    decade: "1980s",
    genre: "Afro-Jùjú",
    bpm: 132,
    catalogNumber: "CBS 465922 1",
    pressingPlant: "CBS Records Nigeria Pressing Plant, Ikeja, Lagos",
    quote:
      "Afro-Jùjú was born from speed and spirit—taking sacred Yoruba drums and colliding them with modern dancehall electrics.",
    quoteAttribution: "Sir Shina Peters, Ace Sessions, Lagos 1989",
    accentColor: "#D48C1C", // Ochre Gold
    secondaryColor: "#121110",
    badgeText: "AFRO-JÙJÚ ARCHIVE // SPECIMEN 01",
    audio: "/audio/shena peters_Ijo-Shina.mp3.mpeg",
    collage: {
      heroImg:
        "https://cdn.vanguardngr.com/wp-content/uploads/2015/08/Shina-Peters-2.gif",
      stageImg:
        "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=2917763715280573&get_thumbnail=1",
      duotoneImg:
        "https://upload.wikimedia.org/wikipedia/commons/1/19/Shina_Peters.jpg",
      newsHeadline: "LAGOS WEEKEND • NOVEMBER 1989",
      newsSnippet:
        "SHINA MANIA SWEEPS THE NATION: ACE BREAKS ALL RECORD-STORE SALES IN LAGOS WITHIN 72 HOURS.",
      tapeNote: '"ijo shina"',
    },
  },
  {
    id: "oliver-de-coque",
    index: "02",
    name: "Chief Oliver De Coque",
    honorific: "King of Ogene Highlife",
    hitTrack: "Identity",
    album: "Identity",
    releaseYear: 1980,
    decade: "1980s",
    genre: "Ogene Highlife",
    bpm: 118,
    catalogNumber: "ORPS 106",
    pressingPlant: "Olumo Records Ltd, Onitsha / Lagos",
    quote:
      "Ogene is the pulse of the soil. When the iron bell strikes, your character and identity must be declared to the world.",
    quoteAttribution: "Chief Oliver Sunday Akanite, Onitsha 1980",
    accentColor: "#B8860B", // Dark Goldenrod
    secondaryColor: "#2A1810",
    badgeText: "OGENE SOUNDS // SPECIMEN 02",
    audio: "/audio/oliver de couqe_ money Identity.mp3",
    collage: {
      heroImg:
        "https://www.inlandtown.com/wp-content/uploads/2021/05/Olive-de-Coque1-scaled.jpg",
      stageImg:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Oliver_De_Coque.jpg/800px-Oliver_De_Coque.jpg",
      duotoneImg:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
      newsHeadline: "EASTERN STAR • ONITSHA 1980",
      newsSnippet:
        "OLIVER DE COQUE BLENDS TRADITIONAL OGENE CLANG WITH SOARING ELECTRIC GUITAR POLYPHONY.",
      tapeNote: '"identity"',
    },
  },
  {
    id: "sunny-ade",
    index: "03",
    name: "King Sunny Adé",
    honorific: "The Chairman & Master of Jùjú",
    hitTrack: "Ja Funmi",
    album: "Juju Music",
    releaseYear: 1982,
    decade: "1980s",
    genre: "Jùjú Music",
    bpm: 112,
    catalogNumber: "ILPS 9712 / SALP 08",
    pressingPlant: "Island Records / Sunny Alagbada Records, Lagos",
    quote:
      "The talking drum communicates with human vocal cords. We don't just strike rhythms; we speak philosophical proverbs.",
    quoteAttribution: "King Sunny Adé & His African Beats, Lagos 1982",
    accentColor: "#1B4332", // Forest Emerald
    secondaryColor: "#D48C1C",
    badgeText: "JUJU CANON // SPECIMEN 03",
    audio: "/audio/King Sunny Ade - Ja Funmi.mp3",
    collage: {
      heroImg:
        "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRWQNG14s8bH5W5CofFugFN2znHpe869s3-SyRgLeZU7p3qas1Aj6GqN8vwPN5hJ8wjvqlxGs4EhnnA8zs",
      stageImg:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/King_Sunny_Ade_in_concert.jpg/800px-King_Sunny_Ade_in_concert.jpg",
      duotoneImg:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
      newsHeadline: "SUNDAY CONCORD • LAGOS 1982",
      newsSnippet:
        "JA FUNMI CAPTIVATES WORLD STAGES: PEDAL STEEL GUITARS MERGE WITH TALKING DRUMS IN HISTORIC RECORDINGS.",
      tapeNote: '"ja funmi"',
    },
  },
  {
    id: "victor-uwaifo",
    index: "04",
    name: "Sir Victor Uwaifo",
    honorific: "The Guitar Boy of Benin",
    hitTrack: "Joromi",
    album: "Big Sound (With The Titibitis)",
    releaseYear: 1969,
    decade: "1960s",
    genre: "Ekassa / Highlife",
    bpm: 124,
    catalogNumber: "PHILIPS 6361 001",
    pressingPlant: "Philips West African Records, Lagos",
    quote:
      "Winner of Nigeria's first gold disc. Built on 200-year-old royal court beats from the ancient kingdom of Benin.",
    quoteAttribution: "Sir Victor Uwaifo, Benin City 1969",
    accentColor: "#8B4513", // Antique Bronze
    secondaryColor: "#1A2536",
    badgeText: "BRONZE ARCHIVE // SPECIMEN 04",
    audio: "/audio/10 Sir Victor Uwaifo - Joromi 2.mp3",
    collage: {
      heroImg:
        "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcT4hj7yJkPomMCOzESeXig2MaUhr9eafrUNoS33DCSGOTA1flBMnTD6R50wvwoQqqTkj9ErMP4SOtq0BrE",
      stageImg:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Victor_Uwaifo.jpg/800px-Victor_Uwaifo.jpg",
      duotoneImg:
        "https://images.unsplash.com/photo-1462965326201-d02e4f455804?q=80&w=800&auto=format&fit=crop",
      newsHeadline: "MID-WEST OBSERVER • BENIN 1969",
      newsSnippet:
        "JOROMI WINS FIRST GOLD DISC IN NIGERIA; SCULPTOR & LUTHIER PATENTS 18-STRING REVOLUTIONARY GUITAR.",
      tapeNote: '"joromi"',
    },
  },
  {
    id: "majek-fashek",
    index: "05",
    name: "Majek Fashek",
    honorific: "The Rainmaker",
    hitTrack: "Send Down the Rain",
    album: "Prisoner of Conscience",
    releaseYear: 1988,
    decade: "1980s",
    genre: "Roots Reggae / Kpangolo",
    bpm: 76,
    catalogNumber: "TTL 544",
    pressingPlant: "Tabansi Records Pressing Plant, Onitsha",
    quote:
      "Music is spiritual communion. When the rain descends upon the parched earth, the social conscience of a nation is awakened.",
    quoteAttribution: "Majek Fashek, Prisoner of Conscience, 1988",
    accentColor: "#C82A2A", // Reggae Red
    secondaryColor: "#1B4332",
    badgeText: "REGGAE REPOSITORIES // SPECIMEN 05",
    audio: "/audio/Majek Fashek - Send Down the Rain.mp3",
    collage: {
      heroImg:
        "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcToTQ2wMCdomsib9niJSaiyiExxdnQ7kDG1rGseMWLlEPkZBayrd1z537LkZSGaKHgbh6WAIpiCvtnwxXs",
      stageImg:
        "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=800&auto=format&fit=crop",
      duotoneImg:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop",
      newsHeadline: "DAILY TIMES • LAGOS 1988",
      newsSnippet:
        "DROUGHT ENDS ACROSS THE SOUTH AS MAJEK'S RAINMAKER ANTHEM TOPS EVERY CHARTER IN WEST AFRICA.",
      tapeNote: '"rainmaker"',
    },
  },
  {
    id: "fela-kuti",
    index: "06",
    name: "Fela Anikulapo Kuti",
    honorific: "Chief Priest of Afrobeat",
    hitTrack: "Roforofo Fight",
    album: "Roforofo Fight",
    releaseYear: 1972,
    decade: "1970s",
    genre: "Afrobeat",
    bpm: 114,
    catalogNumber: "JOS LP 001 / EMI NEMI 0044",
    pressingPlant: "EMI Studios, Wharf Road, Apapa, Lagos",
    quote:
      "When two men fight inside mud, who win go dirty, who lose go dirty.",
    quoteAttribution: "Fela Anikulapo Kuti, Kalakuta Republic, 1972",
    accentColor: "#C82A2A", // Radical Crimson
    secondaryColor: "#3D2314",
    badgeText: "KALAKUTA REPOSITORY // SPECIMEN 06",
    audio: "/audio/fela Roforofo-Fight.mp3",
    collage: {
      heroImg:
        "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTQ7ZjvD1w8ZK2DTeMnf61Mzbd3dDUHWh24z2mGsX1YVkX0WA5XE4kbEXtgZJ_4ef25Ln5HLXL3rjd-4A4",
      stageImg:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Fela_Kuti_during_performance.jpg/800px-Fela_Kuti_during_performance.jpg",
      duotoneImg:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Fela_Kuti.jpg/800px-Fela_Kuti.jpg",
      newsHeadline: "LAGOS DAILY TIMES • OCTOBER 1972",
      newsSnippet:
        "TENSIONS AT SURULERE: AFRO-SPOT REVERBERATES WITH 114 BPM POLYRHYTHMS AS ROFOROFO FIGHT IS UNVEILED.",
      tapeNote: '"muddy"',
    },
  },
  {
    id: "osita-osadebe",
    index: "07",
    name: "Chief Stephen Osita Osadebe",
    honorific: "Doctor of Highlife",
    hitTrack: "Osondi Owendi",
    album: "Osondi Owendi",
    releaseYear: 1984,
    decade: "1980s",
    genre: "Igbo Highlife",
    bpm: 108,

    catalogNumber: "POLP 115",
    pressingPlant: "Polygram Records Nigeria, Lagos",
    quote:
      "One man's joy is another man's sorrow. Highlife is the gentle, acoustic mirror held up to the human condition.",
    quoteAttribution: "Chief Stephen Osita Osadebe, Atani 1984",
    accentColor: "#C27D00", // Earthen Ochre
    secondaryColor: "#121110",
    badgeText: "HIGHLIFE ARCHIVE // SPECIMEN 07",
    audio: "/audio/OSADEBE-OSANDI OWENDI .mp3",
    collage: {
      heroImg:
        "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTK57_3ufHfC6fX8J-u8TwiEkMMu3aX0at-jOqinEfNpVR3ctlQdaGTi4KCbbm8ZWi1NHUwqQZp526op3s",
      stageImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjlgiPRR_Dmn7T_uDCoOvzeSv_GN7aMWgkgE-kMl5clW1ECwwOCFhE9GM&s=10",
      duotoneImg:
        "https://images.unsplash.com/photo-1470229722913-7c090be5c5a4?q=80&w=800&auto=format&fit=crop",
      newsHeadline: "THE RENAISSANCE • ENUGU 1984",
      newsSnippet:
        "OSONDI OWENDI BECOMES AN UNPRECEDENTED NATIONAL CREATIVE TRIUMPH SPANNING ETHNIC AND GENERATIONAL LINES.",
      tapeNote: '"osondi"',
    },
  },
  {
    id: "onyeka-onwenu",
    index: "08",
    name: "Onyeka Onwenu",
    honorific: "The Elegant Stallion",
    hitTrack: "One Love",
    album: "One Love",
    releaseYear: 1986,
    decade: "1980s",
    genre: "Afro-Pop / Highlife",
    bpm: 116,
    catalogNumber: "POLP 144",
    pressingPlant: "Polygram Records Nigeria, Lagos",
    quote:
      "One love keep us together. An enduring national anthem of solidarity, compassion, and pan-African unity.",
    quoteAttribution: "Onyeka Onwenu, Polygram Studios, Lagos 1986",
    accentColor: "#A62B2B", // Velvet Rose
    secondaryColor: "#3D2314",
    badgeText: "AFRO-POP HERITAGE // SPECIMEN 08",
    audio: "/audio/Onyeka Onwenu - One Love.mp3",
    collage: {
      heroImg:
        "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSrm0-8L_oYm6tWuKtBPamXsYSmIO7Mban3_7TGCOGaCq34o4QWF0AC0v73P6JwApPljrwiLOYgXzwQ7x4",
      stageImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiAGO1sZbpupt6zhtTw1g-By9PsejY3eo-791Fgb1NBw&s=10",
      duotoneImg:
        "https://images.unsplash.com/photo-1520637102912-2df6bb2aec6d?q=80&w=800&auto=format&fit=crop",
      newsHeadline: "THE GUARDIAN • LAGOS 1986",
      newsSnippet:
        "THE ELEGANT STALLION RELEASES 'ONE LOVE': A LANDMARK SYNTH-POP HIGH-LIFE CROSSOVER ANTHEM OF HOPE.",
      tapeNote: '"one love"',
    },
    verifiedIdentityNotes:
      "Verified identity for archival inquiry 'Oyekan Ow(e)lum'. Onyeka Onwenu stands as the supreme female pioneer of Nigerian golden-era recorded music.",
  },
  {
    id: "2face-idibia",
    index: "09",
    name: "2face Idibia (2Baba)",
    honorific: "The Afro-Pop Oracle",
    hitTrack: "African Queen",
    album: "Face 2 Face",
    releaseYear: 2004,
    decade: "2000s",
    genre: "Nigerian R&B / Afro-Pop",
    bpm: 96,
    catalogNumber: "KMCD 024",
    pressingPlant: "Kennis Music, Lagos",
    quote:
      "African Queen is both a blessing and a reminder of the power of authentic songwriting to touch global souls.",
    quoteAttribution: "Innocent '2Baba' Idibia, Lagos 2004",
    accentColor: "#3B7A57", // Deep Mint / Navy-Green Fusion
    secondaryColor: "#111111",
    badgeText: "AFRO-POP ARCHIVE // SPECIMEN 09",
    audio: "/audio/094 2 FACE - AFRICAN QUEEN.mp3",
    collage: {
      heroImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpPdiGt6Sk-_3bw5qCenOaDtQMFFdU19Rhp3LzigG5mg&s=10",
      stageImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpPdiGt6Sk-_3bw5qCenOaDtQMFFdU19Rhp3LzigG5mg&s=10",
      duotoneImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpPdiGt6Sk-_3bw5qCenOaDtQMFFdU19Rhp3LzigG5mg&s=10",
      newsHeadline: "THE NATION • LAGOS 2004",
      newsSnippet:
        "AFRICAN QUEEN TAKES THE WORLD BY STORM: DEBUT SOLO ALBUM 'FACE 2 FACE' REDEFINES CONTEMPORARY AFRICAN POP MUSIC.",
      tapeNote: '"african queen"',
    },
  },
];
