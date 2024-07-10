import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Header from '../../modules/Header/Header';
import Footer from '../../modules/Footer/Footer';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/context/UserContext';

export default function Tickets() {
  const navigate = useNavigate();

  const { isUserLogged } = useContext(UserContext);
  useEffect(() => {
    if (!isUserLogged) navigate('../cinema/users/signin');
  }, [isUserLogged]);

  return (
    <>
      <Header />
      <p>Билеты</p>
      <Footer />
    </>
  );
}
