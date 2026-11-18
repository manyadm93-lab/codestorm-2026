import { useMemo, useState } from 'react';
import {
  Bookmark,
  Calendar,
  CheckCircle2,
  MapPin,
  Search,
  Users,
} from 'lucide-react';
import {
  CampusEvent,
  EventCategory,
  EventRegistration,
} from '../types/campus';
import { ResilientImage } from './ResilientImage';

interface EventsExplorerProps {
  events: CampusEvent[];
  registrations: EventRegistration[];
  savedEventIds: string[];
  onToggleSaveEvent: (eventId: string) => void;
  onSelectEventToRegister: (event: CampusEvent) => void;
  onCancelRegistration: (eventId: string) => void;
}

const CATEGORIES: EventCategory[] = [
  'All',
  'Hackathon',
  'Workshop',
  'Seminar',
  'Technical',
  'Cultural',
];

export function EventsExplorer({
  events,
  registrations,
  savedEventIds,
  onToggleSaveEvent,
  onSelectEventToRegister,
  onCancelRegistration,
}: EventsExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<EventCategory>('All');
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const registeredIds = useMemo(
    () => new Set(registrations.map((r) => r.eventId)),
    [registrations]
  );

  const filteredEvents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return events.filter((event) => {
      if (activeCategory !== 'All' && event.category !== activeCategory) {
        return false;
      }
      if (showSavedOnly && !savedEventIds.includes(event.id)) {
        return false;
      }
      if (!q) return true;
      return (
        event.title.toLowerCase().includes(q) ||
        event.summary.toLowerCase().includes(q) ||
        event.organizer.toLowerCase().includes(q) ||
        event.venue.toLowerCase().includes(q) ||
        event.category.toLowerCase().includes(q)
      );
    });
  }, [events, activeCategory, searchQuery, showSavedOnly, savedEventIds]);

  return (
    <section
      id="events"
      className="border-b border-slate-200/80 bg-white py-14 transition-colors dark:border-slate-800/80 dark:bg-[#090D16] sm:py-18"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
              01. Smart Event Explorer
            </p>
            <h2
              className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
              style={{ textWrap: 'balance' }}
            >
              Upcoming Campus Events & Sprints
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Search by keyword, filter by event format, bookmark sessions for later,
              and reserve your seat directly with your RIT USN.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-mono tabular-nums font-medium text-slate-900 dark:text-slate-100">
              {filteredEvents.length}
            </span>
            <span>of {events.length} events shown</span>
          </div>
        </div>

        {/* Search + Category Filter Controls */}
        <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 lg:max-w-sm">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events, venues, organizers..."
              aria-label="Search campus events"
              className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:bg-slate-900"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div
              role="tablist"
              aria-label="Event categories"
              className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-900"
            >
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      isActive
                        ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-800 dark:text-blue-400'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setShowSavedOnly((prev) => !prev)}
              aria-pressed={showSavedOnly}
              className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                showSavedOnly
                  ? 'border-violet-300 bg-violet-50 text-violet-800 dark:border-violet-700 dark:bg-violet-950/60 dark:text-violet-300'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark
                className={`h-3.5 w-3.5 ${showSavedOnly ? 'fill-current' : ''}`}
                aria-hidden="true"
              />
              Bookmarked ({savedEventIds.length})
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-slate-700 dark:bg-slate-900/50">
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              No matching campus events found
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Try clearing your search query or switching back to all event categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                setShowSavedOnly(false);
              }}
              className="mt-4 inline-flex min-h-[40px] items-center rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              Reset Event Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => {
              const isRegistered = registeredIds.has(event.id);
              const isSaved = savedEventIds.includes(event.id);
              const totalRegistered =
                event.registeredBase + (isRegistered ? 1 : 0);
              const seatsLeft = Math.max(0, event.capacity - totalRegistered);

              return (
                <article
                  key={event.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-blue-700"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <ResilientImage
                      src={event.imageUrl}
                      alt={event.imageAlt}
                      fallbackTitle={event.title}
                      className="h-full w-full object-cover transition-transform duration-200 hover:scale-[1.02]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      {/* Unboxed Zero-Pill Metadata */}
                      <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex min-w-0 items-center gap-1.5 truncate">
                          <span className="font-semibold text-blue-700 dark:text-blue-400">
                            {event.category}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">
                            {event.date}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => onToggleSaveEvent(event.id)}
                          aria-label={
                            isSaved
                              ? `Remove ${event.title} bookmark`
                              : `Bookmark ${event.title}`
                          }
                          aria-pressed={isSaved}
                          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                            isSaved
                              ? 'text-violet-700 dark:text-violet-400'
                              : 'text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200'
                          }`}
                        >
                          <Bookmark
                            className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`}
                          />
                        </button>
                      </div>

                      <h3 className="mt-2 font-display text-lg font-bold leading-snug text-slate-900 dark:text-white">
                        {event.title}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {event.summary}
                      </p>

                      <dl className="mt-4 space-y-1.5 border-t border-slate-100 pt-3.5 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                          <dt className="sr-only">Time</dt>
                          <dd className="font-mono tabular-nums">{event.time}</dd>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                          <dt className="sr-only">Venue</dt>
                          <dd className="truncate">{event.venue}</dd>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                          <dt className="sr-only">Organizer and seats</dt>
                          <dd className="truncate">
                            {event.organizer} ·{' '}
                            <span className="font-mono tabular-nums font-medium text-slate-800 dark:text-slate-200">
                              {seatsLeft} seats left
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="mt-5 flex items-center gap-2 pt-2">
                      {isRegistered ? (
                        <>
                          <div className="flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 dark:border-emerald-800/70 dark:bg-emerald-950/50 dark:text-emerald-300">
                            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                            Registered
                          </div>
                          <button
                            type="button"
                            onClick={() => onCancelRegistration(event.id)}
                            className="min-h-[40px] rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 whitespace-nowrap shrink-0 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onSelectEventToRegister(event)}
                          className="min-h-[42px] w-full rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-500"
                        >
                          Register Now
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
