import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app.jsx';


import { Provider } from 'react-redux';
import store from 'services/actions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <App />
      </Provider>
    </DndProvider>
  </React.StrictMode>
);
