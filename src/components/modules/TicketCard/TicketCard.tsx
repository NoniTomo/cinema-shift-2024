import { CancelCinemaOrderDto, Order } from '@/types/dto';
import { Button } from '@/components/elements/Button/Button';
import { getDateToString } from '@/utils/getDate';
import { getSeats } from '@/utils/getSeats';

import styles from './index.module.scss';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';

type Props = {
  order: Order;
  onClick: () => void;
  active?: boolean;
};

export default function TicketCard({ order, active = false, onClick }: Props) {
  const { handleCancelOrder } = useContext(UserContext);
  const handle = (data: CancelCinemaOrderDto) => {
    handleCancelOrder(data);
  };

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
          <Button variant='outlined' onClick={() => handle({ orderId: order._id })}>
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
}
