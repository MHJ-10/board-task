# Board Task — Next.js App

Lightweight Kanban-style board built with Next.js App Router, Zustand and dnd-kit.

## Features

- Drag & drop cards between lists (dnd-kit)
- Global state with Zustand (persisted to `localStorage`)
- Simple card comments modal
- SCSS with BEM-style component blocks

## Tech

- Next.js (App Router)
- React (client components)
- Zustand (state management) with `persist`
- dnd-kit (drag & drop)
- SCSS (styles in `app/styles/components`)

## Quickstart

Prerequisites: Node 18+, pnpm

1. Install dependencies

   ```bash
   pnpm install
   ```
2. Run dev server

   ```bash
   pnpm dev
   ```

3. Open 
   ```bash
   http://localhost:3000
   ```

## Important files

- `app/components/pages/board.tsx` — main board page
- `app/store/board-store.ts` — Zustand store (uses `persist`)
- `app/constants/mock-data.ts` — deterministic demo board seeded when no persisted state
- `app/styles/components/*.scss` — component SCSS (BEM blocks)

## Persistence & Reset

- The store persists under `localStorage` key `board-storage`.
- To inspect saved state in the browser console:

  localStorage.getItem('board-storage')

- To reset (re-seed demo board):

  localStorage.removeItem('board-storage')
  location.reload()

If you want a UI button to clear or re-seed, add a small control that calls `localStorage.removeItem('board-storage')` or the exported `clearPersistedKey` helper from `@/utils`.

## Styling

Styles follow a BEM-like pattern (e.g. `.task-list` with `&__title`, `&__tasks`). Check `app/styles/components` for blocks like `_card.scss`, `_task-list.scss`, `_list.scss`.



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
