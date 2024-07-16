import {parse} from 'valibot';
import {
    AppData,
    AppDataKeys,
    appDataSchema,
    AppRawData,
} from '../types/app';

const validKeys = Object.values(AppDataKeys);

const getAppData = (currentScriptElement: Element): AppData => {
    const rawData: AppRawData = {};

    validKeys.forEach(key => {
        const dataKey = `data-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;

        if (!currentScriptElement.hasAttribute(dataKey)) {
            return;
        }

        const data = currentScriptElement.getAttribute(dataKey);

        if (!data) {
            return;
        }

        rawData[key] = data;
    });

    const urlParams = new URLSearchParams(window.location.search);

    validKeys.forEach(key => {
        if (!urlParams.has(key)) {
            return;
        }

        const data = urlParams.get(key);

        if (data) {
            rawData[key] = data;
        }
    });

    const validatedData = parse(appDataSchema, rawData);

    return validatedData;
};

export default getAppData;
