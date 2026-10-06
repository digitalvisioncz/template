import base, {ignoreFiles} from '@dvdevcz/linters/stylelint/base';

export default {
    ...base,
    ignoreFiles: [
        ...ignoreFiles,
        '**/.astro/**',
        '**/.moon/**',
        '**/dist/**',
    ],
};
