import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Afisha from './components/templates/Afisha/Afisha';
import Tickets from './components/templates/Tickets/Tickets';
import Profile from './components/templates/Profile/Profile';
import Login from './components/templates/Login/Login';
import MainPage from './components/templates/MainPage/MainPage';
import PaymentPage from './components/templates/PaymentPage/PaymentPage';

function App() {
  return (
    <div className='wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='cinema/today' element={<Afisha />} />
          <Route path='cinema/film/:filmId' element={<MainPage />} />
          <Route path='cinema/users/signin' element={<Login />} />
          <Route path='cinema/payment' element={<PaymentPage />} />
          <Route path='cinema/orders' element={<Tickets />} />
          <Route path='cinema/users/profile' element={<Profile />} />
          <Route path='*' element={<Navigate to='cinema/today' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
