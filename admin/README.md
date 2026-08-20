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

`.github/workflows/admin.yml` does this on a push to `master` that touches
`admin/**`, and can also be run by hand from the Actions tab. It builds only this
workspace and FTPs `admin/out` to the subdomain.

The portal is served at **admin.corpus-christi-garsfontein.org**; the website is
at corpus-christi-garsfontein.org and is deployed by the other two workflows.
Routes are the root of the admin host — `/`, `/events`, `/leaflets`, `/users` —
not `/admin/...`, and the build is given no `NEXT_PUBLIC_BASE_PATH` for that
reason.

The upload target defaults to `public_html/admin/`. If the host maps the
subdomain somewhere else, set an `FTP_ADMIN_DIR` secret in the `Xneelo`
environment; it must end in a slash, and the workflow refuses to run if it is
the website's own document root, because the FTP step mirrors a directory and
deletes anything not in the upload.

**Firebase must be told about the subdomain.** Sign-in fails with
`auth/unauthorized-domain` until `admin.corpus-christi-garsfontein.org` is added
under Authentication → Settings → Authorized domains in the Firebase console.
Adding the domain is separate from deploying, and nothing in the build can check
it for you.

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
