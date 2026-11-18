import { FormEvent, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  Send,
  User,
} from 'lucide-react';
import { ContactSubmission } from '../types/campus';

interface ContactSectionProps {
  submissions: ContactSubmission[];
  onSubmitMessage: (submission: ContactSubmission) => void;
}

interface ContactErrors {
  name?: string;
  email?: string;
  message?: string;
}

const TOPICS = [
  'Event Inquiry',
  'Study Resource Suggestion',
  'Club Collaboration',
  'General Campus Feedback',
];

export function ContactSection({
  submissions,
  onSubmitMessage,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const validate = (): boolean => {
    const next: ContactErrors = {};
    if (name.trim().length < 2) {
      next.name = 'Please enter your name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (message.trim().length < 15) {
      next.message = 'Please write a message of at least 15 characters.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmitMessage({
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      topic,
      message: message.trim(),
      submittedAt: new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });

    setName('');
    setEmail('');
    setTopic(TOPICS[0]);
    setMessage('');
    setErrors({});
    setSubmittedNotice(true);
  };

  return (
    <section
      id="contact"
      className="border-b border-slate-200/80 bg-slate-50 py-14 transition-colors dark:border-slate-800/80 dark:bg-[#0D1320] sm:py-18"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Campus Contact Details */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
              Contact & Coordination
            </p>
            <h2
              className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
              style={{ textWrap: 'balance' }}
            >
              Connect with the RIT Campus Hub Team
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Have an upcoming departmental workshop, study resource update, or
              student club question? Reach out to the Campus Connect & GDG on
              Campus coordination desk.
            </p>

            <dl className="mt-7 space-y-4 border-t border-slate-200 pt-6 text-sm dark:border-slate-800">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                <div>
                  <dt className="font-semibold text-slate-900 dark:text-white">
                    Campus Address
                  </dt>
                  <dd className="mt-0.5 text-slate-600 dark:text-slate-400">
                    Rajeev Institute of Technology, Plot 1-D, Growth Centre,
                    Industrial Area, B.M. Road, Hassan, Karnataka 573201
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="mt-0.5 h-4 w-4 shrink-0 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                <div>
                  <dt className="font-semibold text-slate-900 dark:text-white">
                    GDG on Campus – RIT Hassan Coordinator
                  </dt>
                  <dd className="mt-0.5 text-slate-600 dark:text-slate-400">
                    Yashawantha H M · Dept. of Computer Science & Engineering
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                <div>
                  <dt className="font-semibold text-slate-900 dark:text-white">
                    Official Channels
                  </dt>
                  <dd className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium">
                    <a
                      href="mailto:gdg.rit.hassan@gmail.com"
                      className="text-blue-700 underline-offset-4 hover:underline dark:text-blue-400"
                    >
                      gdg.rit.hassan@gmail.com
                    </a>
                    <a
                      href="https://gdg-rit-website.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-700 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-400"
                    >
                      GDG RIT Website
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                    <a
                      href="https://www.instagram.com/gdg_club_rit/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-700 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-400"
                    >
                      @gdg_club_rit
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                    <a
                      href="https://github.com/Yashawantha26/codestorm-2026"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-700 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-400"
                    >
                      CODESTORM GitHub
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          {/* Validated Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Send a Campus Inquiry
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Validated form submissions are saved locally in your browser
                session log.
              </p>

              {submittedNotice && (
                <div
                  role="status"
                  className="mt-4 flex items-start gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-900 dark:border-emerald-800/70 dark:bg-emerald-950/50 dark:text-emerald-200"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <p className="font-semibold">
                      Inquiry recorded locally ({submissions.length} total)
                    </p>
                    <p className="mt-0.5">
                      For direct urgent responses, please also reach out via{' '}
                      <a
                        href="mailto:gdg.rit.hassan@gmail.com"
                        className="underline"
                      >
                        gdg.rit.hassan@gmail.com
                      </a>
                      .
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                    {errors.name && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                    {errors.email && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Topic
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    {TOPICS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share details about your inquiry, event proposal, or study resource request..."
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  {errors.message && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    All fields marked * are required.
                  </span>

                  <button
                    type="submit"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-500"
                  >
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
