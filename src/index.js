import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { FinishView } from './pages/finish';
import Layout from './pages/layout';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);

