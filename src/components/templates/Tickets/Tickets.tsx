import { useNavigate } from 'react-router-dom';
import Header from '@components/modules/Header/Header';
import Footer from '@components/modules/Footer/Footer';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/context/UserContext';
import { Order } from '@/types/dto';
import TicketCard from '@components/modules/TicketCard/TicketCard';

import styles from './index.module.scss';
import { Loading } from '@components/modules/Loading/Loading';

export default function Tickets() {
  const navigate = useNavigate();
  const { orders, handleGetAllOrders, loading } = useContext(UserContext);
  const { isUserLogged } = useContext(UserContext);

  useEffect(() => {
    if (!isUserLogged) navigate('../cinema/users/signin');
  }, [isUserLogged, navigate]);

  useEffect(() => {
    if (orders[0].filmName === '') handleGetAllOrders();
  }, [orders, handleGetAllOrders]);

  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <div className={styles[`container`]}>
        {orders &&
          orders.map((order: Order) => <TicketCard key={order.orderNumber} order={order} />)}
      </div>
      <Footer />
    </>
  );
}
