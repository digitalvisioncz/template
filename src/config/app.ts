const isProduction = import.meta.env.PROD ? true : false;
const baseUrl = import.meta.env.VITE_BASE_URL;

const config = {
    baseUrl,
    embed: {
        id: import.meta.env.VITE_APP_ID,
        appScriptType: 'module',
        appScriptSrc: isProduction ? `${baseUrl}app.js` : './src/index.tsx',
        appStyleSrc: isProduction ? `${baseUrl}global.css` : './src/assets/styles/global.css',
    },
};

export default config;
