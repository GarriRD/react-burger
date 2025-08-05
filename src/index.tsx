import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app.jsx';
import AppHeader from './components/app-header/app-header.jsx';
import AppMain from './components/app-main/app-main';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App>
      <AppHeader />
      <AppMain />
    </App>
  </React.StrictMode>
);
