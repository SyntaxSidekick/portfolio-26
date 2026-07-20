# Portfolio 2026 Development Handoff

## Executive Summary

The repository is on `dev`, synchronized with `origin/dev`, clean for all tracked/untracked source files before this handoff file was created, and the latest committed work has been pushed. The active public portfolio app is now a Next.js App Router + React + TypeScript application under `apps/web`. The approved static site is preserved under `static/approved-static-site`.

The public web app builds successfully and prerenders all current routes. However, several migrated pages still contain large static JSX copies of the original markup, and some original JavaScript behaviors have not yet been converted to React. There is no `static.tsx` file and no active raw-HTML static renderer.

## Git and Repository State

Repository root path: `D:\Syntax-Sidekick\Desktop\portfolio-functional`

Current branch: `dev`

Upstream: `origin/dev`

Latest commit: `8c1c17efddc45c6b629af8b596ec2784f7c76639`

Latest commit message: `feat: complete public React migration foundation`

Remote sync state: synchronized with remote, `0` ahead and `0` behind at inspection time.

Working tree before creating this file: clean for tracked and untracked source files.

Working tree after creating this file: contains one new untracked file, `handoff.md`.

Committed and pushed work:

- `8c1c17e feat: complete public React migration foundation`
- `7f153b2 Checkpoint interrupted static restructuring`
- `90d1cec Checkpoint before static cleanup`
- `a6e590b Prevent CRLF line ending conversion`
- `9af66d2 Preserve completed static portfolio baseline`

Committed but not pushed work: none confirmed by Git.

Uncommitted work: `handoff.md` after this handoff-file creation.

Untracked work: `handoff.md` after this handoff-file creation.

Ignored/generated/dependency files currently present:

- `apps/admin/dist/`
- `apps/admin/node_modules/`
- `apps/admin/tsconfig.tsbuildinfo`
- `apps/api/node_modules/`
- `apps/api/tsconfig.tsbuildinfo`
- `apps/web/.next/`
- `apps/web/node_modules/`
- `apps/web/tsconfig.tsbuildinfo`
- `node_modules/`
- `packages/*/node_modules/`

Stashes: none.

Merge conflicts: none.

Temporary/generated files not production source:

- `.next`
- `dist`
- `node_modules`
- `tsconfig.tsbuildinfo`

These should remain ignored and should not be treated as production code.

## Current Architecture

Existing top-level directories:

- `apps/`
- `docs/`
- `js/`
- `packages/`
- `scripts/`
- `static/`

No top-level `archive` directory exists. No top-level `public` directory exists. The active public asset directory is `apps/web/public`.

Applications:

- `apps/web`: active public portfolio application. Uses Next.js 16, React 19, TypeScript, App Router, `.tsx`, `.ts`, and CSS.
- `apps/admin`: Vite + React + TypeScript admin placeholder. Builds, but only contains a placeholder screen.
- `apps/api`: Express + TypeScript API placeholder. Has only a `/health` endpoint.

Packages:

- `packages/config`: placeholder shared config package.
- `packages/content-schema`: placeholder content schema package.
- `packages/design-tokens`: placeholder design token package.
- `packages/technology-registry`: placeholder technology registry package.
- `packages/ui`: placeholder shared UI package.

Preserved static-site work:

- `static/approved-static-site` contains the approved flat static baseline.
- `static/approved-static-site/admin` contains the old static admin prototype and is not the active Vite admin app.

Active production source code:

- Public web source: `apps/web/src`
- Admin source: `apps/admin/src`
- API source: `apps/api/src`
- Shared package source: `packages/*/src`

Global styles and page styles:

- Next global entry: `apps/web/src/app/globals.css`
- Shared style imports: `apps/web/src/styles`
- Page CSS: colocated in `apps/web/src/app`
- Components: `apps/web/src/components`
- Data: `apps/web/src/data`
- Active assets: `apps/web/public/assets/images`

Major tools:

- Next.js, React, TypeScript for public web.
- Vite, React, TypeScript for admin.
- Express, TypeScript, CORS, dotenv, MongoDB dependency, Zod dependency for API.
- Native CSS, not SCSS, in the active source.

## Work Completed Today

Based on Git history, today's completed work was:

