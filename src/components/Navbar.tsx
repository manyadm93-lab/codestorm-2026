import { useState } from 'react';
import { Menu, X, Sun, Moon, BookmarkCheck } from 'lucide-react';
import { ThemeMode } from '../types/campus';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenPass: () => void;
  passCount: number;
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Resources', href: '#resources' },
  { label: 'Clubs', href: '#clubs' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({
  theme,
  onToggleTheme,
  onOpenPass,
  passCount,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-colors dark:border-slate-800/90 dark:bg-[#090D16]/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:text-white dark:hover:text-blue-400"
        >
          RIT Student Hub
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 text-sm font-medium text-slate-600 whitespace-nowrap shrink-0 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:text-slate-300 dark:hover:text-blue-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action on desktop + mobile toggle on small screens */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#events"
            className="hidden items-center justify-center rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-500 md:inline-flex"
          >
            Explore Hub
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-[#090D16] md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="flex min-h-[44px] items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                onOpenPass();
                setMobileOpen(false);
              }}
              className="flex min-h-[44px] w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              <span className="flex items-center gap-2">
                <BookmarkCheck className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                My Campus Pass
              </span>
              <span className="font-mono text-xs tabular-nums text-blue-700 dark:text-blue-400">
                {passCount} saved
              </span>
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              className="flex min-h-[44px] w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              <span className="flex items-center gap-2">
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="h-4 w-4 text-violet-700" />
                )}
                {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {theme === 'dark' ? 'Dark' : 'Light'}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
