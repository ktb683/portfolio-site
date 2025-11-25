# Portfolio Website with Blog - Implementation Plan

## Project Overview
A modern static portfolio website with an integrated markdown-based blog system, built with TypeScript for optimal performance and hosting cost efficiency.

## Technology Stack

### Core Framework: Astro
**Why Astro:**
- Server-first architecture with zero JavaScript by default
- Native TypeScript support with type-safe frontmatter
- Built-in Markdown/MDX support with image optimization
- Excellent performance (63% Core Web Vitals passing rate)
- File-based routing system
- Perfect for content-driven sites like portfolios and blogs

### Supporting Technologies
- **Styling**: Tailwind CSS for modern, responsive layouts
- **Content**: Markdown/MDX for blog posts with frontmatter validation
- **Images**: Astro's built-in image optimization (see Image Strategy below)
- **Deployment**: Netlify, Vercel, or Cloudflare Pages (all support static sites)
- **Interactivity**: Vanilla JS + Astro islands (no framework needed for this scope)

### Image Strategy (2025 Best Practices)
Astro's `astro:assets` module handles modern image optimization out of the box:

**Storage Location:**
- **`src/assets/images/`** — Primary location for all images that need optimization
- Co-locate project images with content: `src/content/projects/[project]/images/`
- Avoid `public/` for images unless they must bypass optimization (e.g., favicons, OG images with exact dimensions)

**Implementation:**
- Use Astro's `<Image />` component for automatic WebP/AVIF conversion, responsive srcsets, and lazy loading
- Use `<Picture />` component for art direction and format fallbacks
- Import images directly in `.astro` files for type-safe dimensions
- For MDX content, use `![alt](./image.jpg)` with `remarkImages` plugin for automatic optimization

**Formats & Sizing:**
- Output: AVIF (primary), WebP (fallback), original format (legacy fallback)
- Define responsive widths: `[640, 768, 1024, 1280]` for hero images
- Thumbnails: Generate at `400w` for grid cards
- Use `loading="lazy"` and `decoding="async"` by default (Astro handles this)

**Example usage:**
```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/images/hero.jpg';
---
<Image src={heroImage} alt="Hero" widths={[640, 768, 1024, 1280]} sizes="100vw" />
```

## Implementation Phases

### Phase 1: Project Setup & Foundation
**Goal**: Establish the project structure and development environment

**Tasks**:
1. Initialize Astro project with TypeScript template
2. Configure Tailwind CSS integration
3. Set up project folder structure:
   ```
   src/
   ├── assets/
   │   └── images/     # Optimized images (processed by Astro)
   ├── components/     # Reusable UI components
   ├── layouts/        # Page layout templates
   ├── pages/          # Route pages (file-based routing)
   ├── content/        # Blog posts and portfolio items
   │   ├── blog/       # Markdown blog posts
   │   └── projects/   # Portfolio project entries (with co-located images)
   ├── styles/         # Global styles
   └── utils/          # Helper functions
   ```
4. Configure TypeScript paths and compilation options
5. Set up content collections with Zod schemas for type safety
6. Create base layout component with header, footer, navigation

**Deliverables**:
- Working development environment
- Basic site structure with navigation
- Content collection schemas defined

---

### Phase 2: Layout System & Design System
**Goal**: Create a flexible, reusable layout system for portfolio pages

**Tasks**:
1. Design and implement layout components:
   - `BaseLayout.astro` - Main wrapper with meta tags
   - `PortfolioLayout.astro` - Grid-based portfolio display
   - `BlogLayout.astro` - Blog post layout with sidebar
   - `ProjectLayout.astro` - Individual project showcase
2. Create component library:
   - `Card.astro` - Flexible card component for projects
   - `Hero.astro` - Hero section component
   - `Grid.astro` - Responsive grid container
   - `Section.astro` - Content section wrapper
3. Implement Tailwind configuration:
   - Custom color palette
   - Typography system
   - Spacing utilities
   - Responsive breakpoints
4. Create utility CSS classes for common patterns
5. Implement dark mode support:
   - Use Tailwind's `darkMode: 'class'` strategy
   - Create theme toggle component with localStorage persistence
   - Respect `prefers-color-scheme` as default
   - Apply dark variants to all components from the start

**Deliverables**:
- Complete component library
- Reusable layout templates
- Consistent design system with dark mode

---

### Phase 3: Portfolio Section
**Goal**: Build the portfolio showcase with project pages

**Tasks**:
1. Define portfolio content collection schema:
   ```typescript
   // Example schema
   {
     title: string
     description: string
     date: Date
     tags: string[]
     images: string[]
     featured: boolean
     externalLink?: string
     github?: string
   }
   ```
