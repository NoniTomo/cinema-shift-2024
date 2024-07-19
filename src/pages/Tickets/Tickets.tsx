import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TicketCard, Header, Loading, Footer } from '@components/modules';
import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';
import { useUser } from '@/utils/context/User';

import styles from './index.module.scss';
import { useQuery } from '@/utils/hooks/useQuery/useQuery';
import { getOrders } from '@/utils/api/requests';
import { showError } from '@/utils/helpers';

export const Tickets = () => {
  const navigate = useNavigate();
  const { isUserLogged, orders, setOrders } = useUser();
  const [activeTicket, setActiveTicket] = useState(0);

  const getOrdersQuery = useQuery(() => getOrders({}), {
    select: (response) => {
      return response.data.orders;
    },
    onSuccess: (orders) => {
      setOrders(orders);
    },
    onError: (data) => {
      showError(data.message)
    }
  })

  useEffect(() => {
    if (!isUserLogged) navigate('../cinema/users/signin');
  }, [isUserLogged, navigate]);

  return (
    <>
      <Header to={`/cinema/today`} Icon={ArrowLeftIcon} text='Билеты' />
      <div className={styles.wrapper}>
        {getOrdersQuery.isLoading ? (
          <Loading />
        ) : (
          <div className={styles.container}>
            {orders &&
              orders.map((order: CinemaOrder) => (
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
