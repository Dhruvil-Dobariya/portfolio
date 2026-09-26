# Dhruvil Dobariya — portfolio

A React, TypeScript, and Vite portfolio built around a dimensional engineering workspace. The site uses self-hosted fonts, native scrolling, CSS perspective, and event-driven animation. No remote assets, WebGL render loop, or animation framework is required.

## Development

```sh
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Structure

- `src/components/studio/Studio.tsx`: navigation, hero, experience, contact, page motion.
- `Workspace.tsx`: interactive three-layer hero illustration.
- `ProjectStudies.tsx`: four production project studies and accessible native dialogs.
- `Engineering.tsx`: sticky engineering diagram and keyboard-accessible stack explorer.
- `src/data`: canonical profile, employment, projects, and skills.
- `src/styles/studio.css`: shared tokens, layout, hero, responsive rules, reduced motion.
- `public`: favicon, social preview, robots, sitemap.

## Content and design

The narrative runs introduction → selected systems → engineering approach → experience → capabilities → contact. Graphite surfaces, copper emphasis, and a lighter technical drawing section create contrast. CSS depth describes software layers; scroll updates the engineering diagram without hijacking navigation. All content remains usable with reduced motion or the footer motion control.

Company, role, dates, counts, and project facts come from the original repository. Client work is presented with explicitly illustrative interfaces. There is no verified GitHub profile or résumé asset in the source, so the contact section provides the existing LinkedIn and email plus an honest résumé request link.

Production output is `dist/`. Canonical and social metadata target `https://dhruvildobariya.dev/`. Deploy the output to the domain's static host; no server-side runtime is required.
