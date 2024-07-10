import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/fonts.css';
import './styles/reset.css';
import HallProvider from './context/SeanceContext.tsx';
import CinemaPaymentProvider from './context/CinemaPaymentContext.tsx';
import UserProvider from './context/UserContext.tsx';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HallProvider>
      <UserProvider>
        <CinemaPaymentProvider>
          <App />
        </CinemaPaymentProvider>
      </UserProvider>
    </HallProvider>
    <ToastContainer />
  </React.StrictMode>
);
