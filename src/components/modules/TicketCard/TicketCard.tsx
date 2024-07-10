import { useState } from 'react';

import { Order } from '@/types/dto';
import { Button } from '@/components/elements/Button/Button';
import { getDateToString } from '@/utils/getDate';
import { getSeats } from '@/utils/getSeats';

import styles from './index.module.scss';

type Props = {
  order: Order;
};

export default function TicketCard({ order }: Props) {
  const [displayButton, setDisplayButton] = useState(false);

  return (
    <div className={`${styles['ticket']}`} onClick={() => setDisplayButton(!displayButton)}>
      <div className={`${styles['ticket__first-line']}`}>
        <p className={styles['ticket__date']}>{getDateToString(order.tickets[0].seance.date)}</p>
        <p className={styles['ticket__time']}>{order.tickets[0].seance.time}</p>
      </div>
      <div className={`${styles['ticket__second-line']}`}>
        <p className={styles['ticket__film-name']}>{order.filmName}</p>
        <p className={styles['ticket__film-seats']}>{getSeats(order.tickets)}</p>
      </div>
      <div className={`${styles['ticket__third-line']}`}>
        <div className={`${styles['ticket__status-container']}`}>
          <p className={`${styles['ticket__status-text']}`}>
            {order.status === 'PAYED' ? 'оплачен' : 'отменён'}
          </p>
        </div>
        <p className={styles['ticket__order-code']}>код билета {order.orderNumber}</p>
      </div>
      {displayButton && <Button variant='outlined'>Вернуть билет</Button>}
    </div>
  );
}
