# CSS Cleanup Payload

This directory is a complete copy of the supplied `apps/web` package, not a standalone monorepo application and not a partial `src` replacement.

## Application method

Replace the existing `apps/web` package with this package only from the monorepo root, where `../../tsconfig.base.json` and workspace dependencies are available. Back up the live package first.

## Coordinated import changes

- `src/styles/globals.css` now contains only global foundations, tokens, the container primitive, and utilities.
- `src/app/layout.tsx` imports sitewide header, footer, and icon styles.
- `src/app/portfolio/page.tsx` imports portfolio card styles.
- All three files must be applied together.

## Preserved files

Files omitted from the earlier partial payload are retained here, including `src/app/globals.css`, `custom-properties.css`, `components.css`, `forms.css`, `grid.css`, `sections.css`, and `shell.css`.

## Selector policy

Existing BEM-style selectors were preserved because TSX markup depends on them. Renaming them is a separate markup-and-CSS migration and is not safe as part of duplicate cleanup.

## Additional repairs

Malformed six-digit color literals beginning with `.` were corrected to valid `#` hex colors across page and route styles.

## Remaining architectural work

`portfolio.css` remains oversized and includes portfolio-index and project-single systems. Splitting it safely requires route-by-route visual regression testing. Order-dependent `nth-child` technology coloring should later be replaced with semantic classes or data attributes.
