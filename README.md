# Library Card — Frontend

Next.js website for the band [Library Card](https://www.instagram.com/thisislibrarycard/).
Renders a home, music, tour, video, and about page; pulls content from a headless backend.

> **This is a public copy for portfolio purposes.** It mirrors a private working repo and may
> lag behind it. The companion backend is mirrored at
> [Quitzchell/library-card-backend](https://github.com/Quitzchell/library-card-backend).

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui (Radix primitives)
- Vitest + Testing Library
- Upstash Redis for cache
- Vercel for hosting; Vercel Cron for scheduled cache warming
- Docker for local dev

## Architecture

The frontend talks to a headless CMS via a pluggable repository layer. Three modes are
selectable at build time via `NEXT_PUBLIC_USE_API`:

- `mock` — in-process fixtures, no backend required (`lib/api/mock/`)
- `django` — original Django REST backend (`lib/api/django/`)
- `laravel` — current Laravel + Filament backend (`lib/api/laravel/`)

The Laravel mode includes a mapper layer that adapts Filament's API resource shape to the
domain interfaces in `lib/interfaces/`.

Pages use ISR; the backend pushes to `/api/revalidate` (HMAC-style shared-secret check) on
content changes, and a daily Vercel Cron hits `/api/warm-cache` to keep the most-visited
endpoints warm. Upstash Redis acts as a fallback cache when the backend is unreachable.

## Getting started

```bash
cp .env.example .env.local
# edit .env.local — at minimum set NEXT_PUBLIC_USE_API=mock to run without a backend
npm install
npm run dev
```

Open http://localhost:3000.

Or with Docker:

```bash
make up      # docker compose up -d
make shell   # exec into the container
make down    # tear down
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (write) |
| `npm test` | Vitest run |
| `npm run test:watch` | Vitest watch |

## CI/CD

GitHub Actions drive both continuous integration and deployment (`.github/workflows/`):

- **`test.yml`** — CI: installs dependencies and runs the Vitest suite on every pull
  request to `main`.
- **`deploy.yml`** — CD: on push to `main`, deploys to the production VPS over SSH
  (`appleboy/ssh-action`), pulling the latest code and rebuilding the stack via
  `docker compose -f docker-compose.prod.yml`. Secrets (host, SSH key) are injected
  from GitHub Actions secrets.

> Both workflows are **disabled in this public mirror**: their automatic triggers are
> removed and each job is guarded with `if: ${{ false }}`, so nothing runs here. They are
> included to show the pipeline; the live versions run in the private repo.

## Layout

```
.github/workflows/  CI (test) + CD (deploy) pipelines
app/                Next.js routes (App Router)
  api/              Revalidation + cache-warming endpoints
  (home)/, music/, tour/, video/, about/
  _components/      Shared layout/UI components
lib/
  api/              Backend clients (mock | django | laravel) + repositories
  interfaces/       Domain types
  cache.ts          Upstash Redis wrapper
factories/          Icon factory (react-icons)
utils/              Date/page/classname helpers (with tests)
```
