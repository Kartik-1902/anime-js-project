import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css';    // ← one single import, relative to src/
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
