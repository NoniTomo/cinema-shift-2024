import { Button } from '@/components/elements/Button/Button';
import { getDateToString } from '@/utils/helpers/getDate';
import { getSeats } from '@/utils/helpers/getSeats';

import styles from './index.module.scss';
import { useQuery } from '@/utils/hooks/useQuery/useQuery';
import { getOrders, putCancelOrder } from '@/utils/api/requests';
import { showError } from '@/utils/helpers';
import { showSuccess } from '@/utils/helpers/showSuccess';
import { useUser } from '@/utils/context/User';

type Props = {
  order: CinemaOrder;
  onClick: () => void;
  active?: boolean;
};

export const TicketCard = ({ order, active = false, onClick }: Props) => {
  const { setOrders } = useUser();

  const getOrdersQuery = useQuery(() => getOrders({}), {
    select: (response) => {
      return response.data.orders;
    },
    onSuccess: (orders) => {
      setOrders(orders);
    },
    onError: (data) => {
      showError(data.message)
    },
    enabled: false
  })

  const putCancelOrderQuery = useQuery((params: { orderId: string }) => putCancelOrder({ params }), {
    onSuccess: () => {
      showSuccess('Заказ отменен');
      getOrdersQuery.refetch({});
    },
    onError: (data) => {
      showError(data.message)
    },
    enabled: false,
  })


  if (order.status === 'PAYED')
    return (
      <div className={`${styles['ticket']}`} onClick={onClick}>
        <div className={styles['ticket__action-area']}>
          <div className={styles['ticket__first-line']}>
            <p className={styles['ticket__date']}>
              {getDateToString(order.tickets[0].seance.date)}
            </p>
            <p className={styles['ticket__time']}>{order.tickets[0].seance.time}</p>
          </div>
          <div className={styles['ticket__second-line']}>
            <p className={styles['ticket__film-name']}>{order.filmName || 'The Best Movie'}</p>
            <p className={styles['ticket__film-seats']}>{getSeats(order.tickets)}</p>
          </div>
          <div className={styles['ticket__third-line']}>
            <div
              className={
                styles[
                `ticket__status-container_${order.status === 'PAYED' ? 'payed' : 'canceled'}`
                ]
              }
            >
              <p className={styles['ticket__status-text']}>
                {order.status === 'PAYED' ? 'оплачен' : 'отменён'}
              </p>
            </div>
            <p className={styles['ticket__order-code']}>код билета {order.orderNumber}</p>
          </div>
        </div>
        {active && (
          <Button variant='outlined' onClick={() => putCancelOrderQuery.refetch({ orderId: order._id })}>
            Вернуть билет
          </Button>
        )}
      </div>
    );

  return (
    <div className={`${styles['ticket']}`}>
      <div className={styles['ticket__action-area']}>
        <div className={styles['ticket__third-line']}>
          <div className={styles[`ticket__status-container_canceled`]}>
            <p className={styles['ticket__status-text']}>отменён</p>
          </div>
          <p className={styles['ticket__order-code']}>код билета {order.orderNumber}</p>
        </div>
      </div>
    </div>
  );
};
