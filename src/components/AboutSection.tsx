import { Compass, Layers, Target } from 'lucide-react';

export function AboutSection() {
  return (
    <section
      id="about"
      className="border-b border-slate-200/80 bg-slate-50 py-14 transition-colors dark:border-slate-800/80 dark:bg-[#0D1320] sm:py-18"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
              About Campus Connect
            </p>
            <h2
              className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
              style={{ textWrap: 'balance' }}
            >
              One structured home for academic clarity and campus life
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              RIT Student Hub – Campus Connect brings together event schedules,
              department-verified study materials, and active technical student
              communities at Rajeev Institute of Technology, Hassan.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Instead of scattering announcements across chat threads and lost links,
              students can discover upcoming workshops, bookmark semester notes, and
              join campus chapters from a single accessible workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400">
                <Target className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900 dark:text-white">
                01. Purpose & Objectives
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <li>Centralize upcoming hackathons, tech talks, and workshops.</li>
                <li>Provide fast search across VTU-aligned notes and lab manuals.</li>
                <li>Streamline student onboarding into clubs and peer study groups.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400">
                <Compass className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900 dark:text-white">
                02. Vision & Mission
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Build a self-sustaining peer learning culture across RIT Hassan where
                every student—from first semester to final year—can collaborate, share
                engineering craft, and ship meaningful projects.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:col-span-2">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                  <Layers className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    03. Client-Side Transparency & Local Persistence
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    Your event registrations, bookmarked study notes, contributed links,
                    and club join passes are persisted in your browser’s local storage so
                    your workspace stays intact across reloads without requiring external
                    account logins.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