2. Create portfolio index page (`/portfolio`)
3. Implement portfolio grid with filtering by tags
4. Build individual project page template
5. Add image galleries with lightbox functionality
6. Implement featured projects section for homepage
7. Create example portfolio entries

**Deliverables**:
- Portfolio index page with filtering
- Individual project pages
- Working portfolio content collection

---

### Phase 4: Blog System
**Goal**: Implement a markdown-based blog with full features

**Tasks**:
1. Define blog content collection schema:
   ```typescript
   // Example schema
   {
     title: string
     description: string
     publishDate: Date
     author: string
     tags: string[]
     coverImage?: string
     draft: boolean
   }
   ```
2. Create blog index page (`/blog`)
3. Implement blog post template with:
   - Table of contents (auto-generated from headings)
   - Reading time estimate
   - Syntax highlighting for code blocks
   - Image optimization
4. Add pagination for blog index
5. Implement tag-based filtering and tag pages
6. Create RSS feed generation
7. Add related posts section
8. Write example blog posts with images

**Deliverables**:
- Fully functional blog system
- Blog index with pagination
- Individual blog post pages
- Tag filtering and RSS feed

---

### Phase 5: Homepage & Navigation
**Goal**: Create an engaging homepage and intuitive navigation

**Tasks**:
1. Design and implement homepage sections:
   - Hero section with introduction
   - Featured projects showcase
   - Recent blog posts preview
   - Skills/technologies section
   - Contact/social links section
2. Implement site navigation:
   - Responsive header with mobile menu
   - Active page indicators
   - Breadcrumbs for deep pages
3. Add footer with:
   - Social media links
   - Quick navigation
   - Copyright information
4. Implement SEO optimizations:
   - Meta tags component
   - Open Graph tags
   - Structured data (JSON-LD)
   - Sitemap generation

**Deliverables**:
- Complete homepage
- Responsive navigation system
- SEO-optimized pages

---

### Phase 6: Content & Polish
**Goal**: Add real content and final refinements

**Tasks**:
1. Create actual portfolio project entries
2. Write and publish initial blog posts
3. Add portfolio images and optimize
4. Implement 404 error page
5. Add loading states and transitions
6. Performance optimization:
   - Image lazy loading
   - Font optimization
   - Bundle size analysis
7. Accessibility audit and fixes
8. Cross-browser testing
9. Mobile responsiveness verification

**Deliverables**:
- Production-ready content
- Optimized performance
- Accessible, responsive site

---

### Phase 7: Deployment & CI/CD
**Goal**: Deploy the site and set up continuous deployment

**Tasks**:
1. Choose hosting provider (Netlify/Vercel/Cloudflare Pages)
2. Configure build settings
3. Set up custom domain (if applicable)
4. Configure deployment from Git repository
5. Set up preview deployments for branches
6. Implement analytics (optional):
   - Plausible, Fathom, or Google Analytics
7. Add contact form with serverless function (optional)
8. Create deployment documentation

**Deliverables**:
- Live production site
- Automated deployments
- Deployment documentation

---

## Optional Enhancements

### Future Considerations
- **Search functionality**: Add client-side search with Fuse.js or Pagefind
- **Comments system**: Integrate Giscus or utterances for blog comments
- **Newsletter**: Add email subscription with Buttondown or ConvertKit
- **CMS Integration**: Connect Decap CMS or Sanity for easier content management
- **i18n**: Add internationalization support for multiple languages
- **View transitions**: Utilize Astro's built-in view transitions for smooth navigation
- **Interactive demos**: Embed CodeSandbox or interactive elements for projects

---

## Development Guidelines

### Content Management
- Blog posts stored in `src/content/blog/` as `.md` or `.mdx` files
- Portfolio entries in `src/content/projects/` with frontmatter
- Images in `src/assets/images/` for shared assets, or co-located with content
- Use Astro's `<Image />` and `<Picture />` components for automatic optimization
- Avoid `public/` for images unless optimization must be bypassed

### Code Standards
- TypeScript strict mode enabled
- ESLint and Prettier for code formatting
- Component-first architecture (pure Astro components, no framework dependencies)
- Semantic HTML and ARIA labels
- Mobile-first responsive design
- Dark mode as default consideration (all components styled for both themes)

### Performance Targets
- Lighthouse score > 95
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Total bundle size < 100KB (excluding images)

---

## Timeline Estimate
- **Phase 1**: 1-2 days
- **Phase 2**: 2-3 days
- **Phase 3**: 2-3 days
- **Phase 4**: 3-4 days
- **Phase 5**: 2-3 days
- **Phase 6**: 2-3 days
- **Phase 7**: 1-2 days

**Total**: ~2-3 weeks for full implementation

---

## Getting Started
Begin with Phase 1 by running:
```bash
npm create astro@latest -- --template basics --typescript strict
```

Then follow each phase sequentially, testing thoroughly before moving to the next phase.
