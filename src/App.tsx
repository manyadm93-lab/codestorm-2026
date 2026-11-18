import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import {
  CAMPUS_EVENTS,
  LEARNING_RESOURCES,
  STUDENT_CLUBS,
} from './data/campusData';
import { useLocalStorage } from './hooks/useLocalStorage';
import {
  CampusEvent,
  ClubMembership,
  ContactSubmission,
  EventRegistration,
  LearningResource,
  ThemeMode,
} from './types/campus';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { CampusToolbar } from './components/CampusToolbar';
import { EventsExplorer } from './components/EventsExplorer';
import { EventRegistrationModal } from './components/EventRegistrationModal';
import { ResourcesHub } from './components/ResourcesHub';
import { ClubsDirectory } from './components/ClubsDirectory';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CampusPassDrawer } from './components/CampusPassDrawer';

export default function App() {
  const [theme, setTheme] = useLocalStorage<ThemeMode>(
    'rit_hub_theme',
    'light'
  );
  const [registrations, setRegistrations] = useLocalStorage<
    EventRegistration[]
  >('rit_hub_registrations', []);
  const [savedEventIds, setSavedEventIds] = useLocalStorage<string[]>(
    'rit_hub_saved_events',
    []
  );
  const [savedResourceIds, setSavedResourceIds] = useLocalStorage<string[]>(
    'rit_hub_saved_resources',
    []
  );
  const [customResources, setCustomResources] = useLocalStorage<
    LearningResource[]
  >('rit_hub_custom_resources', []);
  const [memberships, setMemberships] = useLocalStorage<ClubMembership[]>(
    'rit_hub_club_memberships',
    []
  );
  const [contactSubmissions, setContactSubmissions] = useLocalStorage<
    ContactSubmission[]
  >('rit_hub_contact_messages', []);

  const [eventToRegister, setEventToRegister] = useState<CampusEvent | null>(
    null
  );
  const [isPassDrawerOpen, setIsPassDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync Tailwind v4 .dark class on document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 4000);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const allResources = useMemo(
    () => [...customResources, ...LEARNING_RESOURCES],
    [customResources]
  );

  const savedResourcesList = useMemo(
    () => allResources.filter((r) => savedResourceIds.includes(r.id)),
    [allResources, savedResourceIds]
  );

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleSaveEvent = (eventId: string) => {
    setSavedEventIds((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleSubmitRegistration = (reg: EventRegistration) => {
    setRegistrations((prev) => [
      ...prev.filter((item) => item.eventId !== reg.eventId),
      reg,
    ]);
    setEventToRegister(null);
    setToastMessage(`Seat reserved for ${reg.eventTitle} (${reg.usn}).`);
  };

  const handleCancelRegistration = (eventId: string) => {
    setRegistrations((prev) => prev.filter((item) => item.eventId !== eventId));
    setToastMessage('Event registration cancelled.');
  };

  const handleToggleSaveResource = (resourceId: string) => {
    setSavedResourceIds((prev) =>
      prev.includes(resourceId)
        ? prev.filter((id) => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const handleAddCustomResource = (resource: LearningResource) => {
    setCustomResources((prev) => [resource, ...prev]);
    setSavedResourceIds((prev) => [resource.id, ...prev]);
    setToastMessage(`Added "${resource.title}" to your local study vault.`);
  };

  const handleJoinClub = (membership: ClubMembership) => {
    setMemberships((prev) => [
      ...prev.filter((item) => item.clubId !== membership.clubId),
      membership,
    ]);
    setToastMessage(`Joined ${membership.clubName} (${membership.usn}).`);
  };

  const handleLeaveClub = (clubId: string) => {
    setMemberships((prev) => prev.filter((item) => item.clubId !== clubId));
    setToastMessage('Club membership removed from your pass.');
  };

  const handleClearAllLocal = () => {
    setRegistrations([]);
    setSavedEventIds([]);
    setSavedResourceIds([]);
    setCustomResources([]);
    setMemberships([]);
    setToastMessage('Cleared all locally stored campus pass records.');
  };

  const handleContactSubmit = (submission: ContactSubmission) => {
    setContactSubmissions((prev) => [submission, ...prev]);
    setToastMessage('Inquiry saved locally. Thank you for contacting the Hub.');
  };

  const passTotal =
    registrations.length + savedResourceIds.length + memberships.length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-[#090D16] dark:text-slate-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-blue-700 focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenPass={() => setIsPassDrawerOpen(true)}
        passCount={passTotal}
      />

      <main id="main-content">
        <HeroSection
          totalEvents={CAMPUS_EVENTS.length}
          totalResources={allResources.length}
          totalClubs={STUDENT_CLUBS.length}
          userRegistrationsCount={registrations.length}
          userJoinedClubsCount={memberships.length}
        />

        <AboutSection />

        <CampusToolbar
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenPass={() => setIsPassDrawerOpen(true)}
          registrationsCount={registrations.length}
          savedResourcesCount={savedResourceIds.length}
          joinedClubsCount={memberships.length}
        />

        <EventsExplorer
          events={CAMPUS_EVENTS}
          registrations={registrations}
          savedEventIds={savedEventIds}
          onToggleSaveEvent={handleToggleSaveEvent}
          onSelectEventToRegister={(event) => setEventToRegister(event)}
          onCancelRegistration={handleCancelRegistration}
        />

        <ResourcesHub
          resources={allResources}
          savedResourceIds={savedResourceIds}
          onToggleSaveResource={handleToggleSaveResource}
          onAddCustomResource={handleAddCustomResource}
        />

        <ClubsDirectory
          clubs={STUDENT_CLUBS}
          memberships={memberships}
          onJoinClub={handleJoinClub}
          onLeaveClub={handleLeaveClub}
        />

        <ContactSection
          submissions={contactSubmissions}
          onSubmitMessage={handleContactSubmit}
        />
      </main>

      <Footer />

      <EventRegistrationModal
        event={eventToRegister}
        onClose={() => setEventToRegister(null)}
        onSubmitRegistration={handleSubmitRegistration}
      />

      <CampusPassDrawer
        isOpen={isPassDrawerOpen}
        onClose={() => setIsPassDrawerOpen(false)}
        registrations={registrations}
        savedResources={savedResourcesList}
        memberships={memberships}
        onCancelRegistration={handleCancelRegistration}
        onRemoveSavedResource={handleToggleSaveResource}
        onLeaveClub={handleLeaveClub}
        onClearAllLocal={handleClearAllLocal}
        totalEventsAvailable={CAMPUS_EVENTS.length}
        totalResourcesAvailable={allResources.length}
        totalClubsAvailable={STUDENT_CLUBS.length}
      />

      {/* Accessible Feedback Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-4 bottom-4 z-50 flex max-w-sm items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-900 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span className="flex-1">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            aria-label="Dismiss notification"
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
