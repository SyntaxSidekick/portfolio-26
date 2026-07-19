# JavaScript Behavior Inventory

## Current local script

- `js/scripts.js`

## Shared behavior

- Header lookup through `#site-header`.
- Primary navigation lookup through `#site-header-nav`.
- Mobile menu toggle through `#mobile-menu-toggle`.
- Theme toggle through `#theme-toggle`.
- Active navigation state based on current path.
- Header scrolled state based on `window.scrollY`.
- Menu closes on outside click, Escape, navigation link click, and desktop resize.
- Theme preference stored in local storage.

## Page behavior

### Home

- Role button rotation through `.role-item`.
- Reduced-motion check before auto-rotation.

### Bio

- Lucide icon initialization when the external Lucide script is present.

### Portfolio index

- Category filter buttons.
- Project card filtering based on `data-category`.
- Source navigation behavior for portfolio sections.
- Status messaging for visible projects.

### Portfolio single

- Smooth scrolling for internal links.
- Reveal behavior for metrics, panels, and CTA panels.
- Reduced-motion and IntersectionObserver guards.

### Blog index

- Blog post data rendering.
- Featured post rendering.
- Article grid rendering.
- Filtering, search, sort, pagination, reset filters.
- Newsletter form validation message.

### Blog single

- Article reading progress.
- Fixed progress bar.
- Table of contents active state.
- Mobile table of contents open/close state.
- Copy article link.
- Social share buttons.
- Copy code buttons.
- Helpful feedback buttons.
- Newsletter signup validation.

### Contact

- Field validation for name, email, subject, and message.
- Inline error messages through `data-error-for`.
- Submit status messaging.
- Demo async submit state.

### Footer

- Footer year update.
- Back-to-top behavior respecting reduced motion.

## Migration guidance

- Shell behavior should be migrated first: header, mobile navigation, theme, active navigation, footer year, and back-to-top.
- Page-specific behavior should remain static until the corresponding route is migrated.
- React client components should be used only where behavior requires browser APIs.
- Server components should remain the default in `apps/web`.
