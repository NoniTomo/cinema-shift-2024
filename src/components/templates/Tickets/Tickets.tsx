import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Header from '../../modules/Header/Header';
import Footer from '../../modules/Footer/Footer';

export default function Tickets() {
  
  return (
    <>
      <Header />
      <p>Билеты</p>
      <Footer />
    </>
  )
}