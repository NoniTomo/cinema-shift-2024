import Header from '@components/modules/Header/Header';
import { Button } from '@components/elements/Button/Button';
import { useContext } from 'react';
import { CinemaPaymentContext } from '@/context/CinemaPaymentContext';
import { SeanceContext } from '@/context/SeanceContext';
import { InfoCard } from '@/components/elements/InfoCard/InfoCard';

import styles from './index.module.scss';

const days: string[] = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const month: string[] = [
  'янв',
  'фев',
  'мар',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек'
];

export default function Success() {
  const { cinemaPayment } = useContext(CinemaPaymentContext);
  const { schedules } = useContext(SeanceContext);

  const getDate = () => {
    const currentYear: number = 2000 + +cinemaPayment?.seance.date.split('.')[2];
    const currentMonth: number = +cinemaPayment?.seance.date.split('.')[1] - 1;
    const currentDay: number = +cinemaPayment?.seance.date.split('.')[0];

    const date = new Date(currentYear, currentMonth, currentDay);
    console.log('date = ', date);
    return `${days[date.getDay()]}, ${currentDay} ${month[date.getMonth()]}`;
  };

  return (
    <>
      <Header to={'/cinema/today'} />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <p className={styles.content__title}>Оплата прошла успешно!</p>
          <InfoCard title='Фильм' subtitle={cinemaPayment.filmName} />
          <InfoCard title='Дата и время' subtitle={getDate()} />
          <InfoCard
            title='Ряд'
            subtitle={cinemaPayment.tickets.map((ticket) => ticket.row).join(', ')}
          />
          <InfoCard
            title='Места'
            subtitle={cinemaPayment.tickets.map((ticket) => ticket.column).join(', ')}
          />
          <p className={styles.content__text}>Вся информация была продублирована в SMS</p>
          <Button variant='outlined' to={}>
            Перейти в личный кабинет
          </Button>
        </div>
      </div>
    </>
  );
}
