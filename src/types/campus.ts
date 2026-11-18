export type ThemeMode = 'light' | 'dark';

export type EventCategory =
  | 'All'
  | 'Hackathon'
  | 'Workshop'
  | 'Seminar'
  | 'Technical'
  | 'Cultural';

export interface CampusEvent {
  id: string;
  title: string;
  category: Exclude<EventCategory, 'All'>;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  summary: string;
  highlights: string[];
  capacity: number;
  registeredBase: number;
  imageUrl: string;
  imageAlt: string;
  featured?: boolean;
}

export interface EventRegistration {
  eventId: string;
  eventTitle: string;
  fullName: string;
  usn: string;
  email: string;
  branch: string;
  semester: string;
  notes?: string;
  submittedAt: string;
}

export type ResourceSubject =
  | 'All'
  | 'Data Structures'
  | 'Operating Systems'
  | 'DBMS & SQL'
  | 'Web & Cloud'
  | 'AI & Machine Learning'
  | 'Engineering Math';

export interface LearningResource {
  id: string;
  title: string;
  subject: Exclude<ResourceSubject, 'All'>;
  semester: string;
  format: 'PDF Guide' | 'Lab Manual' | 'Lecture Notes' | 'Question Bank';
  sizeLabel: string;
  contributor: string;
  updatedLabel: string;
  description: string;
  modules: string[];
  referenceUrl: string;
  isUserContributed?: boolean;
}

export type ClubFocus =
  | 'All'
  | 'Software & AI'
  | 'Hardware & IoT'
  | 'Design & Media'
  | 'Community';

export interface StudentClub {
  id: string;
  name: string;
  shortName: string;
  focus: Exclude<ClubFocus, 'All'>;
  meetingSchedule: string;
  venue: string;
  leadName: string;
  memberCount: number;
  description: string;
  activities: string[];
  imageUrl?: string;
  imageAlt?: string;
  isOfficialPartner?: boolean;
}

export interface ClubMembership {
  clubId: string;
  clubName: string;
  fullName: string;
  usn: string;
  email: string;
  branch: string;
  interestArea: string;
  joinedAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  submittedAt: string;
}
