# Static Page Inventory

## Public pages

| Static file | Current purpose | React route |
| --- | --- | --- |
| `index.html` | Homepage | `/` |
| `bio.html` | Biography/about page | `/bio` |
| `portfolio.html` | Portfolio index | `/portfolio` |
| `portfolio-single.html` | Portfolio case-study/detail source | `/portfolio/[slug]` |
| `blog.html` | Blog index source | `/blog` |
| `blog-single.html` | Blog article/detail source | `/blog/[slug]` |
| `contact.html` | Contact page and form | `/contact` |
| `privacy.html` | Privacy policy | `/privacy` |
| `terms.html` | Terms of use | `/terms` |
| `404.html` | Not-found page | `/not-found` |

## Static admin prototype

| Static file | Notes |
| --- | --- |
| `admin/admin-dashboard.html` | Existing static admin prototype. Preserve as reference only. |
| `admin/admin-dashboard.css` | Existing static admin prototype styles. |
| `admin/admin-dashboard.js` | Existing static admin prototype behavior. |

## Shared static assets

| Path | Notes |
| --- | --- |
| `assets/images/riad-kilani-logo.svg` | Header and footer logo. |
| `assets/images/riad-kilani-main-profile-pic.png` | Homepage profile image. |
| `assets/images/riad-kilani-alt-profile-pic.png` | Bio/profile alternate image. |
| `assets/fonts/` | Reserved static font directory. |
| `assets/icons/` | Reserved static icon directory. |

## Current public page conventions

- Every public page links `css/styles.css`.
- Every public page loads `js/scripts.js` with `defer`.
- Public pages use `body[data-page="..."]` to scope CSS and behavior.
- Header and footer markup are repeated in the static HTML pages.
- Logo image references now use `/assets/images/riad-kilani-logo.svg`.
