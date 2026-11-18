import { FormEvent, useState } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { CampusEvent, EventRegistration } from '../types/campus';

interface EventRegistrationModalProps {
  event: CampusEvent | null;
  onClose: () => void;
  onSubmitRegistration: (registration: EventRegistration) => void;
}

interface FormErrors {
  fullName?: string;
  usn?: string;
  email?: string;
}

const BRANCHES = ['CSE', 'ISE', 'AI & ML', 'ECE', 'Mechanical', 'Civil'];
const SEMESTERS = ['1st Sem', '2nd Sem', '3rd Sem', '4th Sem', '5th Sem', '6th Sem', '7th Sem', '8th Sem'];

export function EventRegistrationModal({
  event,
  onClose,
  onSubmitRegistration,
}: EventRegistrationModalProps) {
  const [fullName, setFullName] = useState('');
  const [usn, setUsn] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('CSE');
  const [semester, setSemester] = useState('5th Sem');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  if (!event) return null;

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (fullName.trim().length < 2) {
      nextErrors.fullName = 'Enter your full name (at least 2 characters).';
    }

    const cleanedUsn = usn.trim().toUpperCase();
    if (!/^[1-9][A-Z]{2}\d{2}[A-Z]{2,3}\d{3}$/.test(cleanedUsn)) {
      nextErrors.usn = 'Enter a valid VTU USN format (e.g., 4RA23CS042).';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmitRegistration({
      eventId: event.id,
      eventTitle: event.title,
      fullName: fullName.trim(),
      usn: usn.trim().toUpperCase(),
      email: email.trim(),
      branch,
      semester,
      notes: notes.trim() || undefined,
      submittedAt: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
          <div>
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
              Event Registration · {event.date}
            </p>
            <h3
              id="event-modal-title"
              className="mt-1 font-display text-lg font-bold text-slate-900 dark:text-white"
            >
              {event.title}
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {event.venue} · {event.time}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close registration modal"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="reg-fullname"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              Full Name <span className="text-rose-600">*</span>
            </label>
            <input
              id="reg-fullname"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g., Prajwal Gowda"
              className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            {errors.fullName && (
              <p className="mt-1 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="reg-usn"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                University Seat Number (USN) <span className="text-rose-600">*</span>
              </label>
              <input
                id="reg-usn"
                type="text"
                value={usn}
                onChange={(e) => setUsn(e.target.value.toUpperCase())}
                placeholder="4RA23CS042"
                className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 font-mono text-sm uppercase text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              {errors.usn && (
                <p className="mt-1 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {errors.usn}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="reg-email"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                Student Email <span className="text-rose-600">*</span>
              </label>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@rithassan.ac.in"
                className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              {errors.email && (
                <p className="mt-1 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="reg-branch"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                Department / Branch
              </label>
              <select
                id="reg-branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {BRANCHES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="reg-semester"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                Semester
              </label>
              <select
                id="reg-semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {SEMESTERS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="reg-notes"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              Team Name or Track Preference (Optional)
            </label>
            <input
              id="reg-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Solo participant · Web track"
              className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <p className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-800/80 dark:text-slate-300">
            Note: Passes are stored locally in your browser’s storage for client-side
            campus pass tracking (no external server database is connected).
          </p>

          <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[42px] rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-lg bg-blue-700 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Confirm Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
