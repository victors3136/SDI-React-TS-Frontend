import React from 'react';
import ReactDOM from 'react-dom/client';
import './styling/public/css/index.css';
import App from './App';
import reportWebVitals from './probably should not touch this/reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
reportWebVitals();
