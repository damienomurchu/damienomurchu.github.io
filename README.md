# Forged

Source for [Forged](https://forged.damienmurphy.net/), Damien Murphy's personal blog.

Forged is a static Astro site hosted with GitHub Pages. The blog focuses on DevSecOps, platform engineering, CI/CD, containers, security, automation, local tooling, and field notes from software systems under pressure.

## Tech Stack

- [Astro](https://astro.build/)
- [AstroPaper](https://github.com/satnaing/astro-paper) theme foundation
- TypeScript
- Tailwind CSS
- Pagefind static search
- GitHub Pages hosting

## Project Structure

```text
src/content/posts/   Blog posts
src/content/pages/   Static content pages
src/components/      Astro UI components
src/layouts/         Page and post layouts
public/              Static assets
```

Site settings live in `astro-paper.config.ts`.

## Local Development

Install dependencies:

```sh
pnpm install
```

Start the local dev server:

```sh
pnpm dev
```

Build the site:

```sh
pnpm build
```

Preview the production build:

```sh
pnpm preview
```

## Content

New posts belong in `src/content/posts/`. Use `src/content/posts/_template.md` as the starting point for frontmatter.
