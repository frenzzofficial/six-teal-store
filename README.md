# Six Teal Store

Storefront frontend for Six Teal Store, built with Next.js (App Router), React and Tailwind CSS 4.

Authentication, accounts and orders are served by a separate backend API. This repo is the web client only.

## Stack

- Next.js 16 · React 19 · TypeScript
- Tailwind CSS 4 with generated colour themes (`src/styles/themes`)
- Zustand (cart, wishlist, checkout, orders) · React Hook Form + Zod (forms)
- Axios client with CSRF and silent session refresh (`src/packages/api`)
- Bun · Biome · Husky + lint-staged + commitlint

## Getting started

```bash
bun install
cp .env.example .env.local
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

All variables are validated with Zod in `src/packages/env/`. See `.env.example` for the full list.
By default the browser calls this app's own `/api/*` and `next.config.ts` proxies it to
`API_PROXY_TARGET`, so session cookies stay first-party.

## Scripts

| Command             | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `bun dev`           | Start the dev server (builds themes first)     |
| `bun run build`     | Production build                               |
| `bun run verify`    | Lint, format, Biome check and typecheck        |
| `bun run typecheck` | `tsc --noEmit`                                 |
| `bun run knip`      | Report unused files, exports and dependencies  |

## Project layout

```
src/app/                 Routes: (public), (auth), (protected), cart, checkout, products...
src/components/features/ Feature UI: home, products, cart, checkout, account, auth...
src/components/ui/       Reusable UI primitives
src/packages/            Configs, env, API client, services, stores, schemas, hooks, utils
src/styles/              Global, UI and feature CSS, plus theme sources
```

Note: Google Fonts are fetched at build time (`next/font/google`), so the build needs network access
to `fonts.googleapis.com`.
