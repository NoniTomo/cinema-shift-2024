import { useState } from 'react';

import { TicketCard, Header, Loading, Footer } from '@components/modules';
import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';
import { useUser } from '@/utils/context/User';

import styles from './index.module.scss';
import { useQuery } from '@/utils/hooks/useQuery/useQuery';
import { getOrders } from '@/utils/api/requests';
import { showError } from '@/utils/helpers';
import { LayoutMediaQuery } from '@/components/templates';

export const Tickets = () => {
  const { orders, setOrders } = useUser();
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
  return (
    <>
      <Header to={`/cinema/today`} Icon={ArrowLeftIcon} text='Билеты' />
      <LayoutMediaQuery>
        {getOrdersQuery.isLoading ? (
          <Loading />
        ) : (
          <>
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
          </>
        )}
      </LayoutMediaQuery>
      <Footer />
    </>
  );
};
