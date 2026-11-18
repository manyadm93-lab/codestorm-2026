# RIT Student Hub – Campus Connect

**CODESTORM 2026 – November Edition · Challenge 01 (Website Building Challenge)**  
Organized by **GDG on Campus – Rajeev Institute of Technology, Hassan**

---

## Project Description

**RIT Student Hub – Campus Connect** is a centralized, responsive digital campus portal built for students of **Rajeev Institute of Technology (RIT), Hassan**. It brings together upcoming campus hackathons and technical seminars, structured semester-wise learning resources, and active student communities in one clean, accessible interface.

All personal state—including event seat registrations, bookmarked study notes, student-contributed resource links, club memberships, and theme preference—is persisted locally in the browser via `localStorage` without fabricated backend claims.

---

## Official Institutional Affiliations

The repository includes and displays the original official logos from the CODESTORM 2026 repository with original proportions preserved:

- **Rajeev Institute of Technology, Hassan** (`src/assets/logos/Clg-Logo.jpeg`)
- **Department of Computer Science & Engineering** (`src/assets/logos/Dept-Logo.jpeg`)
- **GDG on Campus – RIT Hassan** (`src/assets/logos/GDG_CLUB-logo.jpeg`)

---

## Key Features

1. **Smart Event Explorer**
   - Live search across event titles, venues, and organizers.
   - Category filter tabs (`All`, `Hackathon`, `Workshop`, `Seminar`, `Technical`, `Cultural`) plus bookmark filtering.
   - Validated Event Registration modal checking Full Name, VTU USN format (`4RA23CS042`), Email, Branch, and Semester.
2. **Digital Learning Resource Hub**
   - Subject-wise filter tabs (`Data Structures`, `Operating Systems`, `DBMS & SQL`, `Web & Cloud`, `AI & Machine Learning`, `Engineering Math`) and live search.
   - Interactive **Preview Outline** modal displaying syllabus modules, one-click `.txt` study sheet download, and official documentation links.
   - **Add Study Link** form with validation allowing students to save custom notes locally.
3. **Student Club Directory**
   - Filterable campus technical chapters (`GDG on Campus – RIT Hassan`, `RIT CodeGuild`, `RoboRIT`, `DesignRIT`, `FOSS RIT`, `IEEE RIT`).
   - Weekly meeting schedules, venues, coordinators, activity lists, and a validated **Join Club** workflow.
4. **My Campus Pass & Light/Dark Mode**
   - Slide-over **My Campus Pass** dashboard tracking engagement progress across registered events, saved notes, and joined clubs with one-click item management and local reset.
   - Accessible Light and Dark themes persisted across sessions.
5. **Validated Campus Contact Form**
   - Client-side validation for Name, Email, Topic, and Message with confirmation feedback and direct institutional links.

---

## Technology Stack

- **Frontend:** React 19, TypeScript, HTML5, CSS3
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons:** Lucide React (`lucide-react`)
- **Build Tooling:** Vite 8
- **Client Persistence:** Browser `localStorage` via a custom typed React hook

---

## Project Structure

```text
├── index.html
├── metadata.json
├── netlify.toml
├── vercel.json
├── package.json
├── README.md
└── src/
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── assets/
    │   ├── images/              # Campus photography assets
    │   └── logos/               # Official Clg-Logo.jpeg, Dept-Logo.jpeg, GDG_CLUB-logo.jpeg
    ├── components/
    │   ├── AboutSection.tsx
    │   ├── CampusPassDrawer.tsx
    │   ├── CampusToolbar.tsx
    │   ├── ClubsDirectory.tsx
    │   ├── ContactSection.tsx
    │   ├── EventRegistrationModal.tsx
    │   ├── EventsExplorer.tsx
    │   ├── Footer.tsx
    │   ├── HeroSection.tsx
    │   ├── Navbar.tsx
    │   ├── OfficialLogosBar.tsx
    │   ├── ResilientImage.tsx
    │   └── ResourcesHub.tsx
    ├── data/
    │   └── campusData.ts
    ├── hooks/
    │   └── useLocalStorage.ts
    └── types/
        └── campus.ts
```

---

## Installation & Local Development

1. **Clone the repository**
   ```bash
   git clone <your-github-repo-url>
   cd rit-student-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Type-check and build for production**
   ```bash
   npm run lint
   npm run build
   ```

---

## Deployment Instructions

### Deploy to Vercel
1. Push your source code to a public GitHub repository.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Keep the default Vite settings (`Build Command: npm run build`, `Output Directory: dist`). `vercel.json` is already configured for SPA routing.
4. Click **Deploy**.

### Deploy to Netlify
1. Push your source code to a public GitHub repository.
2. Create a new site from Git in [Netlify](https://app.netlify.com/).
3. `netlify.toml` automatically configures `npm run build` and `dist` publish directory with SPA fallback rules.
4. Click **Deploy site**.

---

## Screenshots

> Add captured screenshots of your live deployment inside `docs/screenshots/` before final submission:

| View | Preview Path |
|---|---|
| Hero & Institutional Affiliations (Light Mode) | `docs/screenshots/hero-light.png` |
| Smart Event Explorer & Registration Modal | `docs/screenshots/events-explorer.png` |
| Digital Learning Resource Hub & Outline Modal | `docs/screenshots/resources-hub.png` |
| Student Club Directory & My Campus Pass (Dark Mode) | `docs/screenshots/clubs-dark.png` |
