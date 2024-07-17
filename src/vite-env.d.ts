/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string,
    readonly VITE_APP_ID: string,
    readonly VITE_ANALYTICS_SOURCE_ID: string,
    readonly VITE_ANALYTICS_ENDPOINT: string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv,
}
