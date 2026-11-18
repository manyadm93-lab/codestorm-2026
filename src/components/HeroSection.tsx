import { ArrowRight, BookOpen, Calendar, Users } from 'lucide-react';
import { FEATURED_ACTIVITIES, HERO_IMAGE } from '../data/campusData';
import { OfficialLogosBar } from './OfficialLogosBar';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  totalEvents: number;
  totalResources: number;
  totalClubs: number;
  userRegistrationsCount: number;
  userJoinedClubsCount: number;
}

export function HeroSection({
  totalEvents,
  totalResources,
  totalClubs,
  userRegistrationsCount,
  userJoinedClubsCount,
}: HeroSectionProps) {
  const kpis = [
    {
      label: 'Upcoming Campus Events',
      value: `${totalEvents}`,
      detail: `${userRegistrationsCount} registered by you`,
    },
    {
      label: 'Verified Study Resources',
      value: `${totalResources}`,
      detail: 'Across 6 engineering subjects',
    },
    {
      label: 'Active Student Chapters',
      value: `${totalClubs}`,
      detail: `${userJoinedClubsCount} joined by you`,
    },
    {
      label: 'Campus Community Members',
      value: '1,169+',
      detail: 'RIT Hassan across all branches',
    },
  ];

  return (
    <section
      id="home"
      className="border-b border-slate-200/80 bg-white pt-10 pb-14 transition-colors dark:border-slate-800/80 dark:bg-[#090D16] sm:pt-14 sm:pb-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Balanced 2-Column Hero Split */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-blue-700 dark:text-blue-400">
                Rajeev Institute of Technology, Hassan · Campus Connect
              </p>

              <h1
                className="mt-3 font-display font-extrabold tracking-tight text-slate-900 dark:text-white"
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.65rem)',
                  lineHeight: 1.08,
                  textWrap: 'balance',
                }}
              >
                RIT Student Hub
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                Your centralized campus portal to discover technical hackathons and
                seminars, access semester-wise engineering notes, and connect with
                student-led developer and robotics chapters at RIT Hassan.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#events"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  Explore Now
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href="#resources"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 whitespace-nowrap shrink-0 transition-colors hover:border-violet-300 hover:bg-violet-50/50 hover:text-violet-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-violet-500/60 dark:hover:bg-violet-950/30"
                >
                  Browse Resources
                </a>
              </div>
            </div>

            {/* Quick-Access Feature Links */}
            <div className="mt-9 grid grid-cols-1 gap-3 border-t border-slate-200 pt-6 dark:border-slate-800 sm:grid-cols-3">
              <a
                href="#events"
                className="group rounded-lg border border-slate-200 bg-slate-50/70 p-3.5 transition-colors hover:border-blue-300 hover:bg-blue-50/40 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
              >
                <Calendar className="h-4 w-4 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold text-slate-900 group-hover:text-blue-700 dark:text-slate-100 dark:group-hover:text-blue-400">
                  Smart Events
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Filter & register
                </p>
              </a>

              <a
                href="#resources"
                className="group rounded-lg border border-slate-200 bg-slate-50/70 p-3.5 transition-colors hover:border-violet-300 hover:bg-violet-50/40 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-violet-700 dark:hover:bg-violet-950/30"
              >
                <BookOpen className="h-4 w-4 text-violet-700 dark:text-violet-400" aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold text-slate-900 group-hover:text-violet-700 dark:text-slate-100 dark:group-hover:text-violet-400">
                  Study Vault
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Notes & lab manuals
                </p>
              </a>

              <a
                href="#clubs"
                className="group rounded-lg border border-slate-200 bg-slate-50/70 p-3.5 transition-colors hover:border-blue-300 hover:bg-blue-50/40 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
              >
                <Users className="h-4 w-4 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold text-slate-900 group-hover:text-blue-700 dark:text-slate-100 dark:group-hover:text-blue-400">
                  Student Clubs
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Chapters & teams
                </p>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-72 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900 sm:h-96 lg:h-full">
              <ResilientImage
                src={HERO_IMAGE.url}
                alt={HERO_IMAGE.alt}
                fallbackTitle="RIT Hassan Innovation & Student Collaboration Hub"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent p-5">
                <p className="text-xs font-medium text-blue-200">
                  CODESTORM 2026 · November Edition
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  Think. Create. Innovate. Build together at RIT Hassan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Campus Pulse KPI Strip */}
        <div className="mt-10 grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70 lg:grid-cols-4">
          {kpis.map((item) => (
            <div key={item.label} className="min-w-0">
              <p className="font-mono text-2xl font-semibold tabular-nums text-slate-900 dark:text-white sm:text-3xl">
                {item.value}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                {item.label}
              </p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Official Institutional Logos Bar */}
        <div className="mt-8">
          <p className="mb-3 text-xs font-medium text-slate-500 dark:text-slate-400">
            Official Campus & Academic Organizers
          </p>
          <OfficialLogosBar variant="band" />
        </div>

        {/* Featured Campus Activities */}
        <div className="mt-12">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                Featured Campus Activities
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Priority highlights curated for this semester at Rajeev Institute of Technology.
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
            {FEATURED_ACTIVITIES.map((activity) => (
              <article
                key={activity.index}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-blue-700"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-mono font-semibold text-blue-700 dark:text-blue-400">
                      {activity.index}.
                    </span>
                    <span>{activity.meta}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-slate-900 dark:text-white">
                    {activity.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {activity.description}
                  </p>
                </div>

                <div className="mt-5 pt-3">
                  <a
                    href={activity.targetSection}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {activity.actionLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
