# Astro + React template

Static **Astro** project with **React** islands, TypeScript and shared linting
and formatting configs from Digital Vision CZ.

### Tooling

- Package manager: **pnpm**
- Repository tasks: **moonrepo**, defined in `moon.yml` (no package scripts)
- Toolchain versions: `.prototools` (Node.js 22.23.3, pnpm 11.23.0, Moon 2.5.6)
- TypeScript base: `@dvdevcz/typescript-config`
- Linters and formatters: `@dvdevcz/linters`
  - Oxlint: correctness, type-aware TypeScript and React checks
  - ESLint: formatting and import sorting, with Astro support
  - Stylelint: CSS formatting and property ordering
- Styling: vanilla CSS + CSS Modules
- Output: static (prerendered)

### Usage

```sh
pnpm install
pnpm exec moon run web:dev           # start dev server
pnpm exec moon run web:build         # static build to ./dist
pnpm exec moon run web:preview       # preview the build
pnpm exec moon run web:check         # Astro + TypeScript check
pnpm exec moon run web:lint          # Oxlint + ESLint + Stylelint
pnpm exec moon run web:lint-fix      # fix lint issues and format
pnpm exec moon run web:format        # format JS/TS/Astro and CSS
pnpm exec moon run web:format-check  # check formatting without writing
```

With [proto](https://moonrepo.dev/proto), the pinned toolchain installs
automatically. Otherwise, install the Node.js and pnpm versions listed above;
Moon is installed as a local development dependency. Individual lint tasks are
`web:lint-oxlint`, `web:lint-eslint` and `web:lint-stylelint`.

In VS Code, ESLint formats JS/TS/Astro on save and Stylelint fixes CSS on save.

### Bootstrap from this template

```sh
npx giget@latest gh:digitalvisioncz/template#astro-react --install=pnpm
```
