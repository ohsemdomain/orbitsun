// src/index.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary'
import { SearchProvider } from './components/search/SearchProvider';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<HashRouter>
		<ErrorBoundary>
			<SearchProvider>
				<App />
			</SearchProvider>
			</ErrorBoundary>
		</HashRouter>
	</StrictMode>,
);
