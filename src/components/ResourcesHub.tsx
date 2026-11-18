import { FormEvent, useMemo, useState } from 'react';
import {
  AlertCircle,
  Bookmark,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Plus,
  Search,
  X,
} from 'lucide-react';
import { LearningResource, ResourceSubject } from '../types/campus';

interface ResourcesHubProps {
  resources: LearningResource[];
  savedResourceIds: string[];
  onToggleSaveResource: (resourceId: string) => void;
  onAddCustomResource: (resource: LearningResource) => void;
}

const SUBJECTS: ResourceSubject[] = [
  'All',
  'Data Structures',
  'Operating Systems',
  'DBMS & SQL',
  'Web & Cloud',
  'AI & Machine Learning',
  'Engineering Math',
];

export function ResourcesHub({
  resources,
  savedResourceIds,
  onToggleSaveResource,
  onAddCustomResource,
}: ResourcesHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubject, setActiveSubject] = useState<ResourceSubject>('All');
  const [previewResource, setPreviewResource] =
    useState<LearningResource | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Add note form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] =
    useState<Exclude<ResourceSubject, 'All'>>('Data Structures');
  const [newSemester, setNewSemester] = useState('Sem 4');
  const [newFormat, setNewFormat] =
    useState<LearningResource['format']>('PDF Guide');
  const [newContributor, setNewContributor] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [formError, setFormError] = useState('');

  const filteredResources = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return resources.filter((res) => {
      if (activeSubject !== 'All' && res.subject !== activeSubject) {
        return false;
      }
      if (!q) return true;
      return (
        res.title.toLowerCase().includes(q) ||
        res.subject.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q) ||
        res.contributor.toLowerCase().includes(q) ||
        res.semester.toLowerCase().includes(q)
      );
    });
  }, [resources, activeSubject, searchQuery]);

  const handleDownloadStudySheet = (resource: LearningResource) => {
    const lines = [
      `RIT STUDENT HUB – CAMPUS CONNECT`,
      `Study Outline & Resource Sheet`,
      `====================================`,
      `Title: ${resource.title}`,
      `Subject: ${resource.subject} (${resource.semester})`,
      `Format: ${resource.format}`,
      `Contributor: ${resource.contributor}`,
      `Reference URL: ${resource.referenceUrl}`,
      ``,
      `Overview:`,
      resource.description,
      ``,
      `Modules Covered:`,
      ...resource.modules.map((m, idx) => `${idx + 1}. ${m}`),
      ``,
      `Generated locally via RIT Student Hub – Rajeev Institute of Technology, Hassan.`,
    ];

    const blob = new Blob([lines.join('\n')], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resource.id}-study-outline.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCreateResource = (e: FormEvent) => {
    e.preventDefault();
    if (newTitle.trim().length < 4) {
      setFormError('Please provide a clear resource title (at least 4 characters).');
      return;
    }
    if (newContributor.trim().length < 2) {
      setFormError('Please enter your name or study group.');
      return;
    }
    if (!/^https?:\/\/.+/.test(newUrl.trim())) {
      setFormError('Please enter a valid URL starting with https:// or http://.');
      return;
    }
    if (newDescription.trim().length < 12) {
      setFormError('Please add a brief summary (at least 12 characters).');
      return;
    }

    const customItem: LearningResource = {
      id: `user-res-${Date.now()}`,
      title: newTitle.trim(),
      subject: newSubject,
      semester: newSemester,
      format: newFormat,
      sizeLabel: 'Student Link · Local Entry',
      contributor: newContributor.trim(),
      updatedLabel: 'Added by you',
      description: newDescription.trim(),
      modules: [
        'Student-submitted reference material saved in local hub catalog',
      ],
      referenceUrl: newUrl.trim(),
      isUserContributed: true,
    };

    onAddCustomResource(customItem);
    setNewTitle('');
    setNewContributor('');
    setNewUrl('');
    setNewDescription('');
    setFormError('');
    setIsAddModalOpen(false);
  };

  return (
    <section
      id="resources"
      className="border-b border-slate-200/80 bg-slate-50 py-14 transition-colors dark:border-slate-800/80 dark:bg-[#0D1320] sm:py-18"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold text-violet-700 dark:text-violet-400">
              02. Digital Learning Resource Hub
            </p>
            <h2
              className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
              style={{ textWrap: 'balance' }}
            >
              Subject-Wise Notes, Lab Manuals & Study Guides
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Filter curated academic materials by engineering subject, inspect unit
              breakdowns, download clean study outlines, or add your own study link.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex min-h-[42px] items-center gap-2 self-start rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 whitespace-nowrap shrink-0 transition-colors hover:border-violet-400 hover:bg-violet-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-violet-600 dark:hover:bg-violet-950/30 md:self-auto"
          >
            <Plus className="h-4 w-4 text-violet-700 dark:text-violet-400" aria-hidden="true" />
            Add Study Link
          </button>
        </div>

        {/* Search & Subject Tabs */}
        <div className="mt-7 flex flex-col gap-4">
          <div className="relative max-w-md">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, semester, or subject..."
              aria-label="Search learning resources"
              className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-violet-500"
            />
          </div>

          <div
            role="tablist"
            aria-label="Resource subjects"
            className="flex flex-wrap items-center gap-1.5 rounded-lg bg-slate-200/70 p-1 dark:bg-slate-900"
          >
            {SUBJECTS.map((subject) => {
              const isActive = activeSubject === subject;
              return (
                <button
                  key={subject}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveSubject(subject)}
                  className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 ${
                    isActive
                      ? 'bg-white text-violet-800 shadow-sm dark:bg-slate-800 dark:text-violet-300'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                >
                  {subject}
                </button>
              );
            })}
          </div>
        </div>

        {/* Resource Grid */}
        {filteredResources.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900/50">
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              No resources match your current filter
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Clear your search term or select "All" subjects to view every note set.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveSubject('All');
              }}
              className="mt-4 inline-flex min-h-[40px] items-center rounded-lg bg-violet-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-violet-800 dark:bg-violet-600 dark:hover:bg-violet-500"
            >
              Show All Resources
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => {
              const isSaved = savedResourceIds.includes(resource.id);
              return (
                <article
                  key={resource.id}
                  className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-violet-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-700"
                >
                  <div>
                    {/* Zero-pill inline metadata */}
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex min-w-0 items-center gap-1.5 truncate">
                        <span className="font-semibold text-violet-700 dark:text-violet-400">
                          {resource.subject}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{resource.semester}</span>
                        <span aria-hidden="true">·</span>
                        <span>{resource.format}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onToggleSaveResource(resource.id)}
                        aria-label={
                          isSaved
                            ? `Remove ${resource.title} from study list`
                            : `Save ${resource.title} to study list`
                        }
                        aria-pressed={isSaved}
                        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 ${
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

                    <h3 className="mt-2.5 font-display text-base font-bold leading-snug text-slate-900 dark:text-white">
                      {resource.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {resource.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                      <FileText className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span className="font-mono tabular-nums">
                        {resource.sizeLabel}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{resource.contributor}</span>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setPreviewResource(resource)}
                      className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white whitespace-nowrap transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600"
                    >
                      <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                      Preview Outline
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadStudySheet(resource)}
                      aria-label={`Download outline for ${resource.title}`}
                      className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 whitespace-nowrap shrink-0 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <Download className="h-3.5 w-3.5" aria-hidden="true" />
                      Sheet
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Preview Resource Modal */}
      {previewResource && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="resource-preview-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div>
                <p className="text-xs font-semibold text-violet-700 dark:text-violet-400">
                  {previewResource.subject} · {previewResource.semester} ·{' '}
                  {previewResource.format}
                </p>
                <h3
                  id="resource-preview-title"
                  className="mt-1 font-display text-lg font-bold text-slate-900 dark:text-white"
                >
                  {previewResource.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setPreviewResource(null)}
                aria-label="Close resource preview"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {previewResource.description}
              </p>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                  Syllabus Modules Included
                </p>
                <ul className="mt-2.5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  {previewResource.modules.map((mod) => (
                    <li key={mod} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Contributor: {previewResource.contributor} · {previewResource.updatedLabel}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handleDownloadStudySheet(previewResource)}
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Study Outline
              </button>

              <a
                href={previewResource.referenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                Open Official Docs
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Resource Modal */}
      {isAddModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-resource-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div>
                <p className="text-xs font-semibold text-violet-700 dark:text-violet-400">
                  Student Contribution
                </p>
                <h3
                  id="add-resource-title"
                  className="mt-1 font-display text-lg font-bold text-slate-900 dark:text-white"
                >
                  Add a Study Resource Link
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                aria-label="Close add resource dialog"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateResource} noValidate className="mt-5 space-y-4">
              {formError && (
                <p className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/50 dark:text-rose-300">
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {formError}
                </p>
              )}

              <div>
                <label
                  htmlFor="res-title"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  Resource Title *
                </label>
                <input
                  id="res-title"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Computer Networks Module 3 Summary"
                  className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-violet-600 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="res-subject"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Subject
                  </label>
                  <select
                    id="res-subject"
                    value={newSubject}
                    onChange={(e) =>
                      setNewSubject(
                        e.target.value as Exclude<ResourceSubject, 'All'>
                      )
                    }
                    className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    {SUBJECTS.filter((s) => s !== 'All').map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="res-sem"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Semester
                  </label>
                  <select
                    id="res-sem"
                    value={newSemester}
                    onChange={(e) => setNewSemester(e.target.value)}
                    className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    {['Sem 1 & 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7 & 8'].map(
                      (s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="res-format"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Format
                  </label>
                  <select
                    id="res-format"
                    value={newFormat}
                    onChange={(e) =>
                      setNewFormat(
                        e.target.value as LearningResource['format']
                      )
                    }
                    className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    {['PDF Guide', 'Lab Manual', 'Lecture Notes', 'Question Bank'].map(
                      (fmt) => (
                        <option key={fmt} value={fmt}>
                          {fmt}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="res-contributor"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Your Name / Group *
                  </label>
                  <input
                    id="res-contributor"
                    type="text"
                    value={newContributor}
                    onChange={(e) => setNewContributor(e.target.value)}
                    placeholder="e.g., Shreya N, 5th Sem CSE"
                    className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="res-url"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Reference URL *
                  </label>
                  <input
                    id="res-url"
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://developer.mozilla.org/..."
                    className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="res-desc"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  Short Description *
                </label>
                <textarea
                  id="res-desc"
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Summarize the key topics covered in this note set..."
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Added resources are saved in your local browser storage so you can
                keep your personal study vault organized.
              </p>

              <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="min-h-[42px] rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[42px] rounded-lg bg-violet-700 px-5 py-2 text-xs font-semibold text-white hover:bg-violet-800 dark:bg-violet-600 dark:hover:bg-violet-500"
                >
                  Save to Hub
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
