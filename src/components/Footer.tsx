import { ExternalLink } from 'lucide-react';
import { OfficialLogosBar } from './OfficialLogosBar';

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Campus Events', href: '#events' },
  { label: 'Learning Resources', href: '#resources' },
  { label: 'Student Clubs', href: '#clubs' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  {
    label: 'GDG RIT Hassan',
    href: 'https://gdg-rit-website.vercel.app/',
  },
  {
    label: 'Instagram (@gdg_club_rit)',
    href: 'https://www.instagram.com/gdg_club_rit/',
  },
  {
    label: 'CODESTORM 2026 GitHub',
    href: 'https://github.com/Yashawantha26/codestorm-2026',
  },
  {
    label: 'GDG WhatsApp Community',
    href: 'https://chat.whatsapp.com/Ep2J8GpmRBoF0Fj3A5eks1',
  },
];

export function Footer() {
  return (
    <footer className="bg-white py-12 transition-colors dark:bg-[#090D16]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Official Logos Display */}
        <div className="pb-10">
          <p className="mb-3 text-xs font-medium text-slate-500 dark:text-slate-400">
            Institutional & Community Affiliations
          </p>
          <OfficialLogosBar variant="footer" />
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-slate-200 pt-10 dark:border-slate-800 md:grid-cols-12">
          <div className="md:col-span-5">
            <a
              href="#home"
              className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white"
            >
              RIT Student Hub
            </a>
            <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Campus Connect platform built for CODESTORM 2026 – November Edition,
              Challenge 01, supporting Rajeev Institute of Technology, Hassan.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              Navigation
            </p>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-600 transition-colors hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              Community & Social Links
            </p>
            <ul className="mt-3 space-y-2">
              {SOCIAL_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-400"
                  >
                    {item.label}
                    <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} RIT Student Hub – Campus Connect · Rajeev
            Institute of Technology, Hassan.
          </p>
          <p>CODESTORM 2026 – Challenge 01 · GDG on Campus RIT Hassan</p>
        </div>
      </div>
    </footer>
  );
}
