import { OFFICIAL_LOGOS } from '../data/campusData';

interface OfficialLogosBarProps {
  variant?: 'band' | 'footer';
}

export function OfficialLogosBar({ variant = 'band' }: OfficialLogosBarProps) {
  const isFooter = variant === 'footer';

  return (
    <div
      className={
        isFooter
          ? 'grid grid-cols-1 gap-4 sm:grid-cols-3'
          : 'grid grid-cols-1 gap-4 md:grid-cols-3'
      }
    >
      {OFFICIAL_LOGOS.map((logo) => (
        <div
          key={logo.id}
          className={`flex items-center gap-4 rounded-xl border p-3.5 transition-colors ${
            isFooter
              ? 'border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/70'
              : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
          }`}
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200/80 bg-white p-1.5">
            <img
              src={logo.src}
              alt={logo.alt}
              referrerPolicy="no-referrer"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
              {logo.name}
            </p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {logo.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
