import clgLogo from '../assets/logos/Clg-Logo.jpeg';
import deptLogo from '../assets/logos/Dept-Logo.jpeg';
import gdgLogo from '../assets/logos/GDG_CLUB-logo.jpeg';
import { CampusEvent, LearningResource, StudentClub } from '../types/campus';

export const OFFICIAL_LOGOS = [
  {
    id: 'college',
    name: 'Rajeev Institute of Technology',
    subtitle: 'Hassan, Karnataka',
    src: clgLogo,
    alt: 'Official Rajeev Institute of Technology Hassan Logo',
  },
  {
    id: 'department',
    name: 'Dept. of Computer Science & Engg.',
    subtitle: 'RIT Academic Department',
    src: deptLogo,
    alt: 'Official Department of Computer Science and Engineering Logo',
  },
  {
    id: 'gdg',
    name: 'GDG on Campus – RIT Hassan',
    subtitle: 'Google Developer Groups',
    src: gdgLogo,
    alt: 'Official Google Developer Groups on Campus RIT Hassan Logo',
  },
] as const;

export const HERO_IMAGE = {
  url: '/src/assets/images/hero_campus_hub_1794981929336.jpg',
  alt: 'Engineering students collaborating inside the sunlit campus innovation hub atrium',
};

export const CAMPUS_EVENTS: CampusEvent[] = [
  {
    id: 'codestorm-2026-nov',
    title: 'CODESTORM 2026 – November Edition',
    category: 'Hackathon',
    date: 'Nov 28, 2026',
    time: '09:00 AM – 06:00 PM',
    venue: 'CSE Seminar Hall & Main Innovation Lab',
    organizer: 'GDG on Campus – RIT Hassan',
    summary:
      'Flagship campus web engineering sprint focused on building responsive, user-centered civic and student platforms with modern frontend architecture.',
    highlights: [
      'Individual & team tracks (up to 3 members)',
      'Live deployment & GitHub code review by faculty and alumni',
      'Participation certificates & GDG community spotlight',
    ],
    capacity: 120,
    registeredBase: 94,
    imageUrl: '/src/assets/images/event_codestorm_hackathon_1794981928903.jpg',
    imageAlt: 'Computer science students collaborating with laptops during a campus coding sprint',
    featured: true,
  },
  {
    id: 'ai-systems-symposium',
    title: 'Applied AI & Cloud Architecture Symposium',
    category: 'Seminar',
    date: 'Dec 04, 2026',
    time: '10:30 AM – 01:30 PM',
    venue: 'RIT Main Auditorium',
    organizer: 'Dept. of Computer Science & Engineering',
    summary:
      'Technical deep dive into distributed inference, retrieval-augmented generation, and scalable cloud deployment patterns for final-year engineering projects.',
    highlights: [
      'Keynote by RIT alumni engineers from Bengaluru tech teams',
      'Interactive Q&A on capstone project architecture',
      'Verified starter templates shared after the session',
    ],
    capacity: 220,
    registeredBase: 168,
    imageUrl: '/src/assets/images/event_tech_symposium_1794981929600.jpg',
    imageAlt: 'University auditorium filled with engineering students attending a technical seminar',
    featured: true,
  },
  {
    id: 'embedded-robotics-jam',
    title: 'Autonomous Rover & IoT Telemetry Workshop',
    category: 'Workshop',
    date: 'Dec 11, 2026',
    time: '02:00 PM – 05:30 PM',
    venue: 'Robotics & Hardware Makerspace, Block B',
    organizer: 'RIT Robotics & IoT Collective',
    summary:
      'Hands-on hardware session covering ESP32 sensor fusion, PID motor control, and browser-based telemetry dashboards for inter-college robotics contests.',
    highlights: [
      'Microcontroller kits provided at lab workbenches',
      'Live serial-to-WebSocket telemetry demonstration',
      'Open to 2nd through 7th semester students across branches',
    ],
    capacity: 60,
    registeredBase: 47,
    imageUrl: '/src/assets/images/club_robotics_lab_1794981930401.jpg',
    imageAlt: 'Engineering student assembling an aluminum robot rover with microcontrollers at a lab bench',
    featured: true,
  },
  {
    id: 'dsa-winter-bootcamp',
    title: 'DSA & Placement Readiness Sprint',
    category: 'Technical',
    date: 'Dec 16, 2026',
    time: '03:15 PM – 05:15 PM',
    venue: 'CSE Lab 02, 2nd Floor',
    organizer: 'CSE Coding & Competitive Programming Club',
    summary:
      'Structured problem-solving clinic tackling dynamic programming, graph traversals, and system design fundamentals ahead of spring internship drives.',
    highlights: [
      'Timed 90-minute problem set with peer walkthroughs',
      'Curated sheet of 45 high-frequency interview problems',
      'Mock technical review slots for 6th semester students',
    ],
    capacity: 80,
    registeredBase: 61,
    imageUrl: '/src/assets/images/event_codestorm_hackathon_1794981928903.jpg',
    imageAlt: 'Students reviewing algorithms and code together on laptops',
  },
  {
    id: 'git-open-source-day',
    title: 'Open Source & Git Workflow Clinic',
    category: 'Workshop',
    date: 'Dec 21, 2026',
    time: '11:00 AM – 01:00 PM',
    venue: 'Digital Library Collaboration Zone',
    organizer: 'Open Source & Linux Guild',
    summary:
      'Practical walkthrough of branching strategies, clean pull requests, semantic commits, and publishing documentation-ready repositories on GitHub.',
    highlights: [
      'Live contribution to RIT student open-source templates',
      'Netlify and Vercel deployment walkthrough',
      'Beginner-friendly; bring a laptop with Git installed',
    ],
    capacity: 75,
    registeredBase: 52,
    imageUrl: '/src/assets/images/hero_campus_hub_1794981929336.jpg',
    imageAlt: 'Students collaborating at long oak tables inside campus atrium',
  },
  {
    id: 'rit-kalotsava-tech-expo',
    title: 'Campus Innovation Showcase & Cultural Evening',
    category: 'Cultural',
    date: 'Jan 09, 2027',
    time: '04:00 PM – 08:00 PM',
    venue: 'RIT Quadrangle & Open Stage',
    organizer: 'Student Cultural & Design Council',
    summary:
      'Annual convergence of student project demos, photography exhibitions, acoustic performances, and cross-departmental community networking.',
    highlights: [
      '15 live student hardware & software booths',
      'Campus photography showcase & design zine launch',
      'Open stage for acoustic ensembles and student bands',
    ],
    capacity: 400,
    registeredBase: 285,
    imageUrl: '/src/assets/images/event_tech_symposium_1794981929600.jpg',
    imageAlt: 'Campus hall prepared for student showcase and gathering',
  },
];

