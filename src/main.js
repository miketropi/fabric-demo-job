/**
 * 
 */
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AppContext_Provider } from './context/AppContext';
import App from './components/App';

((w) => {
  const root = createRoot(document.getElementById('ROOT'));
  root.render(<AppContext_Provider>
    <App />
  </AppContext_Provider>);
})(window) 