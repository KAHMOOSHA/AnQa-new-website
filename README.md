# AnQa Theatre Website

A multilingual website for AnQa, an Italian-Palestinian theatre company, and its theatrical reading project **Palestinians Are Your Eyes**. The project brings together six texts by Gazan authors and invites groups to organize performances on October 15, 2026.

The site introduces the company and team, explains how to participate, and showcases participating venues.

## Features

- Five languages: English, Arabic, Italian, French, and Turkish.
- Right-to-left layout for Arabic.
- Responsive navigation and a swipeable homepage carousel.
- Light and dark themes.
- Animated sections and participating venue credits.
- Email links for participation inquiries.

## Technology

- Next.js 16 with the App Router
- React 19 and TypeScript
- CSS Modules and global design tokens
- Motion for animations
- Embla Carousel for the homepage slideshow
- Lucide React for icons

## Getting started

Install **Node.js 22.13.0 or newer** and npm, then run these commands from the project directory:

```bash
npm install
npm run dev
```

Open [localhost:3000/en](http://localhost:3000/en). The root URL redirects to the English homepage. Stop the development server with `Ctrl+C`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |

To run in production mode locally:

```bash
npm run build
npm start
```

## Pages and languages

Replace `{lang}` with `en`, `ar`, `it`, `fr`, or `tr`.

| Route | Content |
| --- | --- |
| `/{lang}` | Homepage and project introduction |
| `/{lang}/about` | Company story and team |
| `/{lang}/join` | Participation instructions and project guidelines |
| `/{lang}/partnerships` | Participating venues |

## Project structure

```text
app/
  [lang]/[[...slug]]/   Localized routes, metadata, and page composition
  components/          Page sections and interactive components
  data/                Participating venue data
  lib/                 Shared animation settings
  globals.css          Fonts, themes, and global styles
  layout.tsx           Root layout and providers
  page.tsx             Redirect to the English homepage
public/                Static assets referenced by the site
HANDOFF.md             Detailed project notes and development history
```

