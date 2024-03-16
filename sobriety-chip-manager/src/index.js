import React from 'react';
import { createRoot } from 'react-dom'; // Import createRoot from react-dom
import App from './App';

// Use createRoot to render the App component
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
