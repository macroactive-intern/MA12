##Goal

I am building a small client-facing dashboard in Next.js.

The dashboard will let a client:
                                - View their current check-in streak.
                                - See whether their weekly check-in is complete.
                                - View their recent check-in history.
                                - Enter optional notes for today’s check-in.
                                - Log today’s check-in.
                                - See the dashboard update immediately after logging a check-in without a full page reload.

There is no real backend or database for this task. I will use Next.js route handlers as a mock API and store the dashboard state in a module-level in-memory variable.

-------------------------------------------------------------------------------------------------------------------------------

Project structure:

client-dashboard/
├── app/
│ ├── api/
│ │ ├── _data/
│ │ │ └── dashboardStore.ts
│ │ ├── dashboard/
│ │ │ └── route.ts
│ │ └── check-in/
│ │ └── route.ts
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ └── DashboardClient.tsx
├── test/
│ └── setup.ts
├── vitest.config.ts
├── UNDERSTANDING.md 
├── ESTIMATE.md 
├── APPROACH.md 
└── BEFORE-AFTER.md

I may add small helper files if components becomes too large, but I will keep the first version simple.

-------------------------------------------------------------------------------------------------------------------------------

Component boundary

app/page.tsx

Will stay as a Server Component

It will be responsible for:
                            - Rendering the page shell.
                            - Rendering a heading.
                            - Importing and displaying the dashboard client component.

It does not need "use client" because it will not use browser state, event handlers, SWR, or browser-only date formatting.

--------------------------------------------

components/DashboardClient.tsx

Will be a Client Component.

This component needs to run in the browser because it will handle:
                                                                    - useSWR
                                                                    - client-side fetching
                                                                    - notes input state
                                                                    - character counter state
                                                                    - submit/loading state
                                                                    - button disabled state
                                                                    - POST request handling
                                                                    - SWR mutation/revalidation
                                                                    - error messages
                                                                    - local timezone date formatting

This boundary matters because date formatting can cause server/client timezone mismatches. Formatting dates in the browser avoids pre-rendering the wrong local date on the server.

-------------------------------------------------------------------------------------------------------------------------------

Data model

There is no database.

The mock API state will live in a module-level variable inside a shared file such as:

app/api/_data/dashboardStore.ts

The shared mock state will use TypeScript types.

RecentCheckIn
export type RecentCheckIn = {
  id: number;
  checked_in_date: string;
  notes: string | null;
};

checked_in_date will be stored as a date string like:

2026-06-15

