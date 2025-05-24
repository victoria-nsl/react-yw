import { createRoot } from 'react-dom/client';
import { App } from '@components/app/app.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from './services/store';

const store = configureStore();

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App />
	</Provider>
);
