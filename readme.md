# Apex Systems — Website V3

Static Apex Systems site. Shared components live in `includes/` so the
navbar is edited in one place and every page picks it up.

## Structure
* `includes/` — shared components:
  * `nav.html` — the Apex navbar (top links, logo, search, green nav, ApexToday)
  * `include.js` — loader: pages call `<div data-include="../includes/nav.html" data-base="../"></div>`
* `pages/` — the actual pages:
  * `index.html` — home (navbar + full-screen hero slideshow)
  * `navbar.html` — navbar standalone demo
* `css/` — `navbar.css` (navbar styles), `hero.css` (slideshow styles)
* `js/` — `slideshow.js` (auto-fade slideshow, arrows + dots)
* `Slideshow/` — slide images

## Notes
* The include loader fetches `includes/*.html` at runtime, so the site needs
  an HTTP server (GitHub Pages works; locally run `python3 -m http.server`
  from the repo root — `file://` won't load the includes).
* The `{base}` token inside an include is replaced with the page's `data-base`
  value (path from the page back to the repo root).
