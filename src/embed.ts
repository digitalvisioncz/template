import config from './configs/app';

const initApp = () => {
    const appParentElement = document.querySelector(`[data-dv-app-id="${config.embed.id}"]`);

    if (!appParentElement) {
        throw new Error('App parent element not found');
    }

    const divElement = document.createElement('div');

    divElement.dataset.dvAppRoot = config.embed.id;
    document.body.insertBefore(divElement, appParentElement.nextSibling);

    const scriptElement = document.createElement('script');

    scriptElement.src = config.embed.appScriptSrc;
    scriptElement.type = config.embed.appScriptType;
    document.head.appendChild(scriptElement);

    const styleElement = document.createElement('link');

    styleElement.href = config.embed.appStyleSrc;
    styleElement.rel = 'stylesheet';
    document.head.appendChild(styleElement);
};

initApp();
