# Website launch checklist — Raj Defence & Aerospace Pvt. Ltd.

Updated 28 November 2026.

## Implemented and checked locally

- **Production build & Vercel config**: `npm run build` (`node build.mjs`) compiles `dist/viewer.js` (`924.74 kB`, gzip `198.84 kB`) and copies all static assets into `dist/`. [vercel.json](vercel.json) sets `buildCommand: "npm run build"` and `outputDirectory: "dist"`.
- **SEO titles & meta descriptions**: Route-specific `document.title` and `<meta name="description">` are updated dynamically in `app.js` for Home, Systems, individual platforms (`RAJAS RJS-H1`, `RAJAS Heavy-Lift`, `Hydrogen Loitering Munition`, `Hydrogen ISR Drone`, `Maritime & Underwater`, `Interceptor Drone`), About Us (`#/company`), Quality & Compliance (`#/quality`), and Contact (`#/contact`).
- **Share thumbnail & favicon**: `assets/og-thumbnail.jpg` (`1200 × 630` JPEG) is generated and wired into `og:image` and `twitter:image` (`summary_large_image`) in `index.html`, alongside `<link rel="icon" type="image/png" href="assets/raj-logo.png">` and `theme-color` (`#202216`).
- **Image accessibility & performance**: `image()` in `app.js` sets `alt` attributes, explicit `width="1920" height="1080"`, `decoding="async"`, and `fetchpriority="high"` on the hero backdrop. Hero and section images (`hero.webp`, `company.webp`, `quality.webp`, `ground.webp`, `h1.webp`, `h2.webp`) are `1920 × 1080` WebP (`1.17 MB` total).
- **Navigation & footer**: Header (`Systems`, `Company`, `Quality`, `Contact`, `3D View`, social links) and 3-column footer (`Get More Information`, `Find Fast`, `Privacy Policy`, `Terms of Use`) link all active hash routes (`#/...`).
- **Three.js 3D showcases**: Interactive WebGL scenes (`mountCarousel`, `mountRajasShowcase`, `mountSideSpotlight`, `mountGasSchematic`, and `mountViewer`) pause rendering via `IntersectionObserver` when off-screen and dispose GPU resources on route change.
- **Contact form & privacy/terms**: `#/contact` includes Organisation, Name, Designation, Official email, Phone, Product of interest dropdown, Requirement, and the government/authorised-entity confirmation checkbox, preparing a `mailto:info@rajda.in` draft in the user's email client. No fabricated testimonials, ratings, or review schema are present.
- **Mobile responsiveness**: Responsive breakpoints at `900px`, `700px`, `600px`, and `560px` with `overflow-x: clip` and `content-visibility: auto` on below-the-fold sections.

## Required before production launch

1. **Contact form backend integration (e.g., Web3Forms / serverless API)**: Currently the contact form prepares a `mailto:info@rajda.in` draft in the visitor's email app rather than submitting server-side. When you add Web3Forms or a serverless endpoint, configure `WEB3FORMS_ACCESS_KEY` (or API credentials) in Vercel environment variables, add server-side validation, honeypot, rate limiting, and a `/thank-you` confirmation state, then run a real test enquiry to verify inbox delivery to `info@rajda.in`.
2. **Clean URLs, `/sitemap.xml`, `/robots.txt`, and custom 404**: Because the site currently uses hash routing (`#/systems`, `#/company`, `#/quality`, `#/contact`), search engines only index `/` unless clean path routing or static/rewritten routes are added. Before launch, add `robots.txt` and `sitemap.xml` in `dist/` (via `build.mjs`), configure Vercel `rewrites` and a custom `404.html` if moving from hash URLs to path URLs, and verify HTTP 200 / HTTP 404 responses.
3. **Absolute canonical & Open Graph URLs**: Update `og:image`, `twitter:image`, and add `<link rel="canonical">` tags with your final production domain (for example `https://www.rajda.in/assets/og-thumbnail.jpg`) once the custom domain is attached in Vercel. Preview the production URL in WhatsApp and LinkedIn Post Inspector to confirm the `1200 × 630` sharing card.
4. **Google Analytics 4 & Cookie Consent (optional)**: No analytics or tracking cookies are currently loaded. If you add GA4 later, gate script loading behind an equal-choice Accept / Decline consent banner, supply your real GA4 Measurement ID via environment config, and verify in Realtime that no Google requests fire before acceptance or after decline.
5. **Custom domain, HTTPS & Google Search Console**: Connect your production domain in Vercel, confirm HTTP → HTTPS and apex/www redirects return HTTP 200, verify the domain in Google Search Console (DNS TXT or HTML verification tag), and submit the production sitemap for indexing.
6. **Social links & legal review**: Update the placeholder `#/contact` links on the header Facebook, YouTube, and LinkedIn icons to your official company profile URLs, and have your legal/compliance team review the `Privacy Policy` and `Terms of Use` modal copy against your hosting, email retention, and MoD export-compliance obligations.
7. **Authorised specifications & customer approvals**: Confirm all published figures (`RAJAS RJS-H1` 5 kg / up to 5 hours, `RAJAS Heavy-Lift` design targets) and `Raj Process Equipments & Systems` heritage copy with engineering and leadership before public announcement. Do not publish customer names, quotes, or certifications without written approval.

## Operational limitations

- **Static client-side SPA**: There is currently no server runtime, database, or server-side rate limiting. Form submission relies on `mailto:` until an API/Web3Forms integration is added.
- **Hash-based routing (`#/`)**: Current routes share a single `index.html` document, so dynamic `document.title` and `<meta name="description">` updates happen client-side after JavaScript executes rather than per-URL server HTML responses.
- **Local verification scope**: Local checks verified `npm run build`, asset packaging in `dist/`, and GitHub push to `origin/main` (`e744c03`). Live Vercel deployment, custom domain DNS/TLS, social crawler cache checks, inbox delivery, and analytics reporting require the configured production accounts and are not marked complete by local checks.
