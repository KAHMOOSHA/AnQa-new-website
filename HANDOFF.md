# AnQa Website — Project Map and Handoff

Last updated: August 16, 2026

## 1. Canonical project location

Use this copy of the project from now on:

```text
C:\Users\Nitro5\Desktop\projects\AnQa-main-website
```

Open this folder—not the older copy in `Documents`—when working in VS Code or Codex.

Git repository:

```text
https://github.com/KAHMOOSHA/AnQa-new-website.git
```

Current branch: `main`

## 2. What this project is

This is the multilingual website for the AnQa theatre group and the distributed theatrical reading project *Palestinians Are Your Eyes*.

Current public routes:

| Route | Page |
| --- | --- |
| `/{lang}` | Home |
| `/{lang}/about` | About the company and team |
| `/{lang}/join` | How to join and project guidelines |
| `/{lang}/partnerships` | Participating venues credits |

Supported language codes:

- `en` — English
- `ar` — Arabic, right-to-left
- `it` — Italian
- `fr` — French
- `tr` — Turkish

Examples:

```text
http://localhost:3000/en
http://localhost:3000/ar/about
http://localhost:3000/it/join
http://localhost:3000/tr/partnerships
```

## 3. Technology

- Next.js 16 App Router
- React 19
- TypeScript
- CSS Modules
- Motion for reveal animations
- Embla Carousel for the homepage carousel
- Lucide React for interface icons
- `next/image` for responsive images

There is no database, API server, Drizzle setup, or test suite in this project.

Required Node.js version:

```text
22.13.0 or newer
```

## 4. Start the website

### First time on a computer

1. Install Node.js 22 or newer.
2. Open VS Code.
3. Choose **File → Open Folder**.
4. Select:

   ```text
   C:\Users\Nitro5\Desktop\projects\AnQa-main-website
   ```

5. Open **Terminal → New Terminal**.
6. Install dependencies:

   ```powershell
   npm install
   ```

7. Start development mode:

   ```powershell
   npm run dev
   ```

8. Open:

   ```text
   http://localhost:3000/en
   ```

Stop the server with `Ctrl+C` in the terminal.

### Test on a phone connected to the same Wi-Fi

Run:

```powershell
npm run dev -- --hostname 0.0.0.0
```

Find the computer's IPv4 address:

```powershell
ipconfig
```

On the phone, visit a URL such as:

```text
http://192.168.1.20:3000/en
```

Replace `192.168.1.20` with the computer's actual IPv4 address. Windows Firewall may ask for permission; allow access only on private networks.

## 5. Folder map

```text
AnQa-main-website/
├─ app/
│  ├─ [lang]/[[...slug]]/
│  │  ├─ page.tsx              Routes, navigation, metadata, page composition
│  │  └─ page.module.css       Header and route-level styles
│  ├─ components/              Website sections and interactive components
│  ├─ data/
│  │  └─ participatingVenues.ts
│  ├─ lib/
│  │  └─ motion.ts             Shared animation settings
│  ├─ globals.css              Fonts, colors, global spacing and base styles
│  ├─ layout.tsx               Root HTML, global metadata and providers
│  └─ page.tsx                 Redirects `/` to `/en`
├─ public/
│  ├─ fonts/                   Arabic font files
│  ├─ icons/                   Static icons
│  └─ images/                  Website photography and AnQa logo
├─ package.json                Commands and dependencies
└─ HANDOFF.md                  This document
```

Do not manually edit these generated/dependency folders:

```text
.next/
node_modules/
```

## 6. Page composition

The order of sections is controlled in:

```text
app/[lang]/[[...slug]]/page.tsx
```

### Home

1. `HeroCarousel`
2. `ProjectIntroductionSection`
3. `WhyOctober15Section`
4. `ParticipationCta`
5. `SiteFooter`

### About

1. `AboutUsSection`
2. `TeamCreditsSection`
3. `SiteFooter`

### Join

1. `HowToJoinSection`
2. `WhoThisProjectIsFor`
3. `AboutProjectSection`
4. `SiteFooter`

### Partnerships

1. `ParticipatingVenuesCredits`

The Partnerships page intentionally has no footer.

