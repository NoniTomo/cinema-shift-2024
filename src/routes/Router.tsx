import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Afisha, Tickets, Profile, Login, Main, Payment } from '@/pages/index';
import { RequireAuth } from './RequireAuth';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path='cinema/today' element={<Afisha />} />
      <Route path='cinema/film/:filmId' element={<Main />} />
      <Route path='cinema/users/signin' element={<Login />} />
      <Route path='cinema/payment' element={
        <RequireAuth redirectTo='/cinema/users/signin'>
          <Payment />
        </RequireAuth>} />
      <Route path='cinema/orders' element={
        <RequireAuth redirectTo='/cinema/users/signin'>
          <Tickets />
        </RequireAuth>} />
      <Route path='cinema/users/profile' element={
        <RequireAuth redirectTo='/cinema/users/signin'>
          <Profile />
        </RequireAuth>} />
      <Route path='*' element={<Navigate to='cinema/today' />} />
    </Routes>
  </BrowserRouter>
) 