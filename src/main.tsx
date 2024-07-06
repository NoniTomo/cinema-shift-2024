import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/fonts.css';
import './styles/reset.css';
import HallProvider from './context/HallContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HallProvider>
      <App />
    </HallProvider>
  </React.StrictMode>,
)
