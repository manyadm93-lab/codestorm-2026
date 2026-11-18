import { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import {
  ClubMembership,
  EventRegistration,
  LearningResource,
} from '../types/campus';

interface CampusPassDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  registrations: EventRegistration[];
  savedResources: LearningResource[];
  memberships: ClubMembership[];
  onCancelRegistration: (eventId: string) => void;
  onRemoveSavedResource: (resourceId: string) => void;
  onLeaveClub: (clubId: string) => void;
  onClearAllLocal: () => void;
  totalEventsAvailable: number;
  totalResourcesAvailable: number;
  totalClubsAvailable: number;
}

export function CampusPassDrawer({
  isOpen,
  onClose,
  registrations,
  savedResources,
  memberships,
  onCancelRegistration,
  onRemoveSavedResource,
  onLeaveClub,
  onClearAllLocal,
  totalEventsAvailable,
  totalResourcesAvailable,
  totalClubsAvailable,
}: CampusPassDrawerProps) {
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const eventPct = Math.min(
    100,
    Math.round((registrations.length / Math.max(1, totalEventsAvailable)) * 100)
  );
  const resPct = Math.min(
    100,
    Math.round((savedResources.length / Math.max(1, totalResourcesAvailable)) * 100)
  );
  const clubPct = Math.min(
    100,
    Math.round((memberships.length / Math.max(1, totalClubsAvailable)) * 100)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="campus-pass-title"
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm"
    >
      <div className="flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#0B101B]">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div>
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
              Local Browser Workspace
            </p>
            <h2
              id="campus-pass-title"
              className="font-display text-lg font-bold text-slate-900 dark:text-white"
            >
              My Campus Pass
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close My Campus Pass drawer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
          {/* Interactive Dashboard-Style Statistics */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              Engagement Overview
            </p>

            <div className="mt-3 space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span>Events Registered</span>
                  <span className="font-mono tabular-nums font-semibold">
                    {registrations.length} / {totalEventsAvailable}
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all"
                    style={{ width: `${eventPct}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span>Study Resources Saved</span>
                  <span className="font-mono tabular-nums font-semibold">
                    {savedResources.length} / {totalResourcesAvailable}
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-violet-600 transition-all"
                    style={{ width: `${resPct}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span>Clubs Joined</span>
                  <span className="font-mono tabular-nums font-semibold">
                    {memberships.length} / {totalClubsAvailable}
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-emerald-600 transition-all"
                    style={{ width: `${clubPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Registered Events */}
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Calendar className="h-4 w-4 text-blue-700 dark:text-blue-400" aria-hidden="true" />
              <h3>Registered Events ({registrations.length})</h3>
            </div>
            {registrations.length === 0 ? (
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                No event registrations yet. Register for an event to generate a
                local pass.
              </p>
            ) : (
              <ul className="mt-2.5 space-y-2">
                {registrations.map((reg) => (
                  <li
                    key={reg.eventId}
                    className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-800"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-slate-900 dark:text-white">
                        {reg.eventTitle}
                      </p>
                      <p className="mt-0.5 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {reg.usn} · {reg.branch} · {reg.semester}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onCancelRegistration(reg.eventId)}
                      aria-label={`Cancel registration for ${reg.eventTitle}`}
                      className="shrink-0 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Saved Study Notes */}
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <BookOpen className="h-4 w-4 text-violet-700 dark:text-violet-400" aria-hidden="true" />
              <h3>Saved Study Resources ({savedResources.length})</h3>
            </div>
            {savedResources.length === 0 ? (
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Bookmark notes or lab manuals in the Learning Resource Hub to
                access them quickly here.
              </p>
            ) : (
              <ul className="mt-2.5 space-y-2">
                {savedResources.map((res) => (
                  <li
                    key={res.id}
                    className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-800"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-slate-900 dark:text-white">
                        {res.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                        {res.subject} · {res.semester}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveSavedResource(res.id)}
                      aria-label={`Remove ${res.title} from saved list`}
                      className="shrink-0 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Joined Clubs */}
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Users className="h-4 w-4 text-blue-700 dark:text-blue-400" aria-hidden="true" />
              <h3>Student Club Memberships ({memberships.length})</h3>
            </div>
            {memberships.length === 0 ? (
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Join any campus chapter in the Student Club Directory to track
                your active memberships.
              </p>
            ) : (
              <ul className="mt-2.5 space-y-2">
                {memberships.map((mem) => (
                  <li
                    key={mem.clubId}
                    className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-800"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-slate-900 dark:text-white">
                        {mem.clubName}
                      </p>
                      <p className="mt-0.5 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {mem.usn} · Joined {mem.joinedAt}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onLeaveClub(mem.clubId)}
                      aria-label={`Leave ${mem.clubName}`}
                      className="shrink-0 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-200 px-6 py-4 dark:border-slate-800">
          {confirmReset ? (
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-rose-700 dark:text-rose-400">
                Clear all saved local data?
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClearAllLocal();
                    setConfirmReset(false);
                  }}
                  className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700"
                >
                  Confirm Clear
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Stored locally on this browser.
              </p>
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="text-xs font-medium text-slate-600 underline-offset-4 hover:text-rose-600 hover:underline dark:text-slate-400 dark:hover:text-rose-400"
              >
                Reset Local Pass
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
