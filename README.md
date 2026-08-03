# Portfolio 2026

Portfolio 2026 is a TypeScript monorepo for Riad Kilani's public portfolio, portfolio API, and local admin interface. The public site reads project data from MongoDB through the API, while the admin app manages portfolio content, media, categories, technologies, and case-study details.

## Tech Stack

- **Workspace:** pnpm workspaces
- **Language:** TypeScript
- **Public web app:** Next.js, React
- **Admin app:** Vite, React, React Router
- **API:** Node.js, Express
- **Database:** MongoDB
- **Validation:** Zod
- **Media processing:** Sharp
- **Icons:** Font Awesome brand icons, Lucide interface icons
- **Testing:** Vitest, Node test runner, TypeScript checks
- **Local runtime:** Docker Compose

## Project Structure

```text
apps/
  web/      Public Next.js portfolio site
  admin/    Local portfolio admin interface
  api/      Express API, MongoDB access, media handling

packages/
  config/               Shared configuration package
  content-schema/       Shared content schema package
  design-tokens/        Shared design token package
  technology-registry/  Canonical technology metadata and icons
  ui/                   Shared UI package placeholder

storage/
  media/    Local media files used by the API during development

static/
  approved-static-site/ Historical approved static baseline
```

## Run With Docker

Docker is the recommended local setup because it starts MongoDB, the API, the admin app, and the public web app together.

### Requirements

- Docker Desktop
- Git

### Start The Stack

From the repository root:

```bash
docker compose up -d
```

Then open:

```text
Public site: http://localhost:3000
Admin app:   http://localhost:5173
API:         http://localhost:4000
MongoDB:     localhost:27017
```

Useful checks:

```bash
docker compose ps
docker compose logs -f api
docker compose logs -f web
docker compose logs -f admin
```

Stop everything:

```bash
docker compose down
```

Stop everything and remove Docker volumes:

```bash
docker compose down -v
```

Only use `-v` when you intentionally want to remove the Docker MongoDB data volume.

## Docker Data And Media

The Docker stack uses a MongoDB service named `mongodb` and stores its database in the Docker volume:

```text
portfolio-mongodb-data
```

The API uses this Docker connection string inside the compose network:

```text
mongodb://mongodb:27017/portfolio
```

Local media files are bind-mounted into the API container:

```text
./storage/media -> /app/apps/api/storage/media
```

That allows portfolio image URLs like this to work during local Docker development:

```text
http://localhost:4000/media/originals/...
```

Media binaries, generated thumbnails, database exports, logs, and backups are intentionally ignored by Git.

## Optional Native Development

If you are not using Docker, install dependencies with pnpm and run services manually.

```bash
pnpm install
```

Start MongoDB locally, then run:

```bash
pnpm dev:api
pnpm dev:admin
pnpm dev:web
```

Native local environment examples live in:

```text
apps/api/.env.example
apps/admin/.env.example
apps/web/.env.example
```

Copy them to local `.env` files as needed. Real `.env` files must not be committed.

## Common Commands

Run all package builds:

```bash
pnpm build
```

Run all type checks:

```bash
pnpm typecheck
```

Run all lint checks:

```bash
pnpm lint
```

Run all tests:

```bash
pnpm test
```

Run one app:

```bash
pnpm --filter @portfolio/web dev
pnpm --filter @portfolio/admin dev
pnpm --filter @portfolio/api dev
```

## Git Hygiene

Do not commit local secrets, generated files, runtime data, or machine-specific artifacts.

Ignored examples include:

- `.env` files
- `node_modules`
- `.next`, `dist`, `build`, and TypeScript cache files
- Docker/local logs
- MongoDB exports
- media uploads and generated thumbnails
- backup folders and archives
- local handoff or generated cleanup artifacts

Docker files that are intended to be committed:

- `compose.yaml`
- `Dockerfile.dev`
- `.dockerignore`

These files should only contain local development configuration and must not contain passwords, production credentials, tokens, or private connection strings.
