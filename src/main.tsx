import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@components/app/app.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { HashRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Router>
			<Provider store={store}>
				<App />
			</Provider>
		</Router>
	</React.StrictMode>
);
