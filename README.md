# Stanton Chase — Global BD Overview

A hosted build of the Global BD Visibility Layer React prototype (read-only demo,
mock data). Built with Vite + React and configured to deploy to **GitHub Pages**
automatically via GitHub Actions.

Once deployed, the site will be served at:

```
https://<owner>.github.io/StantonChaseGlobalBDOverview/
```

(`<owner>` = the GitHub user or organization that owns the repo.)

---

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev        # http://localhost:5173/StantonChaseGlobalBDOverview/
```

Build and preview the production output:

```bash
npm run build
npm run preview
```

---

## Publish to GitHub Pages

The repo name must stay **`StantonChaseGlobalBDOverview`** — it's baked into the Vite
`base` path (`vite.config.js`). If you rename the repo, update `base` to `'/<new-name>/'`
to match, or asset URLs will 404.

**1. Create the repo** named `StantonChaseGlobalBDOverview` on GitHub. Do **not** add a
README, .gitignore, or license on creation (this project already has them; pre-adding
files causes a first-push conflict).

**2. Push this project:**

```bash
git init
git add .
git commit -m "Global BD Overview prototype"
git branch -M main
git remote add origin https://github.com/<owner>/StantonChaseGlobalBDOverview.git
git push -u origin main
```

**3. Turn on Pages:** in the repo, go to **Settings → Pages → Build and deployment**
and set **Source = "GitHub Actions"** (not "Deploy from a branch").

That's it. The included workflow (`.github/workflows/deploy.yml`) runs on every push to
`main`: it builds the site and publishes `dist/`. Watch progress under the **Actions**
tab; the live URL appears in the workflow's `deploy` step and under Settings → Pages.
First deploy takes a minute or two.

---

## Notes

- **Confidentiality:** on GitHub Free, Pages only publishes from **public** repos, so the
  site is reachable by anyone with the link (the URL is not a secret/access control).
  It's mock data, but if you'd rather gate access, deploy the same repo on Netlify or
  Vercel and enable password protection on the share link, or use private Pages (requires
  a GitHub Team/Enterprise org).
- **Custom domain** (optional): Settings → Pages → Custom domain, plus a DNS CNAME and
  "Enforce HTTPS."
- The prototype is a single component (`src/App.jsx`, unchanged from the artifact). It has
  no third-party UI dependencies — just React — so nothing else needs configuring.