1. Static baseline preserved.
   - Commit: `9af66d2 Preserve completed static portfolio baseline`
   - Added the original static site pages, CSS, JS, assets, and serve script.
   - Tested/committed/pushed: committed and pushed.

2. Line-ending protection added.
   - Commit: `a6e590b Prevent CRLF line ending conversion`
   - Added `.gitattributes`.
   - Tested/committed/pushed: committed and pushed.

3. Static cleanup checkpoint.
   - Commit: `90d1cec Checkpoint before static cleanup`
   - Added shared CSS token work and modified blog article CSS.
   - Tested/committed/pushed: committed and pushed.

4. Interrupted static restructuring checkpoint.
   - Commit: `7f153b2 Checkpoint interrupted static restructuring`
   - Added flattened static pages and consolidated CSS/JS.
   - Tested/committed/pushed: committed and pushed.

5. Public React migration foundation.
   - Commit: `8c1c17e feat: complete public React migration foundation`
   - Added pnpm workspace, Next web app, Vite admin placeholder, Express API placeholder, shared packages, migration docs, preserved static archive, migrated public pages, shared shell, styles, data files, and active assets.
   - Tested/committed/pushed: committed and pushed.
   - Validation today: all requested typecheck/lint/build commands passed.

Special migration notes:

- Header/footer were integrated through `apps/web/src/components/site-shell.tsx`.
- Route-aware body scope is handled in `SiteShell` by setting `document.body.dataset.page`.
- Lucide hydration is handled by dynamically loading the UMD Lucide script in `SiteShell`.
- CSS was migrated into global/page CSS files, but much of it still depends on `body[data-page="..."]`.
- TypeScript route/data files exist.
- Accessibility CSS exists at `apps/web/src/styles/accessibility.css`, and focus/reduced-motion rules are present.
- The 404 route exists through `apps/web/src/app/not-found.tsx`, but it is minimal text, not the full archived static 404 design.
- Temporary compatibility layer: `body[data-page]` route scoping and Lucide `data-lucide` placeholders preserve parts of the static implementation during migration.

## Static Rendering System

`static.tsx` does not exist anywhere in the repository.

Exact path: not applicable.

There is no dedicated static-page rendering component that injects raw HTML.

Current implementation:

- Each route is a real Next App Router page under `apps/web/src/app`.
- Several pages contain large JSX translations of the old static HTML.
- No active file uses `dangerouslySetInnerHTML`.
- No active raw HTML injection was found.

Routes using static-like copied JSX:

- `apps/web/src/app/bio/page.tsx`
- `apps/web/src/app/portfolio/page.tsx`
- `apps/web/src/app/portfolio/[slug]/page.tsx`
- `apps/web/src/app/blog/page.tsx`
- `apps/web/src/app/blog/[slug]/page.tsx`
- `apps/web/src/app/contact/page.tsx`
- `apps/web/src/app/privacy/page.tsx`
- `apps/web/src/app/terms/page.tsx`

Lucide handling:

- Bio page contains `data-lucide` placeholders.
- `apps/web/src/components/site-shell.tsx` loads `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`.
- `window.lucide.createIcons()` runs after load and again when `pathname` changes.
- Load listeners are cleaned up.
- The external script element is not removed after route changes.

Client-side navigation:

- `SiteShell` watches `usePathname`.
- It updates `body[data-page]`.
- It reruns Lucide icon creation on path changes.
- Shell listeners for scroll, Escape, resize, and Lucide load are cleaned up.
- Contact form listeners are cleaned up in `apps/web/src/app/contact/contact-form-behavior.tsx`.

Known risks:

- External Lucide CDN dependency can fail offline or be blocked.
- Some Lucide `<i>` placeholders in bio lack explicit `aria-hidden`.
- Large copied JSX pages are transitional and hard to maintain.
- Dynamic single pages validate slugs but render the same static content for every valid slug.
- No browser hydration warnings were observed because no browser runtime test was run; production build passed.

Recommendation: keep the current transitional implementation temporarily, refactor it next in small page-by-page steps, and replace duplicated static JSX with data-driven React components later. Do not remove the preserved static archive.

## Route Status

Build-tested routes from Next production output:

