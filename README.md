# Functional static portfolio

Serve this folder through a local web server because navigation uses clean root-relative URLs.

## Run locally

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

The contact form currently validates and shows a successful demo state. Connect it to a real endpoint before production email delivery.

## Portfolio 2026 apps

Portfolio projects, categories, and technologies are stored in MongoDB through `apps/api`.

Local static web builds that include portfolio pages require:

1. Start MongoDB.
2. Start the API with `pnpm --filter @portfolio/api dev`.
3. Build the public web app with `pnpm --filter @portfolio/web build`.

The admin runs separately with `pnpm --filter @portfolio/admin dev` and is not part of the public Next.js build.
