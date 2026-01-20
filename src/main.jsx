/**
 * Main Entry Point
 * Initialize app with preloading
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { preloadCriticalImages } from './utils/images';

// Preload critical images immediately
preloadCriticalImages();

// Initialize app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
