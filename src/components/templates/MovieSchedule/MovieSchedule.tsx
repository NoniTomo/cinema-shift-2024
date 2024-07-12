import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from '@components/elements/Button/Button';
import Header from '@components/modules/Header/Header';
import { SeanceContext } from '@/context/SeanceContext';
import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';
import { CinemaPaymentContext } from '@/context/CinemaPaymentContext';
import Schedule from '@/components/modules/Schedule/Schedule';

import styles from './index.module.scss';

export type Props = {
  toBack: () => void;
  toForward: () => void;
};

export default function MovieSchedule({ toBack, toForward }: Props) {
  const params = useParams();

  const { schedules, loading } = useContext(SeanceContext);
  const { cinemaPayment } = useContext(CinemaPaymentContext);

  const handleOnClick = () => {
    const filmId = params?.filmId;
    if (typeof filmId === 'string') {
      if (
        cinemaPayment.seance.date !== '' &&
        cinemaPayment.seance.time !== '' &&
        cinemaPayment.seance.hall !== ''
      ) {
        toForward();
      } else if (cinemaPayment.seance.date === '') {
        toast.error('Укажите дату киносеанса', {
          position: 'top-left'
        });
      } else {
        toast.error('Укажите время киносеанса', {
          position: 'top-left'
        });
      }
    }
  };

  return (
    <>
      {schedules && (
        <>
          <Header onClick={toBack} Icon={ArrowLeftIcon} text='Расписание' />
          <div className={`${styles.wrapper}`}>
            <div className={`${styles.schedules}`}>
              <Schedule />
              {!loading && (
                <Button variant='contained' onClick={handleOnClick}>
                  Продолжить
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