export const LEARNING_RESOURCES: LearningResource[] = [
  {
    id: 'res-dsa-trees-graphs',
    title: 'Trees, Graphs & Shortest Path Complete Notes',
    subject: 'Data Structures',
    semester: 'Sem 3 & 4',
    format: 'PDF Guide',
    sizeLabel: '42 pages · 3.4 MB',
    contributor: 'Prof. Raghavendra K. & CSE Study Circle',
    updatedLabel: 'Updated Oct 2026',
    description:
      'Clear derivations, dry-run diagrams, and C/Java implementations for AVL rotations, Dijkstra, Bellman-Ford, and topological sorting.',
    modules: [
      'Module 1: Binary Search Trees & AVL Balancing Rotations',
      'Module 2: Graph Representations (Adjacency Matrix vs. List)',
      'Module 3: BFS, DFS & Strongly Connected Components',
      'Module 4: Minimum Spanning Trees (Kruskal & Prim) + Practice Problems',
    ],
    referenceUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures',
  },
  {
    id: 'res-os-concurrency',
    title: 'Operating Systems: Scheduling, Deadlocks & Paging',
    subject: 'Operating Systems',
    semester: 'Sem 4',
    format: 'Lecture Notes',
    sizeLabel: '36 pages · 2.8 MB',
    contributor: 'CSE Academic Repository',
    updatedLabel: 'Updated Nov 2026',
    description:
      'Exam-ready notes with solved numericals for CPU scheduling Gantt charts, Banker’s deadlock avoidance algorithm, and virtual memory page replacement.',
    modules: [
      'Unit 1: Process States, Threads & Context Switching Overhead',
      'Unit 2: FCFS, SJF, Round Robin & Priority Scheduling Numericals',
      'Unit 3: Semaphores, Producer-Consumer & Banker’s Algorithm',
      'Unit 4: Paging, Segmentation, TLB Hit Ratio & Thrashing',
    ],
    referenceUrl: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
  },
  {
    id: 'res-dbms-normalization',
    title: 'DBMS Normalization, ER Modeling & SQL Lab Manual',
    subject: 'DBMS & SQL',
    semester: 'Sem 5',
    format: 'Lab Manual',
    sizeLabel: '54 pages · 4.1 MB',
    contributor: 'Dept. of CSE Database Lab',
    updatedLabel: 'Updated Sep 2026',
    description:
      'Step-by-step VTU lab queries, schema normalization from 1NF to BCNF, indexing B+ trees, and ACID transaction isolation levels.',
    modules: [
      'Part A: ER-to-Relational Schema Mapping Rules',
      'Part B: Functional Dependencies, Canonical Cover & BCNF Proofs',
      'Part C: Joins, Subqueries, Triggers & Stored Procedures in PostgreSQL',
      'Part D: Concurrency Control, Two-Phase Locking & Recovery',
    ],
    referenceUrl: 'https://www.postgresql.org/docs/current/tutorial.html',
  },
  {
    id: 'res-web-react-architecture',
    title: 'Modern React, TypeScript & Tailwind CSS Handbook',
    subject: 'Web & Cloud',
    semester: 'Sem 5 & 6',
    format: 'PDF Guide',
    sizeLabel: '29 pages · 2.2 MB',
    contributor: 'GDG on Campus – RIT Hassan',
    updatedLabel: 'Updated Nov 2026',
    description:
      'Component composition, custom hooks, accessible form validation, REST API integration, and production deployment checklists for Netlify and Vercel.',
    modules: [
      'Section 1: Semantic HTML5 & Accessible UI Patterns',
      'Section 2: React Hooks, State Lifting & Client Persistence',
      'Section 3: Responsive Grid Layouts & Tailwind Utility Architecture',
      'Section 4: Vite Bundling, Lighthouse Audits & Cloud Deployment',
    ],
    referenceUrl: 'https://react.dev/learn',
  },
  {
    id: 'res-ml-foundations',
    title: 'Machine Learning Foundations & Evaluation Metrics',
    subject: 'AI & Machine Learning',
    semester: 'Sem 6 & 7',
    format: 'Lecture Notes',
    sizeLabel: '48 pages · 3.9 MB',
    contributor: 'RIT AI & Data Science Collective',
    updatedLabel: 'Updated Oct 2026',
    description:
      'Linear & logistic regression math, gradient descent intuition, decision trees, SVM kernels, and precision/recall/ROC-AUC evaluation.',
    modules: [
      'Topic 1: Bias-Variance Tradeoff & Cross-Validation Splits',
      'Topic 2: Gradient Descent, Regularization (L1/L2) & Loss Functions',
      'Topic 3: Decision Trees, Random Forests & Ensemble Boosting',
      'Topic 4: Confusion Matrix, F1 Score & Unsupervised K-Means Clustering',
    ],
    referenceUrl: 'https://scikit-learn.org/stable/user_guide.html',
  },
  {
    id: 'res-math-discrete-prob',
    title: 'Discrete Mathematics & Probability Question Bank',
    subject: 'Engineering Math',
    semester: 'Sem 3 & 4',
    format: 'Question Bank',
    sizeLabel: '60 problems · 1.9 MB',
    contributor: 'RIT Academic Peer Mentors',
    updatedLabel: 'Updated Aug 2026',
    description:
      'Solved previous-year semester problems on propositional logic, recurrence relations, Bayes’ theorem, and Markov chains.',
    modules: [
      'Set 1: Mathematical Induction & Pigeonhole Principle',
      'Set 2: Recurrence Relations & Generating Functions',
      'Set 3: Conditional Probability, Bayes’ Theorem & Distributions',
      'Set 4: Graph Isomorphism, Eulerian & Hamiltonian Circuits',
    ],
    referenceUrl: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/',
  },
];