| Route | Source | Status | Notes |
|---|---|---:|---|
| `/` | `apps/web/src/app/page.tsx` | Working | Static prerender passed. Header/footer present through shell. Role rotation is React. Images reference active local assets and remote URLs. Not browser-click-tested. |
| `/bio` | `apps/web/src/app/bio/page.tsx` | Partially working | Static prerender passed. Lucide placeholders depend on external CDN initializer. Large copied JSX. Not browser-click-tested. |
| `/portfolio` | `apps/web/src/app/portfolio/page.tsx` | Partially working | Static prerender passed. Filter buttons exist, but original portfolio filtering behavior is not converted to React. |
| `/portfolio/[slug]` | `apps/web/src/app/portfolio/[slug]/page.tsx` | Partially working | 18 SSG paths generated. Invalid slugs call `notFound`. Valid slugs all render the same static project content. |
| `/blog` | `apps/web/src/app/blog/page.tsx` | Partially working | Static prerender passed. Original search/filter/sort/pagination behavior appears not converted to React. |
| `/blog/[slug]` | `apps/web/src/app/blog/[slug]/page.tsx` | Partially working | 14 SSG paths generated. Invalid slugs call `notFound`. Valid slugs all render the same static article content. |
| `/contact` | `apps/web/src/app/contact/page.tsx` | Partially working | Static prerender passed. React/DOM validation behavior exists and cleans up. Submit is a demo message, not backend integration. |
| `/privacy` | `apps/web/src/app/privacy/page.tsx` | Working | Static prerender passed. Simple legal page. |
| `/terms` | `apps/web/src/app/terms/page.tsx` | Working | Static prerender passed. Simple legal page. |
| `/_not-found` / 404 | `apps/web/src/app/not-found.tsx` | Partially working | Build passed. Minimal not-found page only; does not match archived full static 404 design. |

Header: implemented globally in `SiteShell`.

Footer: implemented globally in `SiteShell`.

Responsiveness: CSS media queries exist, but no browser viewport testing was run during this handoff.

Icons: inline SVG shell icons are active; bio Lucide icons depend on the CDN script.

Images: local logo/profile images exist; many portfolio/blog images are remote Unsplash or Placehold URLs and were not fetched in browser validation.

## Styling State

Global CSS entry:

- `apps/web/src/app/globals.css`

Shared style modules:

- `apps/web/src/styles/globals.css`
- `apps/web/src/styles/tokens.css`
- `apps/web/src/styles/reset.css`
- `apps/web/src/styles/base.css`
- `apps/web/src/styles/components.css`
- `apps/web/src/styles/typography.css`
- `apps/web/src/styles/utilities.css`
- `apps/web/src/styles/accessibility.css`

Page styles:

- `apps/web/src/app/home.css`
- `apps/web/src/app/bio/bio.css`
- `apps/web/src/app/portfolio/portfolio.css`
- `apps/web/src/app/portfolio/[slug]/portfolio-single.css`
- `apps/web/src/app/blog/blog.css`
- `apps/web/src/app/blog/[slug]/blog-single.css`
- `apps/web/src/app/contact/contact.css`
- `apps/web/src/app/privacy/legal.css`
- `apps/web/src/app/terms/legal.css`
- `apps/web/src/app/not-found.css`

Legacy/archived styles:

- `static/approved-static-site/css/styles.css`

Duplicate styles:

- `apps/web/src/app/privacy/legal.css` and `apps/web/src/app/terms/legal.css` appear duplicated.
- `apps/web/src/app/globals.css` imports shared globals and also defines many shell/global variables and styles directly.
- Page CSS still contains many `body[data-page="..."]` selectors from the static-site structure.

Ordering dependencies:

- Next imports `apps/web/src/app/globals.css` from layout.
- `apps/web/src/app/globals.css` imports `apps/web/src/styles/globals.css`.
- Page CSS is imported directly by each route file.

Confirmed implemented:

- Maximum content width of `1400px` appears in global/home CSS.
- Native CSS is used.
- Focus states exist.
- Reduced-motion rules exist.
- Responsive media queries exist.
- Light/dark theme variables exist via `html[data-theme="light"]` and default dark variables.

Not fully verified:

- No visual browser testing was run for specificity conflicts or responsive parity.
- Some page styles still depend on static HTML structure and `body[data-page]`.

