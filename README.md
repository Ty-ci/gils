# gils

An internal website built with **Next.js (App Router) + React + TypeScript + Tailwind CSS**, with
Google Sheets as the CMS and password access read from the same sheet.

The project is the bare base of an earlier site: the content pages are gone, and what's left is the
homepage, the design system, the Google Sheets access and the password gate. The visual language
is specified in [`DESIGN_SPECS.md`](DESIGN_SPECS.md).

## Getting started

```bash
npm install      # first time only
npm run dev      # start the dev server at http://localhost:3000
```

## Layout

```
DESIGN_SPECS.md                   design system (tokens, components, rules)
src/
  lib/site.ts                     the site's name and description
  lib/navigation.ts               every route: menu label + which password keys view / edit it
  lib/access/                     the password gate
    check.ts                      checks a password against the `keys` tab (server-only)
    actions.ts                    server action the prompt calls
    client.ts                     localStorage + useAccess() / useEditAccess() hooks
  lib/google-sheets/              shared, server-only Google Sheets access
    spreadsheet.ts                the site's spreadsheet ID, links to its tabs
    client.ts                     service-account auth, getValues(), updateValues(), appendValues()
    cells.ts                      header matching and cell helpers
  app/
    layout.tsx                    root layout: <html>, Georama, header, footer, noindex
    globals.css                   Tailwind entry point + design tokens (DESIGN_SPECS.md §11)
    page.tsx                      / — homepage
    not-found.tsx                 404
    robots.ts                     /robots.txt: disallow everything (internal web)
    _components/                  design-system primitives (Button, Section, AccessGate, …)
```

## Access: passwords from the sheet

Which route needs which key is set in one place, [`src/lib/navigation.ts`](src/lib/navigation.ts).
The homepage is public. A path not listed there is locked with `whole-web-view`, so a forgotten
entry hides a page rather than exposing it.

The passwords live in the **`keys`** tab. Rows 1–2 are free for instructions and **row 3 is the
header**: `Key | Value | Note`. A key's `Value` is its password; change it in the sheet and it
applies within a minute. Each route names two keys: `access` to see it (`whole-web-view`) and
`edit` to change what it shows (`whole-web-edit`). To add a key, add a row to the tab and its name
to `accessKeys` in `navigation.ts`.

How it works:

- On a locked page the browser asks for the password once. The server checks it against the sheet,
  and on success it is kept in `localStorage`. Later visits check the stored password with the
  server quietly, and the prompt comes back only if it stopped working.
- The layout only _hides_ locked pages in the browser. What is actually protected is sheet data:
  a server action or route handler that returns protected content must check the password itself
  (`hasAccess` from `src/lib/access/check.ts`). Text written into a page's code ships with it, so
  don't put anything secret there.
- Editable content is read-only until the edit password is entered, e.g. in the `EditUnlock`
  form (`useEditAccess` for the state). The server action that writes to the sheet must check the
  edit password on every change.
- Passwords are stored in plain text in the browser. That is enough for an internal web, not for
  sensitive data.

## Content: Google Sheets as the CMS

Everything is in one spreadsheet
([`src/lib/google-sheets/spreadsheet.ts`](src/lib/google-sheets/spreadsheet.ts)), shared with the
service account (**Viewer** to read, **Editor** if the site writes back). To feed a page from a new tab:

1. Read it server-side with `getValues(spreadsheetId(), ['tab!A1:Z500'])` from
   `src/lib/google-sheets/`.
2. Find columns by header with `columnFinder` and read cells with `cell` (`cells.ts`), so people
   can reorder and rename columns without breaking the site.
3. If the page is locked, return the data from a server action that checks `hasAccess` first.

## Environment

In `.env.local` for local development and in the Netlify site settings for deploys:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL = …@….iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY = -----BEGIN PRIVATE KEY-----\n…\n-----END PRIVATE KEY-----\n
GOOGLE_SHEET_ID = …            # optional; defaults to the site's spreadsheet (e.g. a copy for dev)
```

None of them is `NEXT_PUBLIC_`-prefixed, so none can end up in the browser bundle.

## Deployment

Netlify, via [`@netlify/plugin-nextjs`](https://github.com/opennextjs/opennextjs-netlify), which
maps the App Router's routes, server actions and static assets onto Netlify's own primitives.

## Scripts

```bash
npm run build      # production build (also runs eslint and tsc)
npm run start      # serve the production build
npm run lint       # eslint
npm run lint:fix   # eslint --fix
npm run typecheck  # tsc --noEmit
npm run prettier   # format
```
