# Corpus Christi Admin

Parish office tools: events, the pew leaflet, and sign-in accounts.

**This is a separate application. It must never be deployed with the public
website.** It is its own npm package with its own build output, so the two share
no bundle. The public site's `tsconfig.json` and `eslint.config.mjs` both
exclude this directory, which is what stops it being pulled back in by a
repo-wide glob.

## Running

From the repository root:

    npm run dev:admin      # http://localhost:3100
    npm run build:admin    # static export into admin/out
    npm run lint:admin

## Deploying

Publish `admin/out` to the admin subdomain, e.g. `admin.corpus-christi-garsfontein.org`.
The routes are the root of that host — `/`, `/events`, `/leaflets`, `/users` —
not `/admin/...`.

It needs its own `.env.local` with the same `NEXT_PUBLIC_FIREBASE_*` values as
the website. They point at the same Firebase project, which is how the two apps
share data.

## What actually protects the data

This is a static export, so there is no server to check a session before a page
is served. The gate in `src/admin/shell.tsx` runs in the browser and only hides
the interface. **Firestore and Storage security rules are the real access
control** — if the `events`, `leaflets` or `users` collections allow
unauthenticated writes, this app being on a private subdomain changes nothing.

Two known limits of doing this from the browser:

- **Listing accounts.** Firebase Auth has no client API to enumerate users, so
  the Users page lists a Firestore mirror of accounts created through it, not
  every account on the project.
- **Revoking access.** The client SDK can only delete the currently signed-in
  user. Removing someone else needs the Firebase console, or a Cloud Function
  using the Admin SDK.

Both are fixed by the same thing: a Cloud Function with the Admin SDK, which
would also let account creation be restricted to an admin custom claim rather
than relying on the project allowing email/password sign-up.
