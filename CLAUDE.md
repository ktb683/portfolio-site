# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server at localhost:4321
pnpm build        # Build to ./dist/
pnpm preview      # Preview production build
pnpm lint         # ESLint on .ts and .astro files
pnpm lint:fix     # Auto-fix lint issues
pnpm format       # Format with Prettier
pnpm typecheck    # Astro type checking
```

## Architecture

This is an **Astro 5** portfolio site with **Tailwind CSS 4**. Content is driven by Astro content collections (Markdown + frontmatter), and pages use file-based routing.

### Content Collections (`src/content/`)

Projects live in `src/content/projects/[slug]/index.md` alongside their images. The schema is defined in `src/content/config.ts` using Zod. Adding a new project means creating a new folder with `index.md` and images — no code changes needed.

Key frontmatter fields: `title`, `description`, `startDate`, `endDate`, `ongoing`, `location`, `tags`, `image` (thumbnail), `images` (gallery array), `featured`, and optional `videoLink`, `externalLink`, `github`.

### Routing

- `/` — home: featured project hero + grid of all projects
- `/about` — bio/contact
- `/cv` — experience, education, skills
- `/projects/[slug]` — dynamic project detail pages via `src/pages/projects/[...slug].astro`

### Layout Hierarchy

`Layout.astro` (base HTML + theme script) → `BaseLayout.astro` (adds Header + Footer) → page-specific layouts (`PortfolioLayout`, `ProjectLayout`, `BlogLayout`).

### Path Aliases (tsconfig.json)

```
@components/* → src/components/*
@layouts/*    → src/layouts/*
@assets/*     → src/assets/*
@content/*    → src/content/*
@utils/*      → src/utils/*
```

### Styling

Custom Tailwind theme defined in `src/styles/global.css` via CSS custom properties:
- Background: dark purple `#3B3543`
- Accent/teal: `#24C29D`
- Border: `#6b6580`

Tailwind is loaded via `@tailwindcss/vite` plugin (not the PostCSS plugin).

### Images in Content

Project images are resolved dynamically using `import.meta.glob` in `[...slug].astro`. Image paths in frontmatter are relative to the project folder and resolved at build time.
