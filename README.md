# Wedding Event Manager (Frontend Only)

Production-ready React + Bootstrap frontend for managing a wedding experience for guests, couple, vendors, and planners. APIs are simulated with local JSON and in-memory state.

## Setup

```bash
npm install
npm start
```

Run tests:

```bash
npm test
```


## Preview Window

There is no built-in hosted preview pane in this repository itself. The UI preview is your local browser window once the dev server is running:

1. `npm install`
2. `npm start`
3. Open `http://localhost:3000`

If you are in a restricted environment where `npm install` is blocked (for example, package registry access returns 403), the preview window cannot be launched until dependency access is available.

## Key Features

- Landing page with hero media, countdown timer, and RSVP CTA.
- Multi-page app via React Router.
- Global state via React Context (`events`, `guests`, `RSVPs`, `vendors`, `registry`, `budget`, `tasks`).
- RSVP form with validation, RSVP token edit flow, confirmation modal, and `.ics` download.
- Planner dashboard with guest search/filter, CSV export, seating chart drag-and-drop, budget tracker, and checklist.
- Registry with group gifting and purchased-state toggles.
- Vendors with profile modal, notes updates, and contract upload preview simulation.
- Local theme + role persistence in `localStorage`.
- Admin role switcher to reveal planner-only pages.

## Folder Structure

```text
public/
  assets/                # Sample media assets
src/
  components/            # Reusable UI components (navbar, RSVP form, guest list, seating chart)
  context/               # EventContext global store and actions
  data/                  # sampleEvent.json seed data
  pages/                 # Route-level pages
  styles/                # theme overrides and custom animations
  utils/                 # file export helpers and ICS generator
  __tests__/             # Jest + RTL test stubs
  i18n.js                # User-facing strings for future localization
  App.js
  index.js
```

## Role Switching

1. Open **Admin Panel**.
2. Switch role: Guest / Couple / Vendor / Planner.
3. Planner Dashboard is protected and visible to Planner/Couple roles.

## Editing Sample Data

- Main content lives in `src/data/sampleEvent.json`.
- Update event date, guests, vendors, schedule, registry items directly in that file.

## Accessibility Notes

- Semantic landmarks and labels used on forms and major controls.
- Modal markup includes `role="dialog"` and `aria-modal`.

## Acceptance Criteria Checklist

- [x] App starts with `npm start` and lands on Home.
- [x] RSVP flow validates, saves RSVP, and downloads `.ics`.
- [x] Planner dashboard renders guest list + CSV export.
- [x] Seating chart supports drag/drop seat assignment.
- [x] Theme switcher persists after reload.
- [x] Figma brief included in `figma-brief.md`.

## Integration Placeholders

- Bulk email section (Planner Dashboard)
- Reminder UI (Schedule)
- Cash fund widget (Registry)
- Vendor availability calendar and contract upload persistence