export const STUDENT_CLUBS: StudentClub[] = [
  {
    id: 'club-gdg-rit',
    name: 'GDG on Campus – RIT Hassan',
    shortName: 'GDG RIT',
    focus: 'Software & AI',
    meetingSchedule: 'Saturdays · 02:30 PM',
    venue: 'CSE Seminar Hall',
    leadName: 'Yashawantha H M',
    memberCount: 340,
    description:
      'Official Google Developer Groups student chapter at Rajeev Institute of Technology fostering peer-to-peer developer learning, cloud study jams, and hackathons like CODESTORM.',
    activities: [
      'Monthly CODESTORM web & solution sprints',
      'Google Cloud & Android Compose Study Jams',
      'Open-source portfolio & GitHub mentorship',
    ],
    imageUrl: '/src/assets/images/event_codestorm_hackathon_1794981928903.jpg',
    imageAlt: 'GDG on Campus student developers building web applications together',
    isOfficialPartner: true,
  },
  {
    id: 'club-cp-dsa',
    name: 'CSE Coding & Competitive Programming Club',
    shortName: 'RIT CodeGuild',
    focus: 'Software & AI',
    meetingSchedule: 'Wednesdays · 04:00 PM',
    venue: 'CSE Programming Lab 01',
    leadName: 'Ananya Deshpande',
    memberCount: 215,
    description:
      'Weekly algorithmic problem-solving sessions preparing students for ICPC qualifiers, coding contests, and technical product engineering interviews.',
    activities: [
      'Bi-weekly rated campus coding contests',
      'Peer editorial breakdowns for DP & Graph problems',
      'Resume & technical interview mock panels',
    ],
  },
  {
    id: 'club-robotics-iot',
    name: 'RIT Robotics & IoT Collective',
    shortName: 'RoboRIT',
    focus: 'Hardware & IoT',
    meetingSchedule: 'Fridays · 03:30 PM',
    venue: 'Embedded Systems Lab, Block B',
    leadName: 'Karthik Gowda S',
    memberCount: 148,
    description:
      'Interdisciplinary makerspace uniting CSE, ECE, and Mechanical students to design autonomous rovers, drone telemetry systems, and smart-campus sensor nodes.',
    activities: [
      'PCB design & microcontroller soldering workshops',
      'Line-follower & autonomous rover build cycles',
      'Smart-agriculture IoT prototyping for Hassan region',
    ],
    imageUrl: '/src/assets/images/club_robotics_lab_1794981930401.jpg',
    imageAlt: 'Student engineer soldering and testing a robotics chassis in the campus makerspace',
  },
  {
    id: 'club-design-studio',
    name: 'Campus Design & Product Studio',
    shortName: 'DesignRIT',
    focus: 'Design & Media',
    meetingSchedule: 'Thursdays · 04:15 PM',
    venue: 'Innovation Hub Studio 03',
    leadName: 'Meghana Rao',
    memberCount: 112,
    description:
      'Student collective dedicated to UI/UX systems, Figma prototyping, accessibility audits, editorial photography, and visual storytelling for campus initiatives.',
    activities: [
      'Figma component library & design-system critiques',
      'Campus event photography & digital zine curation',
      'Usability testing clinics for hackathon teams',
    ],
  },
  {
    id: 'club-opensource-linux',
    name: 'Open Source & Linux Guild',
    shortName: 'FOSS RIT',
    focus: 'Community',
    meetingSchedule: 'Alternate Tuesdays · 04:00 PM',
    venue: 'Digital Library Lab',
    leadName: 'Darshan Kumar P',
    memberCount: 164,
    description:
      'Collaborative community championing Linux workflows, self-hosted developer tools, containerization, and reproducible academic open-source software.',
    activities: [
      'Linux install fests & shell scripting labs',
      'Docker & CI/CD pipeline demonstrations',
      'Maintaining shared campus study note repositories',
    ],
  },
  {
    id: 'club-ieee-rit',
    name: 'IEEE & Electronics Innovation Chapter',
    shortName: 'IEEE RIT',
    focus: 'Hardware & IoT',
    meetingSchedule: '1st & 3rd Mondays · 03:45 PM',
    venue: 'ECE Seminar Hall',
    leadName: 'Nandini Kulkarni',
    memberCount: 190,
    description:
      'Student technical society hosting research paper reading groups, VLSI & signal processing talks, and interdisciplinary hardware-software symposiums.',
    activities: [
      'IEEE research writing & LaTeX formatting clinics',
      'Guest lectures from semiconductor & telecom engineers',
      'Annual student paper presentation colloquium',
    ],
  },
];

export const FEATURED_ACTIVITIES = [
  {
    index: '01',
    title: 'CODESTORM 2026 Sprint',
    meta: 'Nov 28 · GDG on Campus – RIT Hassan',
    description:
      'Design, build, and deploy production-grade web applications in Challenge 01 with peer code reviews.',
    targetSection: '#events',
    actionLabel: 'View Event',
  },
  {
    index: '02',
    title: 'Verified Semester Notes',
    meta: '6 Core Subjects · PDF & Lab Manuals',
    description:
      'Structured VTU-aligned study guides, solved numericals, and lab manuals curated by RIT faculty and peers.',
    targetSection: '#resources',
    actionLabel: 'Browse Notes',
  },
  {
    index: '03',
    title: 'Active Technical Chapters',
    meta: '6 Student Communities · Open Enrollment',
    description:
      'Connect with GDG on Campus, Robotics Collective, CodeGuild, and FOSS Guild across weekly campus sessions.',
    targetSection: '#clubs',
    actionLabel: 'Explore Clubs',
  },
] as const;