## JavaScript and Client-Side Behavior

Active React/client behavior:

- Header/mobile menu/theme/back-to-top/page-scope/Lucide loading: `apps/web/src/components/site-shell.tsx`
- Home role rotation: `apps/web/src/components/home/rotating-roles.tsx`
- Contact form validation: `apps/web/src/app/contact/contact-form-behavior.tsx`

Legacy/static behavior reference:

- `js/scripts.js`
- `static/approved-static-site/js/scripts.js`
- Documented in `docs/javascript-behavior-inventory.md`

Behavior status:

- Navigation: React shell, works by source/build inspection.
- Mobile menu: React state, closes on link click/Escape/desktop resize.
- Theme controls: React state + `localStorage` + `documentElement.dataset.theme`.
- Portfolio filters: markup exists, behavior not converted.
- Role rotation: React client component, interval cleaned up.
- Modals: no active modal implementation found.
- Accordions: no active accordion implementation confirmed.
- Form validation: active DOM-based client component with cleanup.
- Lucide initialization: active CDN script loader, reruns per route.
- Route-specific initialization: `body[data-page]` update on route change.
- Scroll behavior: scrolled header listener and back-to-top.
- Animations: CSS animations/transitions; some static reveal behavior appears not converted.
- Cleanup: shell/contact/role listeners clean up; Lucide script remains loaded.

Recommended conversion later:

- Convert portfolio filters to React state.
- Convert blog search/filter/sort/pagination/newsletter behavior to React.
- Convert blog-single reading progress, TOC, copy/share, feedback behavior to React.
- Replace DOM-query contact behavior with controlled React form logic when backend integration begins.

## Assets and Images

Active web assets:

- `apps/web/public/assets/images/riad-kilani-logo.svg`
- `apps/web/public/assets/images/riad-kilani-main-profile-pic.png`
- `apps/web/public/assets/images/riad-kilani-alt-profile-pic.png`

Archived assets:

- `static/approved-static-site/assets/images`

Asset usage:

- Active local assets are referenced by URL paths like `/assets/images/riad-kilani-logo.svg`.
- Many portfolio/blog images are referenced as remote `https://images.unsplash.com/...` or `https://placehold.co/...` URLs.
- Assets are not imported as Next image modules.
- Archived assets are duplicated from the active image set but are not imported by the active app.
- No broken local active asset paths were found by file inspection.
- Remote image availability was not browser-tested.
- Missing 404 illustration: no active 404 illustration asset was found in `apps/web/public/assets/images`. The active 404 page is text-only.

## Admin Application Status

Path: `apps/admin`

Tooling:

- Vite
- React 19
- TypeScript
- React Router dependency present

Current implementation:

- `apps/admin/src/app.tsx` renders a placeholder:
  - `Portfolio Admin`
  - `Admin workspace placeholder`

Validation:

- Typecheck passed.
- Lint script passed.
- Build passed.
- Build emitted non-fatal Vite warnings about React Router package-level `"use client"` directives being ignored during bundling.

Meaningful implementation: scaffolding/placeholder only.

Main routes/screens: one placeholder screen.

Data models: none found.

Portfolio management: not implemented.

Blog management: not implemented.

Analytics dashboard: not implemented.

WordPress integration: not implemented.

Next logical task: leave admin alone until the public portfolio app is stable, then define admin requirements, auth, and data contracts before building screens.

## API Application Status

Path: `apps/api`

Tooling:

- Express 5
- TypeScript
- CORS
- dotenv dependency
- MongoDB dependency
- Zod dependency
- tsx for dev

Current implementation:

- `apps/api/src/index.ts`
- Express app with JSON middleware, CORS, and `GET /health`.
- Starts on `PORT` or `4000`.

Validation:

- Typecheck passed.
- Lint script passed.
- Build script passed.

Meaningful implementation: minimal health endpoint only.

Existing API endpoints:

- `GET /health` returns `{ ok: true, service: "portfolio-api" }`

Existing data models: none.

WordPress integration: not implemented.

Portfolio-management API: not implemented.

Blog-management API: not implemented.

Analytics API: not implemented.

Next logical task: defer until public app content model and admin needs are clearer.

## Validation Results

Commands inspected from package files:

