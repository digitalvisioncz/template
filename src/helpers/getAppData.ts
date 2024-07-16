import {AppData, AppDataKeys} from '../types/app';

const validKeys = Object.values(AppDataKeys);

const getAppData = (currentScriptElement: Element): AppData => {
    const config: AppData = {};

    validKeys.forEach(key => {
        const dataKey = `data-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;

        if (currentScriptElement.hasAttribute(dataKey)) {
            const data = currentScriptElement.getAttribute(dataKey);

            if (data) {
                config[key] = data;
            }
        }
    });

    const urlParams = new URLSearchParams(window.location.search);

    validKeys.forEach(key => {
        if (urlParams.has(key)) {
            const data = urlParams.get(key);

            if (data) {
                config[key] = data;
            }
        }
    });

    return config;
};

export default getAppData;
