import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import { App } from './App.tsx';
import { SeanceProvider } from './utils/context/Seance';
import { CinemaPaymentProvider } from './utils/context/CinemaPayment';
import { UserProvider } from './utils/context/User';

import './styles/fonts.css';
import './styles/reset.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SeanceProvider>
      <UserProvider>
        <CinemaPaymentProvider>
          <App />
        </CinemaPaymentProvider>
      </UserProvider>
    </SeanceProvider>
    <ToastContainer />
  </React.StrictMode>
);
