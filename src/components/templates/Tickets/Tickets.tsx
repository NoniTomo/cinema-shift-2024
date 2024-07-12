import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@components/modules/Header/Header';
import { Footer } from '@components/modules/Footer/Footer';
import { UserContext } from '@/context/UserContext';
import { Order } from '@/types/dto';
import TicketCard from '@components/modules/TicketCard/TicketCard';
import { Loading } from '@components/modules/Loading/Loading';
import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';

import styles from './index.module.scss';

export default function Tickets() {
  const navigate = useNavigate();
  const { orders, handleGetAllOrders, loading } = useContext(UserContext);
  const { isUserLogged } = useContext(UserContext);
  const [activeTicket, setActiveTicket] = useState(0);

  useEffect(() => {
    if (!isUserLogged) navigate('../cinema/users/signin');
  }, [isUserLogged, navigate]);

  useEffect(() => {
    handleGetAllOrders();
  }, []);

  return (
    <>
      <Header to={`/cinema/today`} Icon={ArrowLeftIcon} text='Билеты' />
      <div className={styles.wrapper}>
        {loading ? (
          <Loading />
        ) : (
          <div className={styles.container}>
            {orders &&
              orders.map((order: Order) => (
                <TicketCard
                  onClick={() =>
                    activeTicket !== order.orderNumber
                      ? setActiveTicket(order.orderNumber)
                      : setActiveTicket(0)
                  }
                  active={activeTicket === order.orderNumber ? true : false}
                  key={order.orderNumber}
                  order={order}
                />
              ))}
            {!orders?.length && <p className={styles.text}>У вас ещё нет билетов</p>}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