## 7. Where to make common changes

### Change text

Most section translations currently live near the top of the corresponding `.tsx` component:

```text
app/components/AboutUsSection.tsx
app/components/HowToJoinSection.tsx
app/components/AboutProjectSection.tsx
app/components/HeroCarousel.tsx
```

Navigation labels and page descriptions live in:

```text
app/[lang]/[[...slug]]/page.tsx
```

When changing copy, update all five languages and keep the object keys identical.

Recommended future cleanup: move translations into:

```text
app/i18n/
├─ types.ts
├─ getTranslations.ts
└─ locales/
   ├─ en.ts
   ├─ ar.ts
   ├─ it.ts
   ├─ fr.ts
   └─ tr.ts
```

Then pass only the selected section copy into each component.

### Change a section's design

Each component generally has its own CSS Module:

```text
AboutUsSection.tsx
AboutUsSection.module.css
```

Use the component's CSS Module for section-specific design. Use `app/globals.css` only for truly global values and behavior.

### Add or replace an image

1. Place the image in:

   ```text
   public/images/
   ```

2. Reference it from React with a root-relative path:

   ```tsx
   <Image src="/images/photo-name.jpg" alt="Meaningful description" />
   ```

3. Keep filename capitalization exact.
4. Compress large originals before adding them when possible.
5. Prefer descriptive filenames without spaces for new assets.

### Update participating venues

Edit:

```text
app/data/participatingVenues.ts
```

Keep every venue `id` unique. The Partnerships page groups international venues by country and Italian venues by region.

### Change animations

Shared reveal timing is in:

```text
app/lib/motion.ts
```

Components using Motion must remain Client Components and begin with:

```tsx
"use client";
```

Do not add React hooks such as `useEffect` directly to a Server Component without creating a Client Component boundary.

## 8. Design system

Global design tokens are in `app/globals.css`.

Current palette:

```text
Mint:  #67B293
Red:   #E33B3B
Cream: #FBECCB
Brown: #41100B
Black: #0D0F0E
White: #FFFFFF
```

Typography:

- Poppins — main interface and heading font
- Cormorant Garamond — complementary editorial font
- Thmanyah Sans — Arabic font

The site supports light and dark themes. Test every color change in both themes.

## 9. Important component behavior

- Header hides while scrolling down and reappears while scrolling up.
- Header becomes solid after leaving the top of the page.
- Mobile navigation becomes a hamburger menu below 900px.
- The language menu uses native `<details>` and `<summary>` plus outside-click dismissal.
- Arabic uses right-to-left layout and reversed directional arrows.
- Hero images are language-independent; only their text and alt text are translated.
- The hero carousel supports touch swiping through Embla.
- Venue credits pause or continue with Space on desktop or a tap/click.
- Footer logo crop uses explicit top-left coordinates so it remains visible in Arabic.
- Motion respects the user's reduced-motion accessibility setting.

## 10. Safe everyday workflow

Before editing:

```powershell
git status
git pull --ff-only
```

Create a branch for a larger change:

```powershell
git switch -c feature/short-description
```

While working:

```powershell
npm run dev
```

Before committing:

```powershell
git diff
npm run build
```

Commit and push:

```powershell
git add .
git commit -m "feat: describe the change"
git push -u origin feature/short-description
```

For a very small solo change on `main`, the existing workflow has been:

```powershell
git add .
git commit -m "fix: describe the change"
git push origin main
```

Never use `git reset --hard` when you have work you want to keep.

## 11. Testing checklist

Before considering a change finished, check:

- `npm run build` passes.
- No browser console errors appear.
- Desktop layout works around 1440px wide.
- Mobile layout works around 390px wide.
- English, Arabic, Italian, French and Turkish routes open.
- Arabic is right-to-left and the logo is visible.
- Light and dark themes remain readable.
- Navbar and language menu work with keyboard and pointer input.
- Carousel arrows, dots and touch swiping work.
- Email and internal links point to the correct destinations.
- Partnerships credits pause and resume correctly.
- No page has horizontal scrolling unless intentionally designed.

## 12. Current Git state at handoff

At the time this file was written:

