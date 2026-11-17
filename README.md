# Noorsultan.dev

Portfolio of **Noor Sultan**: WordPress developer, Shopify developer and website security specialist.
It's a futuristic developer workspace built with Next.js, Three.js (React Three Fiber) and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit content

- All text, skills, experience and projects: `lib/data.ts`
- Portrait used by the 3D hologram: `public/portrait.png`
- Client project screenshots: put them in `public/projects/` and set `image: "/projects/<file>.jpg"` (and `url`) on each project in `lib/data.ts`

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). No settings needed.
