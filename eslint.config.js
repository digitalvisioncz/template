import dvdevEslint from '@dvdevcz/eslint';
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
            'dist/**',
            'node_modules/**',
        ],
    },
    ...extendFiles(dvdevEslint.configs.base),
    ...extendFiles(dvdevEslint.configs.react),
    ...astro.configs.recommended,
    {
        files: ['**/*.astro'],
        languageOptions: {
            parser: astroParser,
            parserOptions: {
                parser: tseslint.parser,
                extraFileExtensions: ['.astro'],
                project: './tsconfig.json',
            },
        },
    },
];
