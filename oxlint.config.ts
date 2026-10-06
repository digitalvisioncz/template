import dvdevOxlint from '@dvdevcz/linters/oxlint/react';
import {defineConfig} from 'oxlint';

export default defineConfig({
    ...dvdevOxlint,
    ignorePatterns: [
        ...dvdevOxlint.ignorePatterns ?? [],
        '.astro/**',
        '.moon/**',
        'dist/**',
    ],
});
