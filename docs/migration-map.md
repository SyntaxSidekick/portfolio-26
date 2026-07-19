# Migration Map

## Public routes

| Static source | React route | Initial migration priority | Notes |
| --- | --- | ---: | --- |
| `index.html` | `/` | 1 | Homepage migrates after public shell parity. |
| `bio.html` | `/bio` | 2 | Preserve current biography layout and Lucide icons. |
| `portfolio.html` | `/portfolio` | 3 | Keep static filters until API-backed project data is ready. |
| `portfolio-single.html` | `/portfolio/[slug]` | 4 | Initial route can use static seed data before API integration. |
| `blog.html` | `/blog` | 5 | Later retrieves SyntaxSidekick posts from WordPress API. |
| `blog-single.html` | `/blog/[slug]` | 6 | Later retrieves sanitized WordPress article content. |
| `contact.html` | `/contact` | 7 | Preserve current validation and accessibility behavior. |
| `privacy.html` | `/privacy` | 8 | Static legal route. |
| `terms.html` | `/terms` | 9 | Static legal route. |
| `404.html` | `/not-found` | 10 | Next.js not-found route should preserve static design. |

## First implementation phase route scope

The first phase should create the public shell only:

- `apps/web/src/app/layout.tsx`
- `apps/web/src/app/page.tsx` as a shell placeholder, not a full homepage migration
- shared header/footer shell components
- global shell CSS copied from the static source where needed

## Later dynamic data ownership

| Data | Source of truth | Notes |
| --- | --- | --- |
| Portfolio projects | MongoDB through `apps/api` | Use shared Zod schema from `packages/content-schema`. |
| Blog posts | SyntaxSidekick WordPress API | Do not duplicate posts in MongoDB. |
| Article media | WordPress Media Library | Use sanitized WordPress data. |
| Portfolio media metadata | Portfolio API/MongoDB | Store URLs, alt text, dimensions, and captions, not binary files. |
| Static approved design | `static/approved-static-site/` | Must remain untouched during migration. |
