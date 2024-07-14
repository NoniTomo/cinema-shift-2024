import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from '@components/elements';
import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';
import { Header, Schedule } from '@/components/modules';
import { useSeance } from '@/utils/context/Seance';
import { useCinemaPayment } from '@/utils/context/CinemaPayment';

import styles from './index.module.scss';

export type MovieScheduleProps = {
  toBack: () => void;
  toForward: () => void;
};

export const MovieSchedule = ({ toBack, toForward }: MovieScheduleProps) => {
  const params = useParams();

  const { schedules, loading } = useSeance();
  const { cinemaPayment } = useCinemaPayment();

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
};
