import dvdevEslint from '@dvdevcz/linters/eslint';
import * as astroParser from 'astro-eslint-parser';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

const extendFiles = configs => configs.map(config => {
    if (config.files) {
        return {...config, files: [...config.files, '**/*.astro']};
    }

    return config;
});

export default [
    {
        ignores: [
            '.astro/**',
            '.moon/**',
            'dist/**',
            'node_modules/**',
        ],
    },
    ...astro.configs.recommended,
    ...extendFiles(dvdevEslint),
    {
        files: ['**/*.astro'],
        languageOptions: {
            parser: astroParser,
            parserOptions: {
                parser: tseslint.parser,
                extraFileExtensions: ['.astro'],
            },
        },
    },
];
