import { toast } from 'react-toastify';

import { Button } from '@components/elements/Button/Button';
import { Header, SeatingMatrix } from '@components/modules';

import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';

import styles from './index.module.scss';
import { useSeance } from '@/utils/context/Seance';
import { useCinemaPayment } from '@/utils/context/CinemaPayment';

export type ChoiceOfSeatsProps = {
  toBack: () => void;
  toForward: () => void;
};

export const ChoiceOfSeats = ({ toBack, toForward }: ChoiceOfSeatsProps) => {
  const { schedules, error } = useSeance();
  const { cinemaPayment } = useCinemaPayment();

  const handleOnClick = () => {
    if (cinemaPayment.tickets.length > 0) {
      toForward();
    } else {
      toast.error('Выберите места', {
        position: 'top-left'
      });
    }
  };

  return (
    <>
      {!error && schedules ? (
        <>
          <Header onClick={toBack} Icon={ArrowLeftIcon} text='Выбор места' />
          <div className={`${styles.wrapper}`}>
            <div className={`${styles.schema}`}>
              <SeatingMatrix />
              <Button variant='contained' onClick={handleOnClick}>
                Продолжить
              </Button>
            </div>
          </div>
        </>
      ) : (
        <p>Возникла ошибка. Необходимо перезагрузить страницу</p>
      )}
    </>
  );
};