- Root package scripts exist for `dev`, `build`, `lint`, `typecheck`, `test`.
- Web/admin/api each define `typecheck`, `lint`, and `build`.

Validation run:

| Command | Result | Notes |
|---|---:|---|
| `pnpm --filter @portfolio/web typecheck` | Passed | `tsc --noEmit --pretty false` |
| `pnpm --filter @portfolio/web lint` | Passed | Same TypeScript no-emit command |
| `pnpm --filter @portfolio/web build` | Passed | Next build compiled and generated 41 static pages |
| `pnpm --filter @portfolio/admin typecheck` | Passed | `tsc --noEmit --pretty false` |
| `pnpm --filter @portfolio/admin lint` | Passed | Same TypeScript no-emit command |
| `pnpm --filter @portfolio/admin build` | Passed | Vite build succeeded with non-fatal React Router `"use client"` warnings |
| `pnpm --filter @portfolio/api typecheck` | Passed | `tsc --noEmit --pretty false` |
| `pnpm --filter @portfolio/api lint` | Passed | Same TypeScript no-emit command |
| `pnpm --filter @portfolio/api build` | Passed | Same TypeScript no-emit command |

Next web build output confirmed:

- `/`
- `/_not-found`
- `/bio`
- `/blog`
- `/blog/[slug]`
- `/contact`
- `/portfolio`
- `/portfolio/[slug]`
- `/privacy`
- `/terms`

Not run:

- Browser runtime testing.
- Hydration warning inspection in DevTools.
- Responsive screenshot testing.
- Console warning checks in an actual browser.

## Known Problems and Technical Debt

P0: none currently confirmed.

P1: Dynamic detail routes render identical content for every valid slug.

- Affected files: `apps/web/src/app/portfolio/[slug]/page.tsx`, `apps/web/src/app/blog/[slug]/page.tsx`
- User-visible effect: different URLs can show the same project/article content.
- Likely cause: slug validation was added before content rendering was made data-driven.
- Recommended next step: make one detail route data-driven first, validate, then repeat.
- Handle immediately.

P1: Portfolio and blog interactive behavior is incomplete.

- Affected files: `apps/web/src/app/portfolio/page.tsx`, `apps/web/src/app/blog/page.tsx`
- User-visible effect: filter/search/sort/pagination controls may not work.
- Likely cause: original DOM JS behavior has not been converted to React.
- Recommended next step: convert one behavior at a time into small client components.
- Handle immediately after route parity is confirmed.

P2: Static-copy JSX is large and difficult to maintain.

- Affected files: bio, portfolio, blog, detail, contact route files under `apps/web/src/app`.
- User-visible effect: low direct impact now, high maintenance risk.
- Likely cause: migration prioritized visual parity and buildability.
- Recommended next step: extract small components only where repetition is real.
- Handle later, page by page.

P2: CSS still relies heavily on `body[data-page]`.

- Affected files: `apps/web/src/app`, `apps/web/src/styles`.
- User-visible effect: possible specificity/order fragility.
- Likely cause: static-site CSS compatibility layer.
- Recommended next step: keep temporarily, reduce while converting pages.
- Handle later.

P2: Lucide icons rely on external CDN script.

- Affected files: `apps/web/src/components/site-shell.tsx`, `apps/web/src/app/bio/page.tsx`.
- User-visible effect: bio icons can fail if CDN is blocked.
- Likely cause: compatibility with static `data-lucide` placeholders.
- Recommended next step: replace with local React icon components or inline SVGs when refactoring bio.
- Handle later unless icons fail in production.

P2: 404 page is minimal and likely not design-parity complete.

- Affected file: `apps/web/src/app/not-found.tsx`.
- User-visible effect: 404 experience is plain compared with approved static site.
- Likely cause: placeholder migration.
- Recommended next step: migrate approved 404 design from `static/approved-static-site/404.html`.
- Handle soon.

P3: Admin and API are placeholders.

- Affected files: `apps/admin/src/app.tsx`, `apps/api/src/index.ts`.
- User-visible effect: no admin/product backend features yet.
- Likely cause: workspace foundation came first.
- Recommended next step: finish public app before expanding.
- Handle later.

## Exact Stopping Point

