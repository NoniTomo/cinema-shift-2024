import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import { Header } from '@components/modules';
import { Button, InfoCard } from '@components/elements';
import { CinemaPaymentContext } from '@/utils/context/CinemaPayment';
import { getDateToString } from '@/utils/helpers/getDate';
import { getSeats } from '@/utils/helpers/getSeats';
import { ReactComponent as AcceptIcon } from '@assets/svg/Accept.svg';
import { ReactComponent as CrossIcon } from '@assets/svg/Cross.svg';

import styles from './index.module.scss';

export type PropsSuccess = {
  type?: 'desktop' | 'mobile';
};

export const Success = ({ type = 'mobile' }: PropsSuccess) => {
  const { cinemaPayment, orderCode } = useContext(CinemaPaymentContext);

  return (
    <>
      {type === 'mobile' && <Header Icon={CrossIcon} text='Выбор места' to={'/cinema/today'} />}
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.content__success}>
            <AcceptIcon />
            <p className={styles.content__title}>Оплата прошла успешно!</p>
          </div>
          <InfoCard title='Код заказа' subtitle={`${orderCode}`} />
          <InfoCard title='Фильм' subtitle={cinemaPayment.filmName} />
          <InfoCard title='Дата и время' subtitle={getDateToString(cinemaPayment?.seance.date)} />
          <InfoCard title='Места' subtitle={getSeats(cinemaPayment.tickets)} />
          <p className={styles.content__text}>Вся информация была продублирована в SMS</p>
          <NavLink style={{ width: '100%' }} to={`/cinema/users/profile`}>
            <Button variant='outlined'>Перейти в личный кабинет</Button>
          </NavLink>
        </div>
      </div>
    </>
  );
};
