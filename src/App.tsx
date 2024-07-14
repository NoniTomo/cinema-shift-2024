import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Afisha, Tickets, Profile, Login, Main, Payment } from './pages/index';

function App() {
  return (
    <div className='wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='cinema/today' element={<Afisha />} />
          <Route path='cinema/film/:filmId' element={<Main />} />
          <Route path='cinema/users/signin' element={<Login />} />
          <Route path='cinema/payment' element={<Payment />} />
          <Route path='cinema/orders' element={<Tickets />} />
          <Route path='cinema/users/profile' element={<Profile />} />
          <Route path='*' element={<Navigate to='cinema/today' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
