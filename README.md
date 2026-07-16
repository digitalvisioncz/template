# Astro + React template

Static **Astro** project with **React** islands, TypeScript, ESLint and Stylelint
configs from Digital Vision CZ.

### Tooling

- Package manager: **pnpm**
- TypeScript base: `@dvdevcz/typescript-config`
- ESLint: `@dvdevcz/eslint` (flat config)
- Stylelint: `@dvdevcz/stylelint` (flat config)
- Styling: vanilla CSS + CSS Modules
- Output: static (prerendered)

### Usage

```sh
pnpm install
pnpm dev        # start dev server
pnpm build      # static build to ./dist
pnpm check      # astro + typescript check
pnpm lint       # eslint
pnpm lint:css   # stylelint
```

### Bootstrap from this template

```sh
npx giget@latest gh:digitalvisioncz/template#astro-react --install=pnpm
```
