import Header from '@components/modules/Header/Header';
import { Button } from '@components/elements/Button/Button';
import { useContext } from 'react';
import { CinemaPaymentContext } from '@/context/CinemaPaymentContext';
import { InfoCard } from '@/components/elements/InfoCard/InfoCard';

import styles from './index.module.scss';
import { NavLink } from 'react-router-dom';
import config from '@/config';
import { getDateToString } from '@/utils/getDate';
import { getSeats } from '@/utils/getSeats';

export default function Success() {
  const { cinemaPayment } = useContext(CinemaPaymentContext);

  return (
    <>
      <Header to={'/cinema/today'} />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <p className={styles.content__title}>Оплата прошла успешно!</p>
          <InfoCard title='Фильм' subtitle={cinemaPayment.filmName} />
          <InfoCard title='Дата и время' subtitle={getDateToString(cinemaPayment?.seance.date)} />
          <InfoCard title='Места' subtitle={getSeats(cinemaPayment.tickets)} />
          <p className={styles.content__text}>Вся информация была продублирована в SMS</p>
          <NavLink style={{ width: '100%' }} to={`${config.CLIENT_URL}/cinema/users/profile`}>
            <Button variant='outlined'>Перейти в личный кабинет</Button>
          </NavLink>
        </div>
      </div>
    </>
  );
}
