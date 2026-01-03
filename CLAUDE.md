# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React 19 + TypeScript wedding event website (wedding.przadki.site) for Ola and Piotr's wedding on July 4, 2026. Hosted on a Hetzner server with automated deployment.

## Commands

```bash
# Development
npm run dev          # Start dev server at localhost:5173

# Build & Quality
npm run build        # TypeScript check + Vite production build
npm run lint         # ESLint with zero warnings tolerance
npm run preview      # Preview production build locally

# Deployment (requires SSH access to server)
./deploy.sh          # Build and deploy to production
```

## Architecture

### Tech Stack
- **React 19** with React Router 6 for client-side routing
- **TypeScript 5.7** in strict mode
- **Vite 5** for dev server and bundling
- **Pure CSS** with CSS custom properties (no preprocessors)

### Project Structure
```
src/
├── main.tsx          # Entry point, renders App
├── App.tsx           # Router setup with two routes
├── index.css         # CSS variables (--color-pink, --color-blue, etc.)
└── pages/
    ├── MainPage.tsx  # Wedding announcement (/)
    └── ConfirmPage.tsx # RSVP form (/potwierdz)
```

### Styling Conventions
- CSS variables defined in `index.css` for color palette
- Component-specific CSS files alongside TSX files
- Mobile-first responsive design (breakpoint: 768px)
- Dark mode support via `prefers-color-scheme: dark`

### Deployment
- Server: Hetzner (46.62.230.247) with Docker + kamal-proxy
- Static files served by nginx:alpine container
- kamal-proxy handles TLS termination (automatic Let's Encrypt)
- Deploy via `deploy.sh` which builds, rsyncs, and restarts the container

## Important Notes

- Do not commit or push to git without explicit permission
- The `dist/` directory is the build output uploaded to production
