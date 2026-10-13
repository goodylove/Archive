const LINKS = [
  { label: 'Index', href: '#index' },
  { label: 'Exhibitions', href: '#exhibitions' },
  { label: 'About', href: '#about' },
]

export function SiteNav() {
  return (
    <header className="relative z-20 shrink-0 border-b-2 border-ink">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[2200px] items-stretch justify-between pl-4 pr-0 sm:px-8 lg:px-10 xl:px-12"
      >
        <a
          href="/"
          className="flex items-baseline gap-3 py-2.5 sm:py-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          <span className="font-serif text-xl font-black tracking-tight sm:text-2xl xl:text-3xl">ARCHIVE</span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft sm:inline">
            NG / Sonic Collection
          </span>
        </a>
        <ul className="flex items-stretch">
          {LINKS.map((link) => (
            <li key={link.label} className="flex border-l-2 border-ink first:border-l-0 sm:first:border-l-2">
              <a
                href={link.href}
                className="flex items-center px-3 sm:px-5 xl:px-6 font-mono text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper focus-visible:outline-none sm:text-xs xl:text-sm"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
