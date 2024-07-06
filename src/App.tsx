import Afisha from './components/templates/Afisha/Afisha'
import MovieInfo from './components/templates/MovieInfo/MovieInfo'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Tickets from './components/templates/Tickets/Tickets'
import UserProfile from './components/templates/UserProfile/UserProfile'
import MovieSchedule from './components/templates/MovieSchedule/MovieSchedule'
import ChoiceOfSeats from './components/templates/ChoiceOfSeats/ChoiceOfSeats'
import Login from './components/templates/Login/Login'

function App() {

  return (
    <div className='wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='cinema/today' element={<Afisha />}/>
          <Route path='cinema/film/:filmId' element={<MovieInfo />}/>
          <Route path='cinema/film/:filmId/schedule' element={<MovieSchedule />}/>
          <Route path='cinema/orders' element={<Tickets />}/>
          <Route path='cinema/users/profile' element={<UserProfile />}/>
          <Route path='cinema/film/:filmId/schedule/choose-seat' element={<ChoiceOfSeats />}/>
          <Route path='cinema/users/signin' element={<Login />}/>
          <Route path='*' element={<Navigate to='cinema/today'/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

/* function RequireAuth({ children, redirectTo }) {
  const { isUserLogged } = useContext(AuthContext);
  return isUserLogged ? (children) : (<Navigate to={redirectTo} />);
} */

export default App
