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
- ISR + on-demand revalidation for content caching
- GitHub Actions for CI (Vitest) and CD (SSH deploy to a VPS)
- Docker for local dev and production

## Architecture

The frontend talks to a headless CMS via a pluggable repository layer, selectable via
`NEXT_PUBLIC_USE_API`:

- `mock` — in-process fixtures, no backend required (`lib/api/mock/`)
- `laravel` — Laravel + Filament backend (`lib/api/laravel/`)

The Laravel mode includes a mapper layer that adapts Filament's API resource shape to the
domain interfaces in `lib/interfaces/`. (An earlier Django REST backend has since been retired.)

Pages use ISR; on content changes the backend calls `/api/revalidate` (authenticated with a
shared secret in the `x-revalidation-secret` header, compared in constant time), which
revalidates the affected paths so the next visitor gets fresh content.

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
make reset   # rebuild from a clean slate (down -v + up --build)
make clean   # remove built images + volumes
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (write) |
| `npm run format:check` | Prettier (check) |
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
  api/              On-demand revalidation endpoint
  (home)/, music/, tour/, video/, about/
  _components/      Shared layout/UI components
lib/
  api/              Backend clients (mock | laravel) + repositories
  interfaces/       Domain types
  services.config.ts  API-mode selector (NEXT_PUBLIC_USE_API)
factories/          Icon factory (react-icons)
utils/              Date/page/classname helpers (with tests)
```
