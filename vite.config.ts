import {defineConfig, loadEnv} from 'vite';
import reactPlugin from '@vitejs/plugin-react';

type Env = Record<string, string>;

const removeScriptsFromHead = (env: Env) => {
    return {
        name: 'html-transform',
        transformIndexHtml(html: string) {
            return html
                .replace(
                    /<script.*src="\/assets\/js\/.*".*<\/script>/g,
                    '',
                )
                .replace(
                    /<link.*rel="modulepreload".*>/g,
                    '',
                )
                .replace(
                    /\n\s*\n/g,
                    '',
                )
                .replace(
                    /<\/head>/g,
                    '\n\t</head>',
                )
                .replace(
                    /<\/body>/g,
                    env.PROD ? `\t<script type="module" data-lego-app-id="${env.VITE_APP_ID}" src="/embed.js"></script>\n\t</body>` : '\n\t</body>',
                );
        },
    };
};

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [reactPlugin(), removeScriptsFromHead(env)],
        build: {
            cssMinify: 'lightningcss',
            rollupOptions: {
                external: '/embed.js',
                input: {
                    main: 'index.html',
                    app: 'src/index.tsx',
                    embed: 'src/embed.ts',
                },
                output: {
                    manualChunks: {
                        react: ['react'],
                        'react-dom': ['react-dom'],
                    },
                    entryFileNames: ({name}) => {
                        if (['app', 'embed'].includes(name)) {
                            return `${name}.js`;
                        }

                        return 'assets/js/[name].[hash].js';
                    },
                    assetFileNames: 'global.css',
                    chunkFileNames: 'assets/js/[name].[hash].js',
                },
            },
        },
        server: {
            host: '0.0.0.0',
            port: 8000,
        },
        publicDir: 'public',
        css: {
            transformer: 'lightningcss',
            lightningcss: {
                drafts: {
                    customMedia: true,
                },
            },
        },
    };
});
