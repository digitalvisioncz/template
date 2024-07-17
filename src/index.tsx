import {createRoot} from 'react-dom/client';
import config from './configs/app';
import App from './components/app/App';
import getAppData from './helpers/getAppData';
import './assets/styles/global.css';

const initApp = () => {
    const rootElement = document.querySelector(`[data-dv-app-root='${config.embed.id}']`);
    const appParentElement = document.querySelector(`[data-dv-app-id="${config.embed.id}"]`);

    if (!rootElement || !appParentElement) {
        throw new Error('Root element or script element not found');
    }

    const root = createRoot(rootElement);
    const appData = getAppData(appParentElement);

    console.log({appData});
    // save data to the store

    root.render(<App />);
};

initApp();
