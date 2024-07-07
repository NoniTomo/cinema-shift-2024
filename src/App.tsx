import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Afisha from './components/templates/Afisha/Afisha'
import MovieInfo from './components/templates/MovieInfo/MovieInfo'
import Tickets from './components/templates/Tickets/Tickets'
import Profile from './components/templates/Profile/Profile'
import MovieSchedule from './components/templates/MovieSchedule/MovieSchedule'
import ChoiceOfSeats from './components/templates/ChoiceOfSeats/ChoiceOfSeats'
import Login from './components/templates/Login/Login'
import YourData from './components/templates/YourData/YourData'
import YourCard from './components/templates/YourCard/YourCard'

import './App.css'

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="cinema/today" element={<Afisha />} />
          <Route path="cinema/film/:filmId" element={<MovieInfo />} />
          <Route
            path="cinema/film/:filmId/schedule"
            element={<MovieSchedule />}
          />
          <Route path="cinema/orders" element={<Tickets />} />
          <Route path="cinema/users/profile" element={<Profile />} />
          <Route
            path="cinema/film/:filmId/schedule/choose-seat"
            element={<ChoiceOfSeats />}
          />
          <Route path="cinema/users/signin" element={<Login />} />
          <Route path="cinema/users/your-data" element={<YourData />} />
          <Route path="cinema/users/your-card" element={<YourCard />} />
          <Route path="*" element={<Navigate to="cinema/today" />} />
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