Last completed task: validation of web, admin, and API typecheck/lint/build scripts, followed by creation of this `handoff.md` file.

Last meaningful committed task: `feat: complete public React migration foundation`.

Latest commit: `8c1c17efddc45c6b629af8b596ec2784f7c76639`.

Pushed: yes, Git confirms `dev` is synchronized with `origin/dev` at inspection time.

Last successful validation command: `pnpm --filter @portfolio/api build`.

Repository safe to close: yes.

Unsaved/uncommitted work: this `handoff.md` file is uncommitted unless committed after creation.

Generated ignored files present after validation:

- `.next`
- `dist`
- `tsconfig.tsbuildinfo`
- `node_modules`

First file to open next: `apps/web/src/app/portfolio/[slug]/page.tsx`

First task next: make `/portfolio/[slug]` render project-specific data instead of the same static project for every valid slug.

## Pair-Programming Workflow

Use this loop:

```text
Explain
Developer attempts
Review
Correct
Validate
Commit
```

Recommended rules:

1. Explain the task and the current files before writing code.
2. Keep each task small enough to understand in one sitting.
3. Ask the developer to make the first attempt when practical.
4. Review the developer's code before replacing it.
5. Explain TypeScript and React errors directly.
6. Provide targeted corrections instead of rewriting entire files.
7. Avoid broad automated refactors.
8. Avoid new abstractions until duplication or complexity proves they are needed.
9. Preserve the approved design and static archive.
10. Prefer Server Components unless browser APIs or state are required.
11. Convert legacy DOM behavior into focused client components.
12. Run validation after each small milestone.
13. Commit only at clean stopping points.
14. Never move large groups of files without first explaining why.
15. Never redesign working pages unless explicitly requested.

## Tomorrow's 7:00 AM Plan

7:00 AM

- Task: Review this handoff and confirm Git state.
- Goal: Ensure `dev` is clean and synchronized, except for `handoff.md` if it has not been committed.
- Files likely involved: `handoff.md`.
- Validation checkpoint: `git status --short --branch`.
- Suggested commit point: commit `handoff.md` if the owner wants this report versioned.

7:15 AM

- Task: Inspect portfolio detail route and data.
- Goal: Understand why every slug renders the same project.
- Files likely involved: `apps/web/src/app/portfolio/[slug]/page.tsx`, `apps/web/src/data/portfolio-projects.ts`.
- Validation checkpoint: `pnpm --filter @portfolio/web typecheck`.
- Suggested commit point: none yet.

7:45 AM

- Task: Expand one portfolio project data object and render it.
- Goal: Make `/portfolio/pipelineos` data-driven without changing the whole route system.
- Files likely involved: `apps/web/src/data/portfolio-projects.ts`, `apps/web/src/app/portfolio/[slug]/page.tsx`.
- Validation checkpoint: `pnpm --filter @portfolio/web typecheck` and `pnpm --filter @portfolio/web build`.
- Suggested commit point: commit if one slug renders correctly and build passes.

8:45 AM

- Task: Repeat data-driven rendering pattern for remaining portfolio slugs.
- Goal: Remove identical-detail-page behavior.
- Files likely involved: same portfolio files.
- Validation checkpoint: web typecheck/build.
- Suggested commit point: commit when all portfolio detail pages render unique data.

10:00 AM

- Task: Review portfolio index links and missing interactions.
- Goal: Decide whether to implement filters next or continue detail page parity.
- Files likely involved: `apps/web/src/app/portfolio/page.tsx`, `apps/web/src/app/portfolio/portfolio.css`.
- Validation checkpoint: web typecheck/build, plus browser check if available.
- Suggested commit point: after one working interaction milestone.

11:00 AM

- Task: Start blog detail route data-driven conversion.
- Goal: Avoid identical content across `/blog/[slug]`.
- Files likely involved: `apps/web/src/app/blog/[slug]/page.tsx`, `apps/web/src/data/blog-posts.ts`.
- Validation checkpoint: web typecheck/build.
- Suggested commit point: after one article renders from data.

## First Action Tomorrow

Open `apps/web/src/app/portfolio/[slug]/page.tsx`, compare it with `apps/web/src/data/portfolio-projects.ts`, and confirm the repo state with `git status --short --branch` before writing code.