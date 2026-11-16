# Farhad Sharifi Portfolio

A premium, editorial single-page portfolio built with **Next.js 16 (App Router)**,
**TypeScript strict**, **Tailwind CSS v4**, **next-themes**, **Lenis** and
**Motion** — with a horizontal chapter-based storytelling experience on desktop
and a classic vertical editorial layout on mobile / reduced-motion devices.

**Live:** https://raha7325.github.io/farhad-sharifi-portfolio/

All professional content is sourced from `cv.pdf` (see `CONTENT-MAPPING.md`).
The single source of truth for content is `src/content/profile.ts`.

## Development

```bash
npm install
npm run dev
```

## Production build

Local (root-path) build:

```bash
npm run build
```

GitHub Pages build (static export, sub-path prefixed):

```bash
GITHUB_PAGES=true npm run build
```

Output is written to `out/`.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow in
`.github/workflows/deploy.yml`, which statically exports the site and deploys
it to GitHub Pages automatically.
