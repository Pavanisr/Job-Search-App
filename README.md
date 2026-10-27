# Job Search & Application Screen (Ionic React)

A responsive, mobile-friendly job search app built with **Ionic React + TypeScript**.

## Features (mapped to marking criteria)

1. **Job List Display (25)** — `JobCard.tsx` renders Title, Company, Location, Salary, Type
   in a clean `IonCard`. `JobListPage.tsx` lays cards out in a responsive `IonGrid`
   (1 column on mobile, 2 on tablet, 3 on desktop) and each card has a "View Details" button.
2. **Search & Filtering (20)** — `IonSearchbar` in `JobListPage.tsx` filters the list live
   on every keystroke, matching case-insensitively against both `title` and `company`.
3. **Job Details View (20)** — `JobDetailsModal.tsx` is an `IonModal` showing full details
   (title, company, location, salary, type, description, requirements) with a prominent
   "Apply Now" button.
4. **Apply Form & Validation (20)** — `ApplyFormModal.tsx` is an `IonModal` with Full Name,
   Email, Mobile Number, Message fields. All fields are required; email is validated with
   a regex; mobile number is validated with a regex; errors show inline under each field
   and a success `IonToast` confirms submission.
5. **Code Quality & UX (15)** — Fully typed with TypeScript interfaces (`src/types/Job.ts`),
   split into small reusable components, empty-state ("No jobs found") handling, and uses
   standard Ionic components throughout (`IonCard`, `IonModal`, `IonBadge`, `IonToast`, etc.).

## Project structure

```
job-search-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── JobCard.tsx           # Job summary card
│   │   ├── JobCard.css
│   │   ├── JobDetailsModal.tsx   # Full details modal
│   │   └── ApplyFormModal.tsx    # Application form + validation
│   ├── data/
│   │   └── jobsData.ts           # 8 mock jobs (sample dataset, extended)
│   ├── pages/
│   │   ├── JobListPage.tsx       # Main screen: search + grid + modals
│   │   └── JobListPage.css
│   ├── types/
│   │   └── Job.ts                # TypeScript interfaces
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## How to run it

You need **Node.js 16+** installed. Then, from inside the `job-search-app` folder:

### Step 1 — Install dependencies
```bash
npm install
```

### Step 2 — (Optional but recommended) Install the Ionic CLI globally
This lets you use `ionic serve` for a nicer dev experience with live-reload and
device sizing, though `npm start` also works fine on its own.
```bash
npm install -g @ionic/cli
```

### Step 3 — Run the app
Using plain React scripts (always works, no CLI needed):
```bash
npm start
```
This opens the app at `http://localhost:3000`.

OR, if you installed the Ionic CLI:
```bash
ionic serve
```

### Step 4 — Test responsiveness
- Open Chrome DevTools (F12) → toggle device toolbar (Ctrl+Shift+M) to preview
  mobile widths (iPhone, Pixel, etc.) alongside the desktop layout.
- Resize the browser window to confirm the grid reflows from 1 → 2 → 3 columns.

## How it was scaffolded (if starting from scratch yourself)

If you'd rather generate the base project with the Ionic CLI and then drop these
files in, this is the equivalent flow:
```bash
npm install -g @ionic/cli
ionic start job-search-app blank --type=react
cd job-search-app
# then replace/add the files under src/ with the ones in this project
npm start
```

## Notes on functionality

- **Search**: type in the search bar at the top — the list filters instantly with no
  extra button needed, matching against job title OR company name (case-insensitive).
- **View Details**: tap "View Details" on any card to open a full-screen-friendly modal
  with the complete job description and requirements.
- **Apply Now**: from the details modal, tap "Apply Now" to open the application form
  modal. Try submitting empty, an invalid email, or an invalid phone number to see the
  inline validation messages; a valid submission shows a success toast and auto-closes.
- **Empty state**: search for a term that matches no jobs (e.g. "zzz") to see the
  "No jobs found" empty state.

## Packaging as a mobile app (optional, using Capacitor)

Since this uses the standard Ionic React blank template structure, it's already
Capacitor-ready if you want to build native iOS/Android binaries:
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npm run build
npx cap add ios
npx cap add android
npx cap open ios      # or npx cap open android
```
