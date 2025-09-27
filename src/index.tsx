import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';


import { Provider } from 'react-redux';
import store from 'services/actions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router } from 'react-router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </DndProvider>
  </React.StrictMode>
);
