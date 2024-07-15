import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Order } from '@/utils/types/dto';
import { TicketCard, Header, Loading, Footer } from '@components/modules';
import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';
import { useUser } from '@/utils/context/User';

import styles from './index.module.scss';

export const Tickets = () => {
  const navigate = useNavigate();
  const { isUserLogged, orders, handleGetAllOrders, loading } = useUser();
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
};
