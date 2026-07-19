# Style Inventory

## Current local stylesheet

- `css/styles.css`

## Organization observed in `css/styles.css`

- Shared token/global values at the top.
- Shared header, primary navigation, mobile navigation, theme toggle, and footer styles.
- Page-scoped CSS using `body[data-page="..."]` selectors.
- Home page styles.
- Bio page styles.
- Portfolio index styles.
- Portfolio single/case-study styles.
- Blog index styles.
- Blog single/article styles.
- Contact page and form styles.
- Privacy, terms, and 404 styles.

## Shared style surfaces

- Header and navigation: `.site-header`, `.site-header-container`, `.site-header-logo`, `.site-header-nav`, `.site-header-actions`.
- Mobile navigation: `.mobile-menu-toggle`, `.site-header-nav.is-open`.
- Theme switcher: `.theme-toggle`, `.theme-toggle-track`, `.theme-toggle-thumb`, theme icons.
- Footer: `.site-footer`, `.footer-container`, `.footer-main`, `.footer-column`, `.footer-contact`, `.footer-bottom`, `.back-to-top`.
- Accessibility: `.skip-link`, focus-visible rules, screen-reader helper classes.
- Buttons and links: page-specific button classes plus shared header/footer calls to action.
- Cards: project cards, article cards, capability cards, metric cards, sidebar cards.
- Forms: contact form fields, newsletter form fields, validation state classes.

## Migration guidance

- Use the approved static CSS as the parity source.
- Do not redesign or normalize visual differences during the shell phase.
- Extract only shell styles first: document base, skip link, header, navigation, theme toggle, footer, focus, and shared container behavior.
- Leave page-specific CSS in the static source until each page is migrated.
- Do not introduce Tailwind, Sass, CSS-in-JS, BEM, or styled-components.
