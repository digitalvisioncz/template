import config from './config/app';

const initApp = () => {
    const currentScriptElement = document.querySelector(`script[data-lego-app-id="${config.embed.id}"]`);

    if (!currentScriptElement) {
        throw new Error('Current script element not found');
    }

    const divElement = document.createElement('div');

    divElement.dataset.legoAppRoot = config.embed.id;
    document.body.insertBefore(divElement, currentScriptElement.nextSibling);

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