```text
Branch: main
Remote: origin → https://github.com/KAHMOOSHA/AnQa-new-website.git
Latest commit: 0d93c1b added the turkish lang
Local branch vs origin/main: synchronized (0 ahead, 0 behind)
```

There are currently **uncommitted white-text color changes** in:

```text
app/globals.css
app/components/AboutProjectSection.module.css
app/components/HeroCarousel.module.css
app/components/HowToJoinSection.module.css
app/components/ParticipatingVenuesCredits.module.css
app/components/ParticipationCta.module.css
app/components/SiteFooter.module.css
```

Review and commit those changes before starting unrelated work.

Suggested commit:

```powershell
git add app/globals.css app/components/*.module.css
git commit -m "style: use white for dark-theme text"
git push origin main
```

The production build passed after these changes.

## 13. Remaining priorities

### High priority

1. Complete the SEO pass:
   - one meaningful `<h1>` per page;
   - correct root document language per locale;
   - canonical and `hreflang` metadata;
   - `sitemap.xml` and `robots.txt`;
   - Open Graph and social preview metadata;
   - Organization and October 15 Event structured data.
2. Refactor translations into dedicated locale files.
3. Review every translation with native speakers.
4. Compress the 3–6 MB production photographs.
5. Decide on the final production domain before creating canonical URLs.

### Content and design decisions still open

- Final carousel copy and final slide selection.
- Final complementary typeface choice.
- Final production domain and deployment provider.
- Final event and venue information as applications arrive.
- Whether official story titles should remain in English or use localized titles.

## 14. Deployment outline

The simplest deployment path is Vercel:

1. Push all intended changes to GitHub.
2. Sign in to Vercel with GitHub.
3. Import `KAHMOOSHA/AnQa-new-website`.
4. Let Vercel detect Next.js automatically.
5. Use the default commands:

   ```text
   Install: npm install
   Build: npm run build
   Output: managed automatically by Next.js
   ```

6. Deploy first to the generated preview domain.
7. Test all languages and mobile layouts.
8. Connect the final custom domain only after the preview is approved.

Every push to the connected production branch can trigger a new deployment. Use preview branches for risky changes.

## 15. Troubleshooting

### The site does not start

```powershell
npm install
npm run dev
```

Confirm Node.js:

```powershell
node --version
```

It must be version 22.13.0 or newer.

### A stale build behaves strangely

Stop the server, remove only the generated `.next` folder, then restart:

```powershell
Remove-Item -LiteralPath .next -Recurse -Force
npm run dev
```

Do not delete `app`, `public`, `.git`, or `package.json`.

### A React hydration warning appears

- Check that server and client render the same initial markup.
- Avoid `Date.now()`, `Math.random()` or browser-only conditions during rendering.
- Put browser APIs inside `useEffect` in a Client Component.
- Temporarily disable browser extensions to determine whether one is changing the HTML.

### An image does not appear

- Confirm it is inside `public/images`.
- Confirm the filename, spaces and capitalization match exactly.
- Use `/images/file-name.jpg`, not `public/images/file-name.jpg`.
- Check RTL crop positioning if it fails only in Arabic.

## 16. Rules for the next developer or AI assistant

1. Run `git status` before making changes.
2. Preserve existing uncommitted work unless explicitly asked to remove it.
3. Keep the site in Next.js and TypeScript.
4. Keep component-specific CSS in CSS Modules.
5. Keep `globals.css` for shared tokens and base styles.
6. Maintain all five languages when changing visible copy.
7. Preserve RTL behavior and the Thmanyah Arabic font.
8. Use Motion consistently instead of adding a second animation library.
9. Use Embla for the existing carousel rather than replacing it without a reason.
10. Run a production build and responsive checks before handoff.
11. Do not add a database or backend unless the feature actually requires one.
12. Do not commit generated `.next` output.

## 17. Quick recovery summary

If all other context is lost:

```powershell
cd "C:\Users\Nitro5\Desktop\projects\AnQa-main-website"
git status
npm install
npm run dev
```

Open `http://localhost:3000/en`, read this file, inspect `app/[lang]/[[...slug]]/page.tsx`, and continue from the current Git state.
