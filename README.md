# Gamu Baby - Landing Page

Static Astro landing page for **Gamu Baby**, a private, offline-first Android baby milestone and diary tracker.

- Live site: https://gamubaby.gamublocks.com/
- Google Play: https://play.google.com/store/apps/details?id=com.gamublocks.gamubaby

## Stack

- Astro static output
- Custom HTML/CSS components
- Google Fonts: Newsreader, DM Sans, JetBrains Mono
- GitHub Pages with custom domain
- No backend, forms, checkout, account, analytics, or user-data collection

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

`npm run build` generates optimized WebP copies of PNG screenshots, builds static HTML into `dist/`, and copies `public/CNAME` to the published output.

## Project Structure

```text
astro.config.mjs          Astro static config for gamubaby.gamublocks.com
public/CNAME              GitHub Pages custom domain
public/assets/            App icon and screenshots
src/components/           Static landing page components
src/data/                 Locale copy, SEO data, route data
src/layouts/              Shared metadata/layout shell
src/pages/                Homepage, localized pages, SEO pages, robots, sitemap
src/styles/global.css     Visual system ported from the previous static page
```

## GitHub Pages

Deployment uses `.github/workflows/deploy.yml` with the official Astro GitHub Pages action. In repository settings, Pages should use **GitHub Actions** as the source. The site remains a static marketing/info page and sends install traffic to Google Play.

## License

Copyright 2026 Gamu Baby. All rights reserved.
