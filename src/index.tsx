import {createRoot} from 'react-dom/client';
import config from './configs/app';
import App from './components/app/App';
import getAppData from './helpers/getAppData';
import './assets/styles/global.css';

const initApp = () => {
    const rootElement = document.querySelector(`[data-lego-app-root = '${config.embed.id}']`);
    const currentScriptElement = document.querySelector(`script[data-lego-app-id="${config.embed.id}"]`);

    if (!rootElement || !currentScriptElement) {
        throw new Error('Root element or script element not found');
    }

    const root = createRoot(rootElement);
    const appData = getAppData(currentScriptElement);

    console.log({appData});
    // save data to the store

    root.render(<App />);
};

initApp();
