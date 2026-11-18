import { BookmarkCheck, Moon, Sun } from 'lucide-react';
import { ThemeMode } from '../types/campus';

interface CampusToolbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenPass: () => void;
  registrationsCount: number;
  savedResourcesCount: number;
  joinedClubsCount: number;
}

export function CampusToolbar({
  theme,
  onToggleTheme,
  onOpenPass,
  registrationsCount,
  savedResourcesCount,
  joinedClubsCount,
}: CampusToolbarProps) {
  const totalPassItems =
    registrationsCount + savedResourcesCount + joinedClubsCount;

  return (
    <div className="border-b border-slate-200/80 bg-white py-3.5 transition-colors dark:border-slate-800/80 dark:bg-[#090D16]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-900 dark:text-white">
            Interactive Workspace
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">
            {registrationsCount} Events
          </span>
          <span aria-hidden="true">/</span>
          <span className="font-mono tabular-nums">
            {savedResourcesCount} Notes
          </span>
          <span aria-hidden="true">/</span>
          <span className="font-mono tabular-nums">
            {joinedClubsCount} Clubs
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenPass}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-blue-200 bg-blue-50/70 px-3.5 py-2 text-xs font-semibold text-blue-800 whitespace-nowrap shrink-0 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-blue-800/80 dark:bg-blue-950/60 dark:text-blue-300 dark:hover:bg-blue-900/70"
          >
            <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
            My Campus Pass
            <span className="font-mono tabular-nums">({totalPassItems})</span>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
            }
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-800 whitespace-nowrap shrink-0 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4 text-amber-400" aria-hidden="true" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-violet-700" aria-hidden="true" />
                Dark Mode
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
