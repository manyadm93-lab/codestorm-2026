import { FormEvent, useMemo, useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  MapPin,
  Users,
  X,
} from 'lucide-react';
import { ClubFocus, ClubMembership, StudentClub } from '../types/campus';
import { ResilientImage } from './ResilientImage';

interface ClubsDirectoryProps {
  clubs: StudentClub[];
  memberships: ClubMembership[];
  onJoinClub: (membership: ClubMembership) => void;
  onLeaveClub: (clubId: string) => void;
}

const FOCUS_FILTERS: ClubFocus[] = [
  'All',
  'Software & AI',
  'Hardware & IoT',
  'Design & Media',
  'Community',
];

export function ClubsDirectory({
  clubs,
  memberships,
  onJoinClub,
  onLeaveClub,
}: ClubsDirectoryProps) {
  const [activeFocus, setActiveFocus] = useState<ClubFocus>('All');
  const [selectedClub, setSelectedClub] = useState<StudentClub | null>(null);

  // Join Club Modal State
  const [fullName, setFullName] = useState('');
  const [usn, setUsn] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('CSE');
  const [interestArea, setInterestArea] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const joinedIds = useMemo(
    () => new Set(memberships.map((m) => m.clubId)),
    [memberships]
  );

  const filteredClubs = useMemo(() => {
    if (activeFocus === 'All') return clubs;
    return clubs.filter((club) => club.focus === activeFocus);
  }, [clubs, activeFocus]);

  const handleJoinSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedClub) return;

    if (fullName.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    const cleanedUsn = usn.trim().toUpperCase();
    if (!/^[1-9][A-Z]{2}\d{2}[A-Z]{2,3}\d{3}$/.test(cleanedUsn)) {
      setErrorMsg('Enter a valid VTU USN (e.g., 4RA23CS042).');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Enter a valid email address.');
      return;
    }

    onJoinClub({
      clubId: selectedClub.id,
      clubName: selectedClub.name,
      fullName: fullName.trim(),
      usn: cleanedUsn,
      email: email.trim(),
      branch,
      interestArea: interestArea.trim() || 'General technical sessions',
      joinedAt: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    });

    setFullName('');
    setUsn('');
    setEmail('');
    setInterestArea('');
    setErrorMsg('');
    setSelectedClub(null);
  };

  return (
    <section
      id="clubs"
      className="border-b border-slate-200/80 bg-white py-14 transition-colors dark:border-slate-800/80 dark:bg-[#090D16] sm:py-18"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
              03. Student Club Directory
            </p>
            <h2
              className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
              style={{ textWrap: 'balance' }}
            >
              Campus Chapters & Technical Communities
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Explore active student-led clubs at RIT Hassan, inspect weekly meeting
              schedules and workshops, and submit your membership request.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Club focus areas"
            className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-900"
          >
            {FOCUS_FILTERS.map((focus) => {
              const isActive = activeFocus === focus;
              return (
                <button
                  key={focus}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFocus(focus)}
                  className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isActive
                      ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-800 dark:text-blue-400'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                >
                  {focus}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClubs.map((club) => {
            const isJoined = joinedIds.has(club.id);
            const displayMembers = club.memberCount + (isJoined ? 1 : 0);

            return (
              <article
                key={club.id}
                className="flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-blue-700"
              >
                <div>
                  {club.imageUrl && (
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <ResilientImage
                        src={club.imageUrl}
                        alt={club.imageAlt || club.name}
                        fallbackTitle={club.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-blue-700 dark:text-blue-400">
                        {club.focus}
                      </span>
                      <span className="font-mono tabular-nums">
                        {displayMembers} members
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-lg font-bold leading-snug text-slate-900 dark:text-white">
                      {club.name}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {club.description}
                    </p>

                    <div className="mt-4 border-t border-slate-100 pt-3.5 dark:border-slate-800">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        Regular Activities
                      </p>
                      <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                        {club.activities.map((act) => (
                          <li key={act} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <dl className="mt-4 space-y-1.5 border-t border-slate-100 pt-3.5 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                        <dd>{club.meetingSchedule}</dd>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                        <dd>{club.venue}</dd>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                        <dd>Coordinator: {club.leadName}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  {isJoined ? (
                    <div className="flex items-center gap-2">
                      <div className="flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 dark:border-emerald-800/70 dark:bg-emerald-950/50 dark:text-emerald-300">
                        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                        Member Joined
                      </div>
                      <button
                        type="button"
                        onClick={() => onLeaveClub(club.id)}
                        className="min-h-[40px] rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        Leave
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMsg('');
                        setSelectedClub(club);
                      }}
                      className="min-h-[42px] w-full rounded-lg border border-blue-700 bg-white px-4 py-2 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-blue-500 dark:bg-slate-900 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white"
                    >
                      Join {club.shortName}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Join Club Modal */}
      {selectedClub && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="join-club-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div>
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                  Membership Request · {selectedClub.focus}
                </p>
                <h3
                  id="join-club-title"
                  className="mt-1 font-display text-lg font-bold text-slate-900 dark:text-white"
                >
                  Join {selectedClub.name}
                </h3>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Meets {selectedClub.meetingSchedule} at {selectedClub.venue}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedClub(null)}
                aria-label="Close join club modal"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleJoinSubmit} noValidate className="mt-5 space-y-4">
              {errorMsg && (
                <p className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/50 dark:text-rose-300">
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {errorMsg}
                </p>
              )}

              <div>
                <label
                  htmlFor="club-fullname"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  Full Name *
                </label>
                <input
                  id="club-fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g., Harshitha M"
                  className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="club-usn"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    VTU USN *
                  </label>
                  <input
                    id="club-usn"
                    type="text"
                    value={usn}
                    onChange={(e) => setUsn(e.target.value.toUpperCase())}
                    placeholder="4RA23CS042"
                    className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 font-mono text-sm uppercase text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="club-branch"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Department
                  </label>
                  <select
                    id="club-branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    {['CSE', 'ISE', 'AI & ML', 'ECE', 'Mechanical', 'Civil'].map(
                      (b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="club-email"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  Student Email *
                </label>
                <input
                  id="club-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@rithassan.ac.in"
                  className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="club-interest"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  Skills or Areas You Want to Explore
                </label>
                <input
                  id="club-interest"
                  type="text"
                  value={interestArea}
                  onChange={(e) => setInterestArea(e.target.value)}
                  placeholder="e.g., Frontend React, Cloud Labs, Embedded C"
                  className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <p className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-800/80 dark:text-slate-300">
                Your club membership pass is recorded locally in browser storage
                so you can manage your chapter memberships anytime.
              </p>

              <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedClub(null)}
                  className="min-h-[42px] rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[42px] rounded-lg bg-blue-700 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  Submit Join Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
