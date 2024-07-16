import {createRoot} from 'react-dom/client';
import config from './config/app';
import App from './components/app/App';
import './assets/styles/global.css';

const initApp = () => {
    const rootElement = document.querySelector(`[data-lego-app-root = '${config.embed.id}']`);

    if (!rootElement) {
        throw new Error('Root element not found');
    }

    const root = createRoot(rootElement);

    root.render(<App />);
};

initApp();
